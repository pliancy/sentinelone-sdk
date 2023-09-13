export interface Application {
    agentComputerName: string
    agentDomain: string
    agentId: string
    agentInfected: boolean
    agentIsActive: boolean
    agentIsDecommissioned: boolean
    agentMachineType: string
    agentNetworkStatus: string
    agentOperationalState: string
    agentOsType: string
    agentUuid: string
    agentVersion: string
    createdAt: Date
    id: string
    installedAt: Date
    name: string
    osType: string
    publisher: string
    riskLevel: ApplicationRiskLevel
    signed: boolean
    size: number
    type: string
    updatedAt: Date
    version: string
}

export type ApplicationRiskLevel = 'low' | 'medium' | 'high' | 'none' | 'critical'

export interface ApplicationFilter {
    riskLevels?: ApplicationRiskLevel[]
    agentUuid__contains?: string[]
    /**
     * Free-text filter by application name (supports multiple values). Example: "calc".
     */
    name__contains?: string[]
    agentOsVersion__contains?: string[]
    agentMachineTypes?: string[]
    agentComputerName__contains?: string[]
    osTypes?: string[]
}
