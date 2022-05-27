import { AxiosInstance } from 'axios'
import { createHttpAgent } from './utils/create-http-agent'
import { SentinelOneConfig } from './sentinel-one.types'
import { Sites } from './sites/sites'

export class SentinelOne {
    sites: Sites

    private readonly httpAgent: AxiosInstance

    constructor(config: SentinelOneConfig) {
        this.httpAgent = createHttpAgent(config)
        this.sites = new Sites(this.httpAgent)
    }
}
