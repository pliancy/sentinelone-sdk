export interface Role {
    accountName?: string
    createdAt?: string
    creator?: string
    description: string
    id?: string
    name: string
    pages?: Page[]
    predefinedRole?: boolean
    scope?: string
    scopeId?: string
    siteName?: string
    updatedAt?: string
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
