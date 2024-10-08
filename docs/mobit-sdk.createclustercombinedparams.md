<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [createClusterCombinedParams](./mobit-sdk.createclustercombinedparams.md)

## createClusterCombinedParams interface

Parameters required to create a combined cluster.

**Signature:**

```typescript
export interface createClusterCombinedParams 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[btcDataSource](./mobit-sdk.createclustercombinedparams.btcdatasource.md)


</td><td>


</td><td>

DataSource


</td><td>

Data source for BTC transactions.


</td></tr>
<tr><td>

[btcService](./mobit-sdk.createclustercombinedparams.btcservice.md)


</td><td>


</td><td>

BtcAssetsApi


</td><td>

BTC service instance for interacting with BTC assets.


</td></tr>
<tr><td>

[btcTestnetType?](./mobit-sdk.createclustercombinedparams.btctestnettype.md)


</td><td>


</td><td>

BTCTestnetType


</td><td>

_(Optional)_ Type of BTC testnet (optional).


</td></tr>
<tr><td>

[cccSigner](./mobit-sdk.createclustercombinedparams.cccsigner.md)


</td><td>


</td><td>

ccc.Signer


</td><td>

Signer instance for signing CKB transactions.


</td></tr>
<tr><td>

[ckbAddress](./mobit-sdk.createclustercombinedparams.ckbaddress.md)


</td><td>


</td><td>

string


</td><td>

CKB address where the cluster cell will be created.


</td></tr>
<tr><td>

[clusterData](./mobit-sdk.createclustercombinedparams.clusterdata.md)


</td><td>


</td><td>

RawClusterData


</td><td>

Raw data required to create the cluster.


</td></tr>
<tr><td>

[collector](./mobit-sdk.createclustercombinedparams.collector.md)


</td><td>


</td><td>

Collector


</td><td>

Collector instance used to gather cells for the transaction.


</td></tr>
<tr><td>

[filterUtxo](./mobit-sdk.createclustercombinedparams.filterutxo.md)


</td><td>


</td><td>

(utxos: BtcApiUtxo\[\]) =&gt; Promise&lt;{ outIndex: number; btcTxId: string; }&gt;


</td><td>

Function to filter UTXOs for the BTC transaction.


</td></tr>
<tr><td>

[fromBtcAccount](./mobit-sdk.createclustercombinedparams.frombtcaccount.md)


</td><td>


</td><td>

string


</td><td>

BTC account from which the transaction will be initiated.


</td></tr>
<tr><td>

[fromBtcAccountPubkey](./mobit-sdk.createclustercombinedparams.frombtcaccountpubkey.md)


</td><td>


</td><td>

string


</td><td>

Public key of the BTC account.


</td></tr>
<tr><td>

[isMainnet](./mobit-sdk.createclustercombinedparams.ismainnet.md)


</td><td>


</td><td>

boolean


</td><td>

Indicates whether the operation is on the mainnet.


</td></tr>
<tr><td>

[wallet](./mobit-sdk.createclustercombinedparams.wallet.md)


</td><td>


</td><td>

[AbstractWallet](./mobit-sdk.abstractwallet.md)


</td><td>

Wallet instance used for signing BTC transactions.


</td></tr>
</tbody></table>
