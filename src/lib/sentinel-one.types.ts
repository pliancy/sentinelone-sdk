export interface SentinelOneConfig {
    site: string
    token: string
}

export type ResponseProps = {
    sites: string
}

export interface Response<T> {
    pagination: {
        nextCursor: string
        totalItems: number
    }
    errors: {
        type: string
    }[]
    data: {
        [P in keyof ResponseProps]: T | T[]
    }
}
