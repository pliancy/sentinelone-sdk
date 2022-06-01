export interface Role {
    accountName?: null
    createdAt?: null
    creator?: string
    description: string
    id?: string
    name: string
    pages?: Page[]
    predefinedRole?: boolean
    scope?: string
    scopeId?: string
    siteName?: null
    updatedAt?: null
    usersInRoles?: number
}

export interface Page {
    identifier?: string
    name?: string
    permissions?: Permission[]
}

export interface Permission {
    dependsOn?: string[]
    identifier?: string
    title?: string
    type?: string
    value?: boolean
    groupName?: string
}
