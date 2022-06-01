import { AxiosInstance } from 'axios'
import { createHttpAgent } from './utils/create-http-agent'
import { SentinelOneConfig } from './sentinel-one.types'
import { Sites } from './sites/sites'
import { Agents } from './agents/agents'

export class SentinelOne {
    sites: Sites
    agents: Agents

    private readonly httpAgent: AxiosInstance

    constructor(config: SentinelOneConfig) {
        this.httpAgent = createHttpAgent(config)
        this.sites = new Sites(this.httpAgent)
        this.agents = new Agents(this.httpAgent)
    }
}
