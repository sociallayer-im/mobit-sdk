import {
  addressToScript,
  getTransactionSize,
} from "@nervosnetwork/ckb-sdk-utils";
import {
  append0x,
  calculateTransactionFee,
  calculateUdtCellCapacity,
  Collector,
  fetchTypeIdCellDeps,
  getXudtTypeScript,
  IndexerCell,
  leToU128,
  MAX_FEE,
  NoXudtLiveCellError,
  remove0x,
  u128ToLe,
} from "@rgbpp-sdk/ckb";
import {
  calculateWitnessSize,
  getAddressCellDeps,
  getIndexerCells,
} from "../helper";

/**
 * Parameters for creating a merged xUDT transaction.
 */
export interface CreateMergeXudtTransactionParams {
  /**
   * The xUDT type script args.
   */
  xudtArgs: string;
  /**
   * The CKB addresses involved in the transaction.
   */
  ckbAddresses: string[];
  /**
   * The collector instance used to fetch cells and collect inputs.
   */
  collector: Collector;
  /**
   * A boolean indicating whether the transaction is for the mainnet or testnet.
   */
  isMainnet: boolean;
}

/**
 * Merges multiple xUDT cells into a single xUDT cell and returns the remaining capacity as a separate cell.
 * @param {CreateMergeXudtTransactionParams} params - The parameters object.
 * @param {string} params.xudtArgs - The xUDT type script args.
 * @param {string[]} params.ckbAddresses - The CKB addresses involved in the transaction.
 * @param {Collector} params.collector - The collector instance used to fetch cells and collect inputs.
 * @param {boolean} params.isMainnet - A boolean indicating whether the transaction is for the mainnet or testnet.
 * @param {string} [ckbAddress=params.ckbAddresses[0]] - The address for the output cell, defaulting to the first address in the input address set.
 * @param {bigint} [feeRate] - The fee rate for the transaction, optional.
 * @param {bigint} [maxFee=MAX_FEE] - The maximum fee for the transaction, defaulting to MAX_FEE.
 * @param {number} [witnessLockPlaceholderSize] - The size of the witness lock placeholder, optional.
 * @returns {Promise<CKBComponents.RawTransactionToSign>} An unsigned transaction object.
 */
export async function createMergeXudtTransaction(
  {
    xudtArgs,
    ckbAddresses,
    collector,
    isMainnet,
  }: CreateMergeXudtTransactionParams,
  ckbAddress: string = ckbAddresses[0],
  feeRate?: bigint,
  maxFee: bigint = MAX_FEE,
  witnessLockPlaceholderSize?: number,
): Promise<CKBComponents.RawTransactionToSign> {
  const fromLock = addressToScript(ckbAddress);
  const xudtType: CKBComponents.Script = {
    ...getXudtTypeScript(isMainnet),
    args: xudtArgs,
  };

  const xudtCells = await getIndexerCells({
    ckbAddresses,
    type: xudtType,
    collector,
  });

  console.debug("Fetched xudt cells:", xudtCells);

  if (!xudtCells || xudtCells.length === 0) {
    throw new NoXudtLiveCellError("The addresses have no xudt cells");
  }

  if (xudtCells.length === 1) {
    throw new Error("Only one xudt cell found, no need to merge");
  }

  const {
    inputs: udtInputs,
    sumInputsCapacity,
    sumAmount,
  } = collectAllUdtInputs(xudtCells);

  const actualInputsCapacity = sumInputsCapacity;
  const inputs = udtInputs;

  console.debug("Collected inputs:", inputs);
  console.debug("Sum of inputs capacity:", sumInputsCapacity);
  console.debug("Sum of amount:", sumAmount);

  const mergedXudtCapacity = calculateUdtCellCapacity(fromLock);
  const outputs: CKBComponents.CellOutput[] = [
    {
      lock: fromLock,
      type: xudtType,
      capacity: append0x(mergedXudtCapacity.toString(16)),
    },
  ];
  const outputsData: string[] = [append0x(u128ToLe(sumAmount))];

  const sumXudtOutputCapacity = mergedXudtCapacity;

  console.debug("Merged XUDT capacity:", mergedXudtCapacity);
  console.debug("Updated outputs:", outputs);
  console.debug("Updated outputs data:", outputsData);

  const txFee = maxFee;
  if (sumInputsCapacity <= sumXudtOutputCapacity) {
    throw new Error(
      "Thetotal input capacity is less than or equal to the total output capacity, which is not possible in a merge function.",
    );
  }

  let changeCapacity = actualInputsCapacity - sumXudtOutputCapacity;
  outputs.push({
    lock: fromLock,
    capacity: append0x(changeCapacity.toString(16)),
  });
  outputsData.push("0x");

  console.debug("Change Capacity:", changeCapacity);
  console.debug("Updated Outputs:", outputs);
  console.debug("Updated Outputs Data:", outputsData);

  const emptyWitness = { lock: "", inputType: "", outputType: "" };
  const witnesses = inputs.map((_, index) => index === 0 ? emptyWitness : "0x");

  const cellDeps = [
    ...(await getAddressCellDeps(isMainnet, ckbAddresses)),
    ...(await fetchTypeIdCellDeps(isMainnet, { xudt: true })),
  ];

  const unsignedTx: CKBComponents.RawTransactionToSign = {
    version: "0x0",
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses,
  };

  console.debug("Unsigned transaction:", unsignedTx);

  if (txFee === maxFee) {
    const txSize = getTransactionSize(unsignedTx) +
      (witnessLockPlaceholderSize ??
        calculateWitnessSize(ckbAddress, isMainnet));
    const estimatedTxFee = calculateTransactionFee(txSize, feeRate);
    changeCapacity -= estimatedTxFee;
    unsignedTx.outputs[unsignedTx.outputs.length - 1].capacity = append0x(
      changeCapacity.toString(16),
    );

    console.debug("Transaction size:", txSize);
    console.debug("Estimated transaction fee:", estimatedTxFee);
    console.debug("Updated change capacity:", changeCapacity);
    console.debug("Updated unsigned transaction:", unsignedTx);
  }

  return unsignedTx;
}

function collectAllUdtInputs(liveCells: IndexerCell[]): {
  inputs: CKBComponents.CellInput[];
  sumInputsCapacity: bigint;
  sumAmount: bigint;
} {
  const inputs = [];
  let sumInputsCapacity = BigInt(0);
  let sumAmount = BigInt(0);
  for (const cell of liveCells) {
    if (cell.outputData === "0x") {
      continue;
    }
    inputs.push({
      previousOutput: {
        txHash: cell.outPoint.txHash,
        index: cell.outPoint.index,
      },
      since: "0x0",
    });
    sumInputsCapacity = sumInputsCapacity + BigInt(cell.output.capacity);
    // XUDT cell.data = <amount: uint128> <xudt data (optional)>
    // Ref: https://blog.cryptape.com/enhance-sudts-programmability-with-xudt#heading-xudt-cell
    sumAmount += leToU128(remove0x(cell.outputData).slice(0, 32));
  }

  return { inputs, sumInputsCapacity, sumAmount };
}
