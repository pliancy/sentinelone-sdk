import { AxiosInstance } from 'axios'
import { Account } from './accounts.types'

export class Accounts {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getById(id: string): Promise<Account> {
        const { data: res } = await this.httpAgent.get(`accounts/${id}`)
        return res.data
    }
}
