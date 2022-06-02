import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { Role } from './roles.types'

export class Roles {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<Role[]> {
        return paginatedRequest(this.httpAgent, 'rbac/roles')
    }

    async getById(id: string): Promise<Role> {
        const { data: res } = await this.httpAgent.get(`rbac/role/${id}`)
        return res.data
    }

    async getByName(name: string): Promise<Role> {
        const { data: res } = await this.httpAgent.get('rbac/roles', { params: { name } })
        return res.data[0]
    }
}
