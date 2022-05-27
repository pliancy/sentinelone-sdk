import { SentinelOne } from './sentinel-one'
import { Sites } from './sites/sites'

describe('SentinelOne', () => {
    it('creates an instance', () => {
        const s1 = new SentinelOne({} as never)
        expect(s1).toBeTruthy()
        expect(s1.sites).toBeInstanceOf(Sites)
    })
})
