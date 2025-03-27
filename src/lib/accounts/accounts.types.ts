import { Licenses } from '../sites/sites.types'

export interface Account {
    accountType: string
    activeAgents?: number
    agentsInCompleteSku: number
    agentsInControlSku: number
    agentsInCoreSku: number
    completeSites: number
    controlSites: number
    coreSites: number
    createdAt: string
    creator: string
    creatorId: string
    expiration: string
    externalId: string
    id: string
    isDefault: boolean
    licenses: Licenses
    name: string
    numberOfSites: number
    skus: [Object[]]
    state: string
    totalComplete: number
    totalControl: number
    totalCore: number
    totalLicenses: number
    unlimitedComplete: boolean
    unlimitedControl: boolean
    unlimitedCore: boolean
    unlimitedExpiration: boolean
    updatedAt: string
}
