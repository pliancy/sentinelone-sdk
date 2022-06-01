import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'

export class Roles {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<any> {
        return paginatedRequest(this.httpAgent, 'rbac/roles')
    }

    async getById(id: string): Promise<any> {
        const { data: res } = await this.httpAgent.get(`rbac/role/${id}`)
        return res.data
    }

    async getByName(name: string): Promise<any> {
        const { data: res } = await this.httpAgent.get('rbac/roles', { params: { name } })
        return res.data[0]
    }
}
