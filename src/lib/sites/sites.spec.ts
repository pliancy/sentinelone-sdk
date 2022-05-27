import mockAxios from 'jest-mock-axios'
import { Sites } from './sites'
import { AxiosInstance } from 'axios'

describe('Sites', () => {
    let sites: Sites

    beforeEach(() => {
        mockAxios.reset()
        sites = new Sites(mockAxios as never as AxiosInstance)
    })

    it('fails to get all sites', async () => {
        const data = {
            errors: ['it bork', 'no idea why'],
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(sites.getAll()).rejects.toEqual(new Error('it bork, no idea why'))
    })

    it('gets all sites', async () => {
        const data = {
            data: { sites: [] },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(sites.getAll()).resolves.toEqual([])
    })
})
