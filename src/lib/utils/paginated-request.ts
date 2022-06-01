import { AxiosInstance, AxiosRequestConfig } from 'axios'

export const paginatedRequest = async (
    httpAgent: AxiosInstance,
    route: string,
    config: AxiosRequestConfig = {},
    nestedKey?: string,
): Promise<any[]> => {
    let data = []
    let nextCursor = null
    do {
        const newConfig: AxiosRequestConfig = {
            ...config,
            params: { ...config.params, ...{ cursor: nextCursor, limit: 100 } },
        }

        const { data: res } = await httpAgent.get(route, newConfig)
        if (nestedKey) {
            data.push(...res.data[nestedKey])
        } else {
            data.push(...res.data)
        }

        nextCursor = res?.pagination?.nextCursor || null
    } while (nextCursor)

    return data
}
