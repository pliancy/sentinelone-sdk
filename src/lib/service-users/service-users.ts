import { AxiosInstance } from 'axios'
import { DeleteServiceUserResponse, ServiceUser } from './service-users.types'

export class ServiceUsers {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getById(id: string): Promise<ServiceUser> {
        const { data: res } = await this.httpAgent.get(`service-users/${id}`)
        return res.data
    }

    async create(user: Omit<ServiceUser, 'id' | 'apiToken'>): Promise<ServiceUser> {
        const { data: res } = await this.httpAgent.post('service-users', {
            data: user,
        })
        return res.data
    }

    async update(
        id: string,
        data: Partial<Omit<ServiceUser, 'id' | 'apiToken'>>,
    ): Promise<ServiceUser> {
        const { data: res } = await this.httpAgent.put(`service-users/${id}`, {
            data,
        })
        return res.data
    }

    async delete(id: string): Promise<DeleteServiceUserResponse> {
        const { data: res } = await this.httpAgent.delete<DeleteServiceUserResponse>(
            `service-users/${id}`,
        )
        return res
    }
}
