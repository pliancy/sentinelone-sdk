import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { Site, UpdateSiteModulesRequest, UpdateSiteModulesResponse } from './sites.types'
import { S1ApiError } from '../sentinel-one.types'

export class Sites {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<Site[]> {
        return paginatedRequest(this.httpAgent, 'sites', {}, 'sites')
    }

    async getActive(): Promise<Site[]> {
        return paginatedRequest(
            this.httpAgent,
            'sites',
            {
                params: {
                    state: 'active',
                },
            },
            'sites',
        )
    }

    async create(site: Partial<Site>): Promise<Site> {
        const { data: res } = await this.httpAgent.post('sites', { data: site })
        return res.data
    }

    async getById(id: string): Promise<Site> {
        const { data: res } = await this.httpAgent.get(`sites/${id}`)
        return res.data
    }

    async getByExternalId(id: string): Promise<Site[]> {
        const { data: res } = await this.httpAgent.get('sites', {
            params: {
                externalId: id,
                state: 'active',
            },
        })
        return res.data.sites
    }

    async getByName(name: string): Promise<Site> {
        const { data: res } = await this.httpAgent.get('sites', {
            params: {
                name,
                state: 'active',
            },
        })
        return res.data.sites[0]
    }

    async update(id: string, data: Partial<Site>): Promise<Site> {
        const { data: res } = await this.httpAgent.put(`sites/${id}`, { data })
        return res.data
    }

    async updateSiteModules(
        id: string,
        modules: UpdateSiteModulesRequest[],
    ): Promise<UpdateSiteModulesResponse> {
        const add = modules.filter((m) => m.operation === 'add')
        const remove = modules.filter((m) => m.operation === 'remove')
        const res: UpdateSiteModulesResponse = { added: 0, removed: 0, errors: [] }
        const filter = { siteIds: [id] }
        const { data: addRes } = await this.httpAgent.put<{
            data: { affected: number }
            errors: S1ApiError[]
        }>(`licenses/update-sites-modules`, {
            data: {
                operation: 'add',
                modules: add.map((m) => ({ name: m.name })),
            },
            filter,
        })
        res.added = addRes.data?.affected
        if (addRes.errors.length) res.errors.push(...addRes.errors)
        const { data: removeRes } = await this.httpAgent.put<{
            data: { affected: number }
            errors: S1ApiError[]
        }>(`licenses/update-sites-modules`, {
            data: {
                operation: 'remove',
                modules: remove.map((m) => ({ name: m.name })),
            },
            filter,
        })
        res.removed = removeRes.data?.affected
        if (removeRes.errors.length) res.errors.push(...removeRes.errors)
        return res
    }

    async delete(id: string): Promise<void> {
        const { data: res } = await this.httpAgent.delete(`sites/${id}`)
        return res.data
    }
}
