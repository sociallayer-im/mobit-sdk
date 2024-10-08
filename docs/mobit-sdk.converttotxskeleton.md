<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mobit-sdk](./mobit-sdk.md) &gt; [convertToTxSkeleton](./mobit-sdk.converttotxskeleton.md)

## convertToTxSkeleton() function

Converts a raw transaction to a transaction skeleton.

**Signature:**

```typescript
export declare function convertToTxSkeleton(rawTransaction: CKBComponents.RawTransactionToSign, collector: Collector): Promise<TransactionSkeletonType>;
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

rawTransaction


</td><td>

CKBComponents.RawTransactionToSign


</td><td>

The raw transaction to convert.


</td></tr>
<tr><td>

collector


</td><td>

Collector


</td><td>

The collector instance.


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;TransactionSkeletonType&gt;

{<!-- -->Promise<TransactionSkeletonType>} The transaction skeleton.

