import mockAxios from 'jest-mock-axios'
import { Sites } from './sites'
import { AxiosInstance } from 'axios'
import { Site, UpdateSiteModulesRequest } from './sites.types'

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

    describe('updateSiteModules', () => {
        const siteId = '456'
        const filter = { siteIds: [siteId] }

        beforeEach(() => {
            jest.resetAllMocks()
        })

        it('adds and removes modules, returning affected counts', async () => {
            const modules: UpdateSiteModulesRequest[] = [
                { name: 'moduleA', operation: 'add' },
                { name: 'moduleB', operation: 'remove' },
            ]

            jest.spyOn(mockAxios, 'put')
                .mockResolvedValueOnce({ data: { data: { affected: 1 }, errors: [] } })
                .mockResolvedValueOnce({ data: { data: { affected: 1 }, errors: [] } })

            const res = await sites.updateSiteModules(siteId, modules)

            expect(res).toEqual({ added: 1, removed: 1, errors: [] })
            expect(mockAxios.put).toHaveBeenNthCalledWith(1, 'licenses/update-sites-modules', {
                data: { operation: 'add', modules: [{ name: 'moduleA', operation: 'add' }] },
                filter,
            })
            expect(mockAxios.put).toHaveBeenNthCalledWith(2, 'licenses/update-sites-modules', {
                data: { operation: 'remove', modules: [{ name: 'moduleB', operation: 'remove' }] },
                filter,
            })
        })

        it('handles add-only modules', async () => {
            const modules: UpdateSiteModulesRequest[] = [
                { name: 'moduleA', operation: 'add' },
                { name: 'moduleB', operation: 'add' },
            ]

            jest.spyOn(mockAxios, 'put')
                .mockResolvedValueOnce({ data: { data: { affected: 2 }, errors: [] } })
                .mockResolvedValueOnce({ data: { data: { affected: 0 }, errors: [] } })

            const res = await sites.updateSiteModules(siteId, modules)

            expect(res).toEqual({ added: 2, removed: 0, errors: [] })
            expect(mockAxios.put).toHaveBeenNthCalledWith(1, 'licenses/update-sites-modules', {
                data: {
                    operation: 'add',
                    modules: [
                        { name: 'moduleA', operation: 'add' },
                        { name: 'moduleB', operation: 'add' },
                    ],
                },
                filter,
            })
        })

        it('handles remove-only modules', async () => {
            const modules: UpdateSiteModulesRequest[] = [{ name: 'moduleC', operation: 'remove' }]

            jest.spyOn(mockAxios, 'put').mockResolvedValueOnce({
                data: { data: { affected: 1 }, errors: [] },
            })

            const res = await sites.updateSiteModules(siteId, modules)

            expect(res).toEqual({ added: 0, removed: 1, errors: [] })
            expect(mockAxios.put).toHaveBeenCalledTimes(1)
            expect(mockAxios.put).toHaveBeenCalledWith('licenses/update-sites-modules', {
                data: { operation: 'remove', modules: [{ name: 'moduleC', operation: 'remove' }] },
                filter,
            })
        })

        it('collects errors from add and remove responses', async () => {
            const modules: UpdateSiteModulesRequest[] = [
                { name: 'moduleA', operation: 'add' },
                { name: 'moduleB', operation: 'remove' },
            ]
            const addError = { code: 'ERR_ADD', detail: 'add failed', title: 'Add Error' }
            const removeError = {
                code: 'ERR_REMOVE',
                detail: 'remove failed',
                title: 'Remove Error',
            }

            jest.spyOn(mockAxios, 'put')
                .mockResolvedValueOnce({ data: { data: { affected: 0 }, errors: [addError] } })
                .mockResolvedValueOnce({ data: { data: { affected: 0 }, errors: [removeError] } })

            const res = await sites.updateSiteModules(siteId, modules)

            expect(res.errors).toEqual([addError, removeError])
            expect(res.added).toBe(0)
            expect(res.removed).toBe(0)
            expect(mockAxios.put).toHaveBeenCalledTimes(2)
        })
    })
})
