import { AxiosInstance } from 'axios'
import { createHttpAgent } from './utils/create-http-agent'
import { SentinelOneConfig } from './sentinel-one.types'
import { Sites } from './sites/sites'
import { Agents } from './agents/agents'
import { Users } from './users/users'
import { Roles } from './roles/roles'
import { Accounts } from './accounts/accounts'

export class SentinelOne {
    sites: Sites
    agents: Agents
    users: Users
    roles: Roles
    accounts: Accounts

    private readonly httpAgent: AxiosInstance

    constructor(config: SentinelOneConfig) {
        this.httpAgent = createHttpAgent(config)
        this.sites = new Sites(this.httpAgent)
        this.agents = new Agents(this.httpAgent)
        this.users = new Users(this.httpAgent)
        this.roles = new Roles(this.httpAgent)
        this.accounts = new Accounts(this.httpAgent)
    }
}
