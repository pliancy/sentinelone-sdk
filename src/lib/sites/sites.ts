import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { Site } from './sites.types'

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

    async create(site: Site): Promise<Site> {
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
        return res.sites
    }

    async getByName(name: string): Promise<Site[]> {
        const { data: res } = await this.httpAgent.get('sites', {
            params: {
                name,
                state: 'active',
            },
        })
        return res.sites[0]
    }

    async update(id: string, data: Partial<Site>): Promise<Site> {
        const { data: res } = await this.httpAgent.put(`sites/${id}`, { data })
        return res.data
    }

    async delete(id: string): Promise<void> {
        const { data: res } = await this.httpAgent.delete(`sites/${id}`)
        return res.data
    }
}
