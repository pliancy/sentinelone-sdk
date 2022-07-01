import { SentinelOne } from './sentinel-one'
import { Sites } from './sites/sites'
import { Agents } from './agents/agents'
import { Users } from './users/users'
import { Roles } from './roles/roles'
import { Accounts } from './accounts/accounts'

describe('SentinelOne', () => {
    it('creates an instance', () => {
        const s1 = new SentinelOne({} as never)
        expect(s1).toBeTruthy()
        expect(s1.sites).toBeInstanceOf(Sites)
        expect(s1.agents).toBeInstanceOf(Agents)
        expect(s1.users).toBeInstanceOf(Users)
        expect(s1.roles).toBeInstanceOf(Roles)
        expect(s1.accounts).toBeInstanceOf(Accounts)
    })
})
