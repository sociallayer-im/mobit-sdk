import { bitcoin, DataSource } from "@rgbpp-sdk/btc";
import { BTCTestnetType, Collector, getXudtTypeScript } from "@rgbpp-sdk/ckb";
import { BtcAssetsApi, buildRgbppTransferTx } from "rgbpp";
import { AbstractWallet, TxResult } from "../helper";
import { signAndSendPsbt } from "../wallet";
import { getRgbppLockArgsList } from "./distribute";

interface RgbppTransferParams {
  rgbppLockArgsList: string[];
  toBtcAddress: string;
  xudtTypeArgs: string;
  transferAmount: bigint;
  collector: Collector;
  btcDataSource: DataSource;
  btcTestnetType?: BTCTestnetType;
  isMainnet: boolean;
  fromBtcAccount: string;
  fromBtcAccountPubkey?: string;
  wallet: AbstractWallet;
  btcService: BtcAssetsApi;
}

const transfer = async (
  {
    rgbppLockArgsList,
    toBtcAddress,
    xudtTypeArgs,
    transferAmount,
    collector,
    btcDataSource,
    btcTestnetType,
    isMainnet,
    fromBtcAccount,
    fromBtcAccountPubkey,
    wallet,
    btcService,
  }: RgbppTransferParams,
  btcFeeRate?: number,
): Promise<TxResult> => {
  const { ckbVirtualTxResult, btcPsbtHex } = await buildRgbppTransferTx({
    ckb: {
      collector,
      xudtTypeArgs,
      rgbppLockArgsList,
      transferAmount,
    },
    btc: {
      fromAddress: fromBtcAccount,
      toAddress: toBtcAddress,
      fromPubkey: fromBtcAccountPubkey,
      dataSource: btcDataSource,
      testnetType: btcTestnetType,
      feeRate: btcFeeRate,
    },
    isMainnet,
  });
  console.log(btcPsbtHex);

  // Send BTC tx
  const psbt = bitcoin.Psbt.fromHex(btcPsbtHex);
  const { txId: btcTxId } = await signAndSendPsbt(psbt, wallet, btcService);

  console.log(`BTC ${btcTestnetType} TxId: ${btcTxId}`);

  await btcService.sendRgbppCkbTransaction({
    btc_txid: btcTxId,
    ckb_virtual_result: ckbVirtualTxResult,
  });

  try {
    const interval = setInterval(async () => {
      const { state, failedReason } = await btcService.getRgbppTransactionState(
        btcTxId,
      );
      console.log("state", state);
      if (state === "completed" || state === "failed") {
        clearInterval(interval);
        if (state === "completed") {
          const { txhash: txHash } = await btcService.getRgbppTransactionHash(
            btcTxId,
          );
          console.info(
            `Rgbpp asset has been transferred on BTC and the related CKB tx hash is ${txHash}`,
          );
        } else {
          console.warn(
            `Rgbpp CKB transaction failed and the reason is ${failedReason} `,
          );
        }
      }
    }, 30 * 1000);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return { btcTxId };
};

interface RgbppTransferCombinedParams {
  toBtcAddress: string;
  xudtTypeArgs: string;
  transferAmount: bigint;
  collector: Collector;
  btcDataSource: DataSource;
  btcTestnetType?: BTCTestnetType;
  isMainnet: boolean;
  fromBtcAccount: string;
  fromBtcAccountPubkey?: string;
  wallet: AbstractWallet;
  btcService: BtcAssetsApi;
}

/**
 * Combines the steps of getting the RGBPP lock arguments list and transferring RGBPP assets.
 *
 * @param toBtcAddress - The Bitcoin address to which the assets will be transferred.
 * @param xudtTypeArgs - The type arguments for the XUDT script.
 * @param transferAmount - The amount of assets to transfer, represented as a bigint.
 * @param collector - The collector instance used for collecting assets.
 * @param btcDataSource - The data source for Bitcoin transactions.
 * @param btcTestnetType - (Optional) The type of Bitcoin testnet to use.
 * @param isMainnet - A boolean indicating whether the operation is on the mainnet.
 * @param fromBtcAccount - The Bitcoin account from which the assets will be transferred.
 * @param fromBtcAccountPubkey - (Optional) The public key of the Bitcoin account.
 * @param {AbstractWallet} params.wallet - Wallet instance used for signing BTC transactions.
 * @param btcService - The service instance for interacting with Bitcoin assets.
 * @param btcFeeRate - (Optional) The fee rate to use for the Bitcoin transaction.
 * @returns A promise that resolves to the transaction result.
 */
export const transferCombined = async (
  {
    toBtcAddress,
    xudtTypeArgs,
    transferAmount,
    collector,
    btcDataSource,
    btcTestnetType,
    isMainnet,
    fromBtcAccount,
    fromBtcAccountPubkey,
    wallet,
    btcService,
  }: RgbppTransferCombinedParams,
  btcFeeRate?: number,
): Promise<TxResult> => {
  const lockArgsListResponse = await getRgbppLockArgsList({
    xudtTypeArgs,
    fromBtcAccount,
    isMainnet,
    btcService,
  });

  const res = await transfer(
    {
      rgbppLockArgsList: lockArgsListResponse.rgbppLockArgsList,
      toBtcAddress,
      xudtTypeArgs,
      transferAmount,
      collector,
      btcDataSource,
      btcTestnetType,
      isMainnet,
      fromBtcAccount,
      fromBtcAccountPubkey,
      wallet,
      btcService,
    },
    btcFeeRate,
  );

  return res;
};

interface PrepareTransferUnsignedPsbtParams {
  rgbppLockArgsList: string[];
  toBtcAddress: string;
  xudtTypeArgs: string;
  transferAmount: bigint;
  collector: Collector;
  btcDataSource: DataSource;
  btcTestnetType?: BTCTestnetType;
  isMainnet: boolean;
  fromBtcAccount: string;
  fromBtcAccountPubkey?: string;
  btcFeeRate?: number;
}

/**
 * Prepares an unsigned PSBT (Partially Signed Bitcoin Transaction) for transferring RGBPP assets.
 * This function is used to estimate transaction fees before finalizing the transaction.
 *
 * @param {PrepareTransferUnsignedPsbtParams} params - Parameters required to generate the unsigned PSBT.
 * @param {string[]} params.rgbppLockArgsList - List of RGBPP lock arguments.
 * @param {string} params.toBtcAddress - The recipient's BTC address.
 * @param {string} params.xudtTypeArgs - Type arguments for the XUDT script.
 * @param {bigint} params.transferAmount - The amount of assets to transfer.
 * @param {Collector} params.collector - Collector instance used to gather cells for the transaction.
 * @param {DataSource} params.btcDataSource - Data source for BTC transactions.
 * @param {BTCTestnetType} [params.btcTestnetType] - Type of BTC testnet (optional).
 * @param {boolean} params.isMainnet - Indicates whether the operation is on the mainnet.
 * @param {string} params.fromBtcAccount - BTC account from which the assets will be transferred.
 * @param {string} [params.fromBtcAccountPubkey] - Public key of the BTC account (optional).
 * @param {number} [params.btcFeeRate] - Fee rate for the BTC transaction (optional, default is 30).
 * @returns {Promise<bitcoin.Psbt>} - Promise that resolves to the unsigned PSBT.
 */
export const prepareTransferUnsignedPsbt = async ({
  rgbppLockArgsList,
  toBtcAddress,
  xudtTypeArgs,
  transferAmount,
  collector,
  btcDataSource,
  btcTestnetType,
  isMainnet,
  fromBtcAccount,
  fromBtcAccountPubkey,
  btcFeeRate = 30,
}: PrepareTransferUnsignedPsbtParams): Promise<bitcoin.Psbt> => {
  const { btcPsbtHex } = await buildRgbppTransferTx({
    ckb: {
      collector,
      xudtTypeArgs,
      rgbppLockArgsList,
      transferAmount,
    },
    btc: {
      fromAddress: fromBtcAccount,
      toAddress: toBtcAddress,
      fromPubkey: fromBtcAccountPubkey,
      dataSource: btcDataSource,
      testnetType: btcTestnetType,
      feeRate: btcFeeRate,
    },
    isMainnet,
  });

  // Convert the hex string to a PSBT object
  const psbt = bitcoin.Psbt.fromHex(btcPsbtHex);

  return psbt;
};
