import { AxiosInstance } from 'axios'
import { Recipient } from './settings.types'

export class Settings {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAllNotificationRecipients(filter?: {
        siteIds?: string[]
        accountIds?: string[]
    }): Promise<Recipient[]> {
        const params: Record<string, unknown> = {}

        if (filter?.accountIds) {
            params.accountIds = filter.accountIds
        }

        if (filter?.siteIds) {
            params.siteIds = filter.siteIds
        }

        const { data: res } = await this.httpAgent.get('/settings/recipients', {
            params,
        })
        return res.data
    }

    async setNotificationRecipient(
        recipient: Recipient,
        filter?: { siteIds?: string[]; accountIds?: string[] },
    ): Promise<void> {
        const body: Record<string, unknown> = { data: recipient }

        if (filter) {
            body.filter = filter
        }

        const { data: res } = await this.httpAgent.put('/settings/recipients', body)
        return res.data
    }
}
