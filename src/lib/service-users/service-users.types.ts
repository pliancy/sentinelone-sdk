import { APIToken, ScopeRole } from '../users/users.types'

export interface ServiceUser {
    id: string
    apiToken?: APIToken & { value: string }
    name: string
    description?: string
    expirationDate: string
    scope: 'account'
    scopeRoles: ScopeRole[]
}
