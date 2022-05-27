# @pliancy/sentinelone-sdk

> sentinelone-sdk: revelry and awe are afoot

## Usage

```typescript
import { SentinelOne } from '@pliancy/sentinelone-skd'

const s1 = new SentinelOne({
    site: 'foo.bar',
    token: 'myToken',
})

const sitesResponse = await s1.sites.getAll()
console.log(sitesResponse.data.sites)
```

## Test

```bash
yarn test
```
