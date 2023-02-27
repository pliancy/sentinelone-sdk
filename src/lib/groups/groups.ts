import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { CreateGroup, Group } from './groups.types'

export class Groups {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(siteIds?: string[]): Promise<Group[]> {
        return paginatedRequest(this.httpAgent, 'groups', {
            params: {
                siteIds: siteIds?.join(','),
            },
        })
    }

    async getBySiteId(siteId: string): Promise<Group[]> {
        return paginatedRequest(this.httpAgent, 'groups', {
            params: {
                siteIds: siteId,
            },
        })
    }

    async create(group: CreateGroup): Promise<Group> {
        const { data: res } = await this.httpAgent.post('groups', { data: group })
        return res.data
    }

    async getById(id: string): Promise<Group> {
        const { data: res } = await this.httpAgent.get(`groups/${id}`)
        return res.data
    }

    async getByExternalId(id: string): Promise<Group[]> {
        const { data: res } = await this.httpAgent.get('groups', {
            params: {
                externalId: id,
            },
        })
        return res.data
    }

    async getByName(name: string, siteIds?: string[]): Promise<Group> {
        const { data: res } = await this.httpAgent.get('groups', {
            params: {
                name,
                siteIds: siteIds?.join(','),
            },
        })
        return res.data[0]
    }

    async update(id: string, data: Partial<CreateGroup>): Promise<Group> {
        const { data: res } = await this.httpAgent.put(`groups/${id}`, { data })
        return res.data
    }

    async delete(id: string): Promise<void> {
        const { data: res } = await this.httpAgent.delete(`groups/${id}`)
        return res.data
    }
}
