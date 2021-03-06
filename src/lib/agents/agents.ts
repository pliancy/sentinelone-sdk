import { AxiosInstance } from 'axios'
import { Agent } from './agents.types'
import { paginatedRequest } from '../utils/paginated-request'

export class Agents {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<Agent[]> {
        return paginatedRequest(this.httpAgent, 'agents')
    }

    async getBySiteId(siteId: string): Promise<Agent[]> {
        return paginatedRequest(this.httpAgent, 'agents', { params: { siteIds: siteId } })
    }

    async getById(id: string): Promise<Agent> {
        const { data: res } = await this.httpAgent.get('agents', {
            params: { ids: [id] },
        })
        return res.data[0] as Agent
    }

    async getByUuid(uuid: string): Promise<Agent> {
        const { data: res } = await this.httpAgent.get('agents', {
            params: { uuid },
        })
        return res.data[0] as Agent
    }

    async initiateScanByUuid(uuid: string): Promise<any> {
        const { data: res } = await this.httpAgent.post('agents/scan', { filter: { uuid } })
        return res.data
    }

    async initiateScanById(id: string): Promise<any> {
        const { data: res } = await this.httpAgent.post('agents/scan', { filter: { ids: [id] } })
        return res.data
    }
}
