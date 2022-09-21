import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'

import { Settings } from './settings'
import { Recipient } from './settings.types'

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
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: recipients })
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
})
