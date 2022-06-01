import { AxiosInstance, AxiosRequestConfig } from 'axios'

export const paginatedRequest = async (
    httpAgent: AxiosInstance,
    route: string,
    config: AxiosRequestConfig = {},
    nestedKey?: string,
): Promise<any[]> => {
    let data = []
    let lastResult: any
    do {
        const params: any = {}
        if (lastResult?.data?.pagination?.nextCursor)
            params.cursor = lastResult.data.pagination.nextCursor

        const { data: res } = await httpAgent.get(route, config)
        if (nestedKey) {
            data.push(...res.data[nestedKey])
        } else {
            data.push(...res.data)
        }

        lastResult = res
    } while (lastResult?.data?.pagination?.nextCursor)

    return data
}
