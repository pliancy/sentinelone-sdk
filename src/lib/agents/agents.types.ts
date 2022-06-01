export interface Agent {
    accountId: string
    accountName: string
    activeDirectory: ActiveDirectory
    activeThreats: number
    agentVersion: string
    allowRemoteShell: boolean
    appsVulnerabilityStatus: string
    cloudProviders: CloudProviders
    computerName: string
    consoleMigrationStatus: string
    coreCount: number
    cpuCount: number
    cpuId: string
    createdAt: Date
    detectionState: null
    domain: string
    encryptedApplications: boolean
    externalId: string
    externalIp: string
    firewallEnabled: boolean
    firstFullModeTime: null
    groupId: string
    groupIp: string
    groupName: string
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
    lastIpToMgmt: string
    lastLoggedInUserName: string
    licenseKey: string
    locationEnabled: boolean
    locationType: string
    locations: Location[]
    machineType: string
    mitigationMode: string
    mitigationModeSuspicious: string
    modelName: string
    networkInterfaces: NetworkInterface[]
    networkQuarantineEnabled: boolean
    networkStatus: string
    operationalState: string
    operationalStateExpiration: null
    osArch: string
    osName: string
    osRevision: string
    osStartTime: Date
    osType: string
    osUsername: null
    rangerStatus: string
    rangerVersion: string
    registeredAt: Date
    remoteProfilingState: string
    remoteProfilingStateExpiration: null
    scanAbortedAt: null
    scanFinishedAt: null
    scanStartedAt: null
    scanStatus: string
    serialNumber: null
    siteId: string
    siteName: string
    storageName: null
    storageType: null
    tags: Tags
    threatRebootRequired: boolean
    totalMemory: number
    updatedAt: Date
    userActionsNeeded: any[]
    uuid: string
}

export interface ActiveDirectory {
    computerDistinguishedName: null
    computerMemberOf: any[]
    lastUserDistinguishedName: null
    lastUserMemberOf: any[]
}

export interface CloudProviders {}

export interface Location {
    id: string
    name: string
    scope: string
}

export interface NetworkInterface {
    gatewayIp: string
    gatewayMacAddress: string
    id: string
    inet: string[]
    inet6: string[]
    name: string
    physical: string
}

export interface Tags {
    sentinelone: any[]
}

export interface getAgentOptions {
    /**
     * Free-text filter by external ID (Customer ID). Example: "Tag#1 - monitoring,Performance machine".
     */
    externalId__contains?: string
    /**
     * Apps vulnerability status nin. Example: "patch_required".
     */
    appsVulnerabilityStatusesNin?: string
    /**
     * Exclude Agents installed with these package types. Example: ".msi".
     */
    installerTypesNin?: string
    /**
     *Memory size (MB, less than or equal)
     */
    totalMemory__lte?: string
    /**
     *Free-text filter by username (supports multiple values). Example: "admin,johnd1".
     */
    lastLoggedInUserName__contains?: string
    /**
     *Agents decommissioned after this timestamp. Example: "2018-02-27T04:49:26.257525Z".
     */
    decommissionedAt__gt?: string
    /**
     *Agents updated before this timestamp. Example: "2018-02-27T04:49:26.257525Z".
     */
    updatedAt__lt?: string
    /**
     *Mitigation mode policy for suspicious activity. Example: "detect".
     */
    mitigationModeSuspicious?: string
    /**
     *Do not include these Ranger Statuses. Example: "NotApplicable".
     */
    rangerStatusesNin?: string

    /**
     *Agents created after this timestamp. Example: "2018-02-27T04:49:26.257525Z".
     */
    createdAt__gt?: string

    /**
     *Free-text filter by K8s type(supports multiple values)
     */
    k8sType__contains?: string

    /**
     *Free-text filter by CPU name (supports multiple values). Example: "Intel,AMD".
     */
    cpuId__contains?: string
    /**
     *Free-text filter by aws role(supports multiple values)".
     */
    awsRole__contains?: string

    /**
     *Free-text filter by Serial Number (supports multiple values)
     */
    serialNumber__contains?: string

    /**
     *Agents with threats reported before this time. Example: "2018-02-27T04:49:26.257525Z".
     */
    threatCreatedAt__lt?: string

    /**
     *Free-text filter by Active Directory computer name string (supports multiple values). Example: "DC=sentinelone".
     */
    adComputerName__contains?: string

    /**
     *Free-text filter by K8s node labels (supports multiple values)
     */
    k8sNodeLabels__contains?: string

    /**
     *Ranger versions to include. Example: "2.0.0.0,2.1.5.144".
     */
    rangerVersions?: string

    siteIds?: string
}
