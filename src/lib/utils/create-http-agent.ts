import axios, { AxiosInstance } from 'axios'
import { SentinelOneConfig } from '../sentinel-one.types'

export function createHttpAgent(config: SentinelOneConfig): AxiosInstance {
    const baseURL = `https://${config.site}/web/api/v2.1`
    const Authorization = `ApiToken ${config.token}`
    const agent = axios.create({ baseURL, timeout: config.timeoutMs })
    agent.defaults.headers.common['Authorization'] = Authorization

    // On Axios error, throw a simple, relevant error
    agent.interceptors.response.use(
        (res) => res,
        (err) => {
            throw {
                status: err.response.status,
                statusText: err.response.statusText,
                errors: err.response.data.errors,
            }
        },
    )
    return agent
}
