export interface Site {
    id: string
    siteType?: SiteType
    description?: string
    licenses?: License[]
    expiration?: string
    inherits?: boolean
    unlimitedExpiration?: boolean
    accountSfId?: string
    policy?: Policy
    name: string
    externalId?: string
    unlimitedLicenses?: boolean
    accountId: string
    suite: Suite
    totalLicenses?: number
    sku?: Suite
}

export interface License {
    bundles: Bundle[]
}

export interface Bundle {
    name: string
    majorVersion?: number
    surfaces?: Surface[]
}

export interface Surface {
    name: string
    count?: number
}

export interface Policy {
    agentLoggingOn: boolean
    agentNotification?: boolean
    agentUi?: AgentUi
    agentUiOn?: boolean
    allowRemoteShell?: boolean
    antiTamperingOn?: boolean
    autoDecommissionDays?: number
    autoDecommissionOn?: boolean
    autoFileUpload?: AutoFileUpload
    autoImmuneOn?: boolean
    autoMitigationAction?: string
    cloudValidationOn?: Switch
    createdAt?: string
    engines: Engines
    scanNewAgents?: boolean
    inheritedFrom?: PolicySource
    ioc?: boolean
    iocAttributes?: IocAttributes
    iocSupported?: boolean
    isDefault?: boolean
    mitigationMode?: MitigationMode
    mitigationModeSuspicious?: MitigationMode
    monitorOnExecute?: boolean
    monitorOnWrite?: boolean
    networkQuarantineOn?: boolean
    remoteOrchestration?: RemoteOrchestration
    cloudValidation?: CloudValidation
    researchOn?: boolean
    snapshotsOn?: boolean
}

export interface AgentUi {
    agentUiOn: boolean
    contactCompany?: string
    contactDirectMessage?: string
    contactEmail?: string
    contactFreeText?: string
    contactOther?: string
    contactPhoneNumber?: string
    contactSupportWebsite?: string
    devicePopUpNotifications?: boolean
    maxEventAgeDays?: number
    showAgentWarnings?: boolean
    showDeviceTab?: boolean
    showQuarantineTab?: boolean
    showSupport?: boolean
    showSuspicious?: boolean
    threatPopUpNotifications?: boolean
}

export interface AutoFileUpload {
    enabled?: boolean
    includeBenignFiles?: boolean
    maxDailyFileUpload?: number
    maxDailyFileUploadLimit?: number
    maxFileSize?: number
    maxFileSizeLimit?: number
    maxLocalDiskUsage?: number
    maxLocalDiskUsageLimit?: number
}

export interface Engines {
    applicationControl?: Switch
    dataFiles?: Switch
    executables?: Switch
    exploits?: Switch
    lateralMovement?: Switch
    penetration?: Switch
    preExecution?: Switch
    preExecutionSuspicious?: Switch
    pup?: Switch
    remoteShell?: Switch
    reputation?: Switch
}

export type Switch = 'on' | 'off'

export type PolicySource = 'account' | 'global' | 'site'

export interface IocAttributes {
    autoInstallBrowserExtensions?: boolean
    behavioralIndicators?: boolean
    commandScripts?: boolean
    crossProcess?: boolean
    dataMasking?: boolean
    dllModuleLoad?: boolean
    dns?: boolean
    fds?: boolean
    file?: boolean
    headers?: boolean
    ip?: boolean
    login?: boolean
    process?: boolean
    registry?: boolean
    scheduledTask?: boolean
    url?: boolean
}

export type MitigationMode = 'detect' | 'project'

export type SiteType = 'Paid' | 'Trial'

export interface RemoteOrchestration {
    maxFileSizeLimit: number
    maxDailyFileUploadLimit: number
    alwaysUploadStreamToCloud: boolean
    maxFileSize: number
    maxDailyFileUpload: number
}

export interface CloudValidation {
    default: boolean
    description: string
}

export type Suite = 'Complete' | 'Core' | 'Control'
