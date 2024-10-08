<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [prepareCreateSporeUnsignedPsbt](./mobit-sdk.preparecreatesporeunsignedpsbt.md)

## prepareCreateSporeUnsignedPsbt() function

Prepares an unsigned BTC transaction for creating spores.

**Signature:**

```typescript
prepareCreateSporeUnsignedPsbt: ({ clusterRgbppLockArgs, receivers, collector, isMainnet, btcTestnetType, fromBtcAccount, fromBtcAccountPubkey, btcDataSource, btcFeeRate, }: PrepareCreateSporeUnsignedPsbtParams) => Promise<bitcoin.Psbt>
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

{ clusterRgbppLockArgs, receivers, collector, isMainnet, btcTestnetType, fromBtcAccount, fromBtcAccountPubkey, btcDataSource, btcFeeRate, }


</td><td>

[PrepareCreateSporeUnsignedPsbtParams](./mobit-sdk.preparecreatesporeunsignedpsbtparams.md)


</td><td>


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;bitcoin.Psbt&gt;

{<!-- -->Promise<!-- -->&lt;<!-- -->bitcoin.Psbt<!-- -->&gt;<!-- -->} - The unsigned BTC transaction in PSBT format.

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--- Note: This example demonstrates how to fetch the corresponding parameters using the `fetchAndValidateAssets` function. Example:

```typescript
const clusterRgbppLockArgs = await fetchAndValidateAssets(
  fromBtcAccount,
  clusterTypeScriptArgs,
  isMainnet,
  btcService,
);
```

