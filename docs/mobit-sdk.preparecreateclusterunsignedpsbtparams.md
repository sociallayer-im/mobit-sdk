<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [PrepareCreateClusterUnsignedPsbtParams](./mobit-sdk.preparecreateclusterunsignedpsbtparams.md)

## PrepareCreateClusterUnsignedPsbtParams interface

Parameters required to generate an unsigned PSBT (Partially Signed Bitcoin Transaction) for creating a cluster. This interface is used to estimate transaction fees before finalizing the transaction.

**Signature:**

```typescript
export interface PrepareCreateClusterUnsignedPsbtParams 
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

[btcDataSource](./mobit-sdk.preparecreateclusterunsignedpsbtparams.btcdatasource.md)


</td><td>


</td><td>

DataSource


</td><td>

Data source for BTC transactions.


</td></tr>
<tr><td>

[btcFeeRate?](./mobit-sdk.preparecreateclusterunsignedpsbtparams.btcfeerate.md)


</td><td>


</td><td>

number


</td><td>

_(Optional)_ Fee rate for the BTC transaction (optional, default is 30).


</td></tr>
<tr><td>

[btcTestnetType?](./mobit-sdk.preparecreateclusterunsignedpsbtparams.btctestnettype.md)


</td><td>


</td><td>

BTCTestnetType


</td><td>

_(Optional)_ Type of BTC testnet (optional).


</td></tr>
<tr><td>

[btcTxId](./mobit-sdk.preparecreateclusterunsignedpsbtparams.btctxid.md)


</td><td>


</td><td>

string


</td><td>

ID of the BTC transaction.


</td></tr>
<tr><td>

[clusterData](./mobit-sdk.preparecreateclusterunsignedpsbtparams.clusterdata.md)


</td><td>


</td><td>

RawClusterData


</td><td>

Raw data required to create the cluster.


</td></tr>
<tr><td>

[collector](./mobit-sdk.preparecreateclusterunsignedpsbtparams.collector.md)


</td><td>


</td><td>

Collector


</td><td>

Collector instance used to gather cells for the transaction.


</td></tr>
<tr><td>

[fromBtcAccount](./mobit-sdk.preparecreateclusterunsignedpsbtparams.frombtcaccount.md)


</td><td>


</td><td>

string


</td><td>

BTC account from which the transaction will be initiated.


</td></tr>
<tr><td>

[fromBtcAccountPubkey](./mobit-sdk.preparecreateclusterunsignedpsbtparams.frombtcaccountpubkey.md)


</td><td>


</td><td>

string


</td><td>

Public key of the BTC account.


</td></tr>
<tr><td>

[isMainnet](./mobit-sdk.preparecreateclusterunsignedpsbtparams.ismainnet.md)


</td><td>


</td><td>

boolean


</td><td>

Indicates whether the operation is on the mainnet.


</td></tr>
<tr><td>

[outIndex](./mobit-sdk.preparecreateclusterunsignedpsbtparams.outindex.md)


</td><td>


</td><td>

number


</td><td>

Output index of the BTC transaction.


</td></tr>
</tbody></table>
