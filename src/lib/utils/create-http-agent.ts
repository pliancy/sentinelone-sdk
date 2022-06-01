import axios, { AxiosInstance } from 'axios'
import { SentinelOneConfig } from '../sentinel-one.types'

export function createHttpAgent(config: SentinelOneConfig): AxiosInstance {
    // TODO: figure out what errors actually look like and do something meaningful with them
    const baseURL = `https://${config.site}/web/api/v2.1`
    const Authorization = `ApiToken ${config.token}`
    const agent = axios.create({ baseURL })
    agent.defaults.headers.common['Authorization'] = Authorization
    return agent
}
