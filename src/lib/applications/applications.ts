import { AxiosInstance } from 'axios'
import { Application, ApplicationFilter } from './applications.types'
import { paginatedRequest } from '../utils/paginated-request'
import { serializeFilters } from '../utils/serialize-filters'

export class Applications {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(filter?: ApplicationFilter): Promise<Application[]> {
        const serializedFilter = serializeFilters(filter as Record<string, string | []>)
        return paginatedRequest(this.httpAgent, 'installed-applications', {
            params: serializedFilter,
        })
    }

    async getBySiteId(siteId: string, filter?: ApplicationFilter): Promise<Application[]> {
        const serializedFilter = serializeFilters(filter as Record<string, string | []>)
        return paginatedRequest(this.httpAgent, 'installed-applications', {
            params: { ...serializedFilter, siteIds: siteId },
        })
    }

    async getByAgentUUID(id: string, filter?: ApplicationFilter): Promise<Application[]> {
        const serializedFilter = serializeFilters(filter as Record<string, string | []>)
        return paginatedRequest(this.httpAgent, 'installed-applications', {
            params: { ...serializedFilter, agentUuid__contains: id },
        })
    }
}
