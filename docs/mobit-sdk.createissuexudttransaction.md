<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [createIssueXudtTransaction](./mobit-sdk.createissuexudttransaction.md)

## createIssueXudtTransaction() function

Creates an unsigned transaction for issuing xUDT assets with a unique cell as the token info cell.

**Signature:**

```typescript
export declare function createIssueXudtTransaction({ xudtTotalAmount, tokenInfo, ckbAddress, collector, isMainnet, }: CreateIssueXudtTransactionParams, feeRate?: bigint, maxFee?: bigint, witnessLockPlaceholderSize?: number): Promise<CKBComponents.RawTransactionToSign>;
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

{ xudtTotalAmount, tokenInfo, ckbAddress, collector, isMainnet, }


</td><td>

[CreateIssueXudtTransactionParams](./mobit-sdk.createissuexudttransactionparams.md)


</td><td>


</td></tr>
<tr><td>

feeRate


</td><td>

bigint


</td><td>

_(Optional)_ (Optional) The fee rate to be used for the transaction.


</td></tr>
<tr><td>

maxFee


</td><td>

bigint


</td><td>

_(Optional)_ (Optional) The maximum fee allowed for the transaction. Defaults to MAX\_FEE.


</td></tr>
<tr><td>

witnessLockPlaceholderSize


</td><td>

number


</td><td>

_(Optional)_ (Optional) The size of the witness lock placeholder.


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;CKBComponents.RawTransactionToSign&gt;

{<!-- -->Promise<!-- -->&lt;<!-- -->CKBComponents.RawTransactionToSign<!-- -->&gt;<!-- -->} A promise that resolves to an unsigned transaction object.

