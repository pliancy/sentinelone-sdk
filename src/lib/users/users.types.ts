export interface User {
    apiToken?: APIToken
    dateJoined?: Date
    email: string
    emailReadOnly?: boolean
    emailVerified?: boolean
    firstLogin?: Date
    fullName: string
    fullNameReadOnly?: boolean
    groupsReadOnly?: boolean
    id?: string
    isSystem?: boolean
    lastLogin?: Date
    lowestRole?: string
    primaryTwoFaMethod?: string
    scope: 'site' | 'account' | 'tenant'
    scopeRoles?: ScopeRole[]
    siteRoles?: any[]
    source?: string
    tenantRoles?: any[]
    twoFaEnabled?: boolean
}

export interface APIToken {
    createdAt?: Date
    expiresAt?: Date
}

export interface ScopeRole {
    id?: string
    name?: string
    roleId?: string
    roleName?: string
    roles?: string[]
}
