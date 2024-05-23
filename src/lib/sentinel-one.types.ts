import { AxiosResponse } from 'axios'

export interface SentinelOneConfig {
    site: string
    token: string
    /** Optional - In milliseconds
     */
    timeoutMs?: number
}

export type ResponseProps = {
    sites: string
}

export interface Response<T> {
    pagination: {
        nextCursor: string
        totalItems: number
    }
    errors: S1ApiError[]
    data:
        | {
              [P in keyof ResponseProps]: T | T[]
          }
        | T[]
        | T
}

export interface S1ApiError {
    code: number
    detail: string
    title: string
}

export type S1ErrorResponse = AxiosResponse & {
    response: { data: { errors: S1ApiError[] } }
}
