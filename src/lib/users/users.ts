import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../utils/paginated-request'
import { User } from './users.types'

export class Users {
    constructor(private readonly httpAgent: AxiosInstance) {
    }

    async getAll(): Promise<User[]> {
        return paginatedRequest(this.httpAgent, 'users')
    }

    async getById(id: string): Promise<User> {
        const { data: res } = await this.httpAgent.get(`users/${id}`)
        return res.data
    }

    async getByEmail(email: string): Promise<User> {
        const { data: res } = await this.httpAgent.get('users', { params: { email } })
        return res.data[0]
    }

    async getBySiteId(siteId: string): Promise<User[]> {
        return paginatedRequest(this.httpAgent, 'users', { params: { siteIds: siteId } })
    }

    async create(user: User): Promise<User> {
        const { data: res } = await this.httpAgent.post('users', { data: user })
        return res.data
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        const { data: res } = await this.httpAgent.put(`users/${id}`, { data: user })
        return res.data
    }

    async delete(id: string): Promise<void> {
        await this.httpAgent.delete(`users/${id}`)
    }
}
