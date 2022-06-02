# @pliancy/sentinelone-sdk

## Usage

```typescript
import { SentinelOne } from '@pliancy/sentinelone-sdk'

const s1 = new SentinelOne({
    site: 'foo.bar',
    token: 'myToken',
})

const sites = await s1.sites.getAll()

const agents = await s1.agents.getAll()
```

## Test

```bash
yarn test
```
