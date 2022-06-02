import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { Site } from './sites.types'

export class Sites {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<Site[]> {
        return paginatedRequest(this.httpAgent, 'sites', {}, 'sites')
    }

    async create(site: Site): Promise<Site> {
        const { data: res } = await this.httpAgent.post('sites', { data: site })
        return res.data
    }

    async getById(id: string): Promise<Site> {
        const { data: res } = await this.httpAgent.get('sites', { params: { siteIds: id } })
        return res.data.sites[0] as Site
    }

    async update(id: string, site: Site): Promise<Site> {
        const { data: res } = await this.httpAgent.put(`sites/${id}`, { data: site })
        return res.data
    }

    async delete(id: string): Promise<void> {
        await this.httpAgent.delete(`sites/${id}`)
    }
}
