export interface Recipient {
    email: string
    id?: string
    name?: string
    sms?: string
}

export type DayOfWeek =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'

export interface ScanSchedule {
    /** Number of weeks between scans */
    scanEvery: number
    repeatOn: DayOfWeek
    /** 24-hour time string, e.g. "21:49" */
    time: string
    /** IANA timezone string, e.g. "Etc/UTC" */
    timezone: string
}

export interface VulnerabilityScanPolicy {
    vulnerabilitiesScanEnabled: boolean
    extensiveScanEnabled: boolean
    extensiveLinuxScanEnabled: boolean
    isDefaultPolicy: boolean
    scanSchedule: ScanSchedule
}
