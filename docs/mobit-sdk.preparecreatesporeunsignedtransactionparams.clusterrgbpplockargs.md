<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [PrepareCreateSporeUnsignedTransactionParams](./mobit-sdk.preparecreatesporeunsignedtransactionparams.md) &gt; [clusterRgbppLockArgs](./mobit-sdk.preparecreatesporeunsignedtransactionparams.clusterrgbpplockargs.md)

## PrepareCreateSporeUnsignedTransactionParams.clusterRgbppLockArgs property

The arguments for the cluster RGBPP lock. Note: This should be generated using the `fetchAndValidateAssets` function. Example:

```typescript
const clusterRgbppLockArgs = await fetchAndValidateAssets(
  fromBtcAccount,
  clusterTypeScriptArgs,
  isMainnet,
  btcService,
);
```

**Signature:**

```typescript
clusterRgbppLockArgs: Hex;
```
