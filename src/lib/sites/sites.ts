import { AxiosInstance } from 'axios'
import { Site } from './sites.types'
import { Response } from '../sentinel-one.types'

export class Sites {
    constructor(private readonly agent: AxiosInstance) {}

    async getAll(): Promise<Site[]> {
        const { data: res } = await this.agent.get<Response<Site>>('sites')
        // TODO: figure out what errors actually look like and do something meaningful with them
        if (res.errors) {
            throw new Error(res.errors.join(', '))
        }
        return res.data.sites as Site[]
    }
}
