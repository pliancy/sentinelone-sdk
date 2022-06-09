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

    it('gets active sites', async () => {
        const data = {
            data: { sites: [site] },
            pagination: {
                nextCursor: null,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(sites.getActive()).resolves.toEqual([site])
        expect(mockAxios.get).toHaveBeenCalledWith('sites', {
            params: {
                cursor: null,
                limit: 100,
                state: 'active',
            },
        })
    })

    it('gets site by Id', async () => {
        const site = { id: '1' }
        const data = {
            data: site,
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await sites.getById('1')
        expect(res).toEqual(site)
        expect(mockAxios.get).toHaveBeenCalledWith('sites/1')
    })

    it('gets site by name', async () => {
        const site = { id: '1', name: 'Cust' }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { data: { sites: [site] } } })
        const res = await sites.getByName('Cust')
        expect(res).toEqual(site)
        expect(mockAxios.get).toHaveBeenCalledWith('sites', {
            params: {
                name: 'Cust',
                state: 'active',
            },
        })
    })

    it('gets sites by externalId', async () => {
        const s = [
            { id: '1', externalId: 'CUST' },
            { id: '2', externalId: 'CUST' },
        ]
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { data: { sites: s } } })
        const res = await sites.getByExternalId('CUST')
        expect(res).toEqual(s)
        expect(mockAxios.get).toHaveBeenCalledWith('sites', {
            params: {
                externalId: 'CUST',
                state: 'active',
            },
        })
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
        jest.spyOn(mockAxios, 'delete').mockResolvedValue({ data: {} })
        await sites.delete('123')
        expect(mockAxios.delete).toHaveBeenCalledWith('sites/123')
    })
})
