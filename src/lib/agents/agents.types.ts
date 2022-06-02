export interface Agent {
    accountId: string
    accountName: string
    activeDirectory: ActiveDirectory
    activeThreats: number
    agentVersion: string
    allowRemoteShell: boolean
    appsVulnerabilityStatus: string
    cloudProviders?: CloudProviders
    computerName: string
    consoleMigrationStatus?: string
    coreCount: number
    cpuCount: number
    cpuId: string
    createdAt: Date
    detectionState?: string
    domain?: string
    encryptedApplications: boolean
    externalId?: string
    externalIp?: string
    firewallEnabled: boolean
    firstFullModeTime?: string
    groupId?: string
    groupIp?: string
    groupName?: string
    id: string
    inRemoteShellSession: boolean
    infected: boolean
    installerType: string
    isActive: boolean
    isDecommissioned: boolean
    isPendingUninstall: boolean
    isUninstalled: boolean
    isUpToDate: boolean
    lastActiveDate: Date
    lastIpToMgmt?: string
    lastLoggedInUserName?: string
    licenseKey?: string
    locationEnabled?: boolean
    locationType?: string
    locations?: Location[]
    machineType?: string
    mitigationMode: string
    mitigationModeSuspicious?: string
    modelName?: string
    networkInterfaces?: NetworkInterface[]
    networkQuarantineEnabled?: boolean
    networkStatus?: string
    operationalState?: string
    operationalStateExpiration?: string
    osArch?: string
    osName?: string
    osRevision?: string
    osStartTime?: Date
    osType?: string
    osUsername?: string
    rangerStatus?: string
    rangerVersion?: string
    registeredAt?: Date
    remoteProfilingState?: string
    remoteProfilingStateExpiration?: string
    scanAbortedAt?: Date
    scanFinishedAt?: Date
    scanStartedAt?: Date
    scanStatus?: string
    serialNumber?: string
    siteId?: string
    siteName?: string
    storageName?: string
    storageType?: string
    tags?: Tags
    threatRebootRequired?: boolean
    totalMemory?: number
    updatedAt?: Date
    userActionsNeeded?: any[]
    uuid: string
}

export interface ActiveDirectory {
    computerDistinguishedName?: string
    computerMemberOf?: any[]
    lastUserDistinguishedName?: string
    lastUserMemberOf?: any[]
}

export interface CloudProviders {}

export interface Location {
    id?: string
    name?: string
    scope?: string
}

export interface NetworkInterface {
    gatewayIp?: string
    gatewayMacAddress?: string
    id?: string
    inet?: string[]
    inet6?: string[]
    name?: string
    physical?: string
}

export interface Tags {
    sentinelone?: any[]
}
