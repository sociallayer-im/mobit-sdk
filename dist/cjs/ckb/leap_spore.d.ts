import { BTCTestnetType, Collector } from "@rgbpp-sdk/ckb";
/**
 * Interface for parameters required to leap a spore from CKB to BTC.
 */
export interface LeapSporeToBtcTransactionParams {
    /**
     * The output index of the spore.
     */
    outIndex: number;
    /**
     * The transaction ID of the BTC transaction.
     */
    btcTxId: string;
    /**
     * The type arguments for the spore.
     */
    sporeTypeArgs: string;
    /**
     * A flag indicating whether the operation is on the mainnet.
     */
    isMainnet: boolean;
    /**
     * The collector instance.
     */
    collector: Collector;
    /**
     * The CKB address.
     */
    ckbAddress: string;
    /**
     * (Optional) The type of BTC testnet.
     */
    btcTestnetType?: BTCTestnetType;
}
/**
 * Leap a spore from CKB to BTC.
 *
 * @param {LeapSporeToBtcTransactionParams} params - The parameters for leaping a spore from CKB to BTC.
 * @param {number} params.outIndex - The output index of the spore.
 * @param {string} params.btcTxId - The transaction ID of the BTC transaction.
 * @param {string} params.sporeTypeArgs - The type arguments for the spore.
 * @param {boolean} params.isMainnet - A flag indicating whether the operation is on the mainnet.
 * @param {Collector} params.collector - The collector instance.
 * @param {string} params.ckbAddress - The CKB address.
 * @param {BTCTestnetType} [params.btcTestnetType] - (Optional) The type of BTC testnet.
 * @param {bigint} [feeRate] - (Optional) The fee rate for the transaction.
 * @param {number} [witnessLockPlaceholderSize] - (Optional) The size of the witness lock placeholder.
 * @returns {Promise<CKBComponents.RawTransactionToSign>} A promise that resolves to the unsigned raw transaction to sign.
 */
export declare const leapSporeFromCkbToBtcTransaction: ({ outIndex, btcTxId, sporeTypeArgs, isMainnet, collector, ckbAddress, btcTestnetType, }: LeapSporeToBtcTransactionParams, feeRate?: bigint, witnessLockPlaceholderSize?: number) => Promise<CKBComponents.RawTransactionToSign>;
//# sourceMappingURL=leap_spore.d.ts.map