export interface Group {
    createdAt: string
    creator: string
    creatorId: string
    filterId?: string
    filterName?: string
    id: string
    inherits: boolean
    isDefault: boolean
    name: string
    rank?: number
    registrationToken: string
    siteId: string
    totalAgents: number
    type: 'dynamic' | 'static' | 'pinned'
    updatedAt: Date
}

export interface CreateGroup {
    name: string
    siteId: string
    inherits: boolean
    filterId?: string
    type?: string
    rank?: number
    source?: string
    isDefault?: boolean
    description?: string
}
