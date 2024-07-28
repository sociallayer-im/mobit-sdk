import { Collector } from "@rgbpp-sdk/ckb";
interface CreateTransferXudtTransactionParams {
    xudtArgs: string;
    receivers: {
        toAddress: string;
        transferAmount: bigint;
    }[];
    ckbAddresses: string[];
    collector: Collector;
    isMainnet: boolean;
}
/**
 * Creates an unsigned transaction for transferring xUDT assets. This function can also be used to mint xUDT assets.
 *
 * @param xudtArgs - The xUDT type script args.
 * @param receivers - An array of receiver objects containing `toAddress` and `transferAmount`.
 * @param ckbAddresses - The CKB addresses for the transaction.
 * @param collector - The collector instance used to fetch cells and collect inputs.
 * @param isMainnet - A boolean indicating whether the network is mainnet or testnet.
 * @param ckbAddress - The address for the output cell, defaulting to the first address in the input address set
 * @param feeRate - (Optional) The fee rate to be used for the transaction.
 * @param maxFee - (Optional) The maximum fee allowed for the transaction. Defaults to `MAX_FEE`.
 *
 * @returns A promise that resolves to an unsigned transaction object.
 *
 * @throws {NoXudtLiveCellError} If the address has no xudt cells.
 * @throws {NoLiveCellError} If the address has no empty cells.
 */
export declare function createTransferXudtTransaction({ xudtArgs, receivers, ckbAddresses, collector, isMainnet, }: CreateTransferXudtTransactionParams, ckbAddress?: string, feeRate?: bigint, maxFee?: bigint): Promise<CKBComponents.RawTransactionToSign>;
export {};
