import mockAxios from 'jest-mock-axios'
import { Sites } from './sites'
import { AxiosInstance } from 'axios'
import { Site } from './sites.types'

describe('Sites', () => {
    let sites: Sites

    const site = {
        id: '123',
        name: 'Test Site',
    } as never as Site

    beforeEach(() => {
        mockAxios.reset()
        sites = new Sites(mockAxios as never as AxiosInstance)
    })

    it('gets all sites', async () => {
        const data = {
            data: { sites: [site] },
            pagination: {
                nextCursor: null,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(sites.getAll()).resolves.toEqual([site])
    })

    it('gets site by Id', async () => {
        const data = {
            data: { sites: [site] },
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await sites.getById('123')
        expect(res).toEqual(site)
        expect(mockAxios.get).toHaveBeenCalledWith('sites', { params: { siteIds: '123' } })
    })

    it('creates a site', async () => {
        const data = {
            data: site,
        }
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data })
        const res = await sites.create(site)
        expect(res).toEqual(site)
        expect(mockAxios.post).toHaveBeenCalledWith('sites', { data: site })
    })

    it('updates a site', async () => {
        const data = {
            data: site,
        }
        jest.spyOn(mockAxios, 'put').mockResolvedValue({ data })
        const res = await sites.update('123', site)
        expect(res).toEqual(site)
        expect(mockAxios.put).toHaveBeenCalledWith('sites/123', { data: site })
    })

    it('deletes a site', async () => {
        jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
        await sites.delete('123')
        expect(mockAxios.delete).toHaveBeenCalledWith('sites/123')
    })
})
