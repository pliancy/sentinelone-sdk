import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'

import { Settings } from './settings'
import { Recipient, ScanSchedule, VulnerabilityScanPolicy } from './settings.types'

describe('Settings', () => {
    let settings: Settings

    const recipient = {
        id: '1',
        email: 'user@example.com',
    } as never as Recipient

    beforeEach(() => {
        mockAxios.reset()
        settings = new Settings(mockAxios as never as AxiosInstance)
    })

    it('should get all notification recipients', async () => {
        const recipients = [recipient]
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { data: recipients } })
        const result = await settings.getAllNotificationRecipients({
            siteIds: ['1'],
            accountIds: ['1'],
        })
        expect(result).toEqual(recipients)
        expect(mockAxios.get).toHaveBeenCalledWith('/settings/recipients', {
            params: { siteIds: ['1'], accountIds: ['1'] },
        })
    })

    it('should set notification recipient', async () => {
        jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { data: recipient } })
        await expect(
            settings.setNotificationRecipient(recipient, { siteIds: ['1'] }),
        ).resolves.toBe(recipient)
        expect(mockAxios.put).toHaveBeenCalledWith('/settings/recipients', {
            data: recipient,
            filter: { siteIds: ['1'] },
        })
    })

    it('should delete notification recipient', async () => {
        jest.spyOn(mockAxios, 'delete').mockResolvedValue({ data: { data: recipient } })
        await expect(settings.deleteNotificationRecipient('1')).resolves.toBe(recipient)
        expect(mockAxios.delete).toHaveBeenCalledWith('/settings/recipients/1')
    })

    it('should revert site vulnerability scanning policy to inherited', async () => {
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { data: undefined } })
        await settings.revertSiteVulnerabilityScanningPolicy('site-123')
        expect(mockAxios.post).toHaveBeenCalledWith('/application-management/settings', {
            filter: { siteIds: 'site-123' },
            data: { isDefaultPolicy: true },
        })
    })

    it('should enable site vulnerability scanning with extensive scan and stop inheritance', async () => {
        const scanSchedule: ScanSchedule = {
            scanEvery: 1,
            repeatOn: 'Tuesday',
            time: '21:49',
            timezone: 'Etc/UTC',
        }
        const policy: VulnerabilityScanPolicy = {
            vulnerabilitiesScanEnabled: true,
            extensiveScanEnabled: true,
            extensiveLinuxScanEnabled: true,
            isDefaultPolicy: false,
            scanSchedule,
        }
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { data: policy } })
        const result = await settings.enableSiteVulnerabilityScanning('site-123', scanSchedule)
        expect(result).toEqual(policy)
        expect(mockAxios.post).toHaveBeenCalledWith('/application-management/settings', {
            filter: { siteIds: 'site-123' },
            data: {
                vulnerabilitiesScanEnabled: true,
                extensiveScanEnabled: true,
                extensiveLinuxScanEnabled: true,
                isDefaultPolicy: false,
                scanSchedule,
            },
        })
    })
})
