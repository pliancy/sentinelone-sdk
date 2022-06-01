import { AxiosInstance } from 'axios'
import { createHttpAgent } from './utils/create-http-agent'
import { SentinelOneConfig } from './sentinel-one.types'
import { Sites } from './sites/sites'
import { Agents } from './agents/agents'
import { Users } from './users/users'
import { Roles } from './roles/roles'

export class SentinelOne {
    sites: Sites
    agents: Agents
    users: Users
    roles: Roles

    private readonly httpAgent: AxiosInstance

    constructor(config: SentinelOneConfig) {
        this.httpAgent = createHttpAgent(config)
        this.sites = new Sites(this.httpAgent)
        this.agents = new Agents(this.httpAgent)
        this.users = new Users(this.httpAgent)
        this.roles = new Roles(this.httpAgent)
    }
}
