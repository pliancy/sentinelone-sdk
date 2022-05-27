import axios, { AxiosInstance } from 'axios'
import { SentinelOneConfig } from '../sentinel-one.types'

export function createHttpAgent(config: SentinelOneConfig): AxiosInstance {
    const baseURL = `https://${config.site}/web/api/v2.0`
    const Authorization = `ApiToken ${config.token}`
    const agent = axios.create({ baseURL })
    agent.defaults.headers.common['Authorization'] = Authorization
    return agent
}
