import { AxiosInstance } from 'axios'

export const paginatedRequest = async (
    httpAgent: AxiosInstance,
    route: string,
    filter?: { [index: string]: any },
): Promise<any[]> => {
    const params = {
        per_page: 100,
        page: 1,
    }

    if (filter) Object.assign(params, { ...filter })

    const res = await httpAgent.get(route, {
        params,
    })
    const totalCount = Number(res.headers['x-total-count'] as string)
    const pages = Math.ceil(totalCount / 100)
    const data = res.data

    for (let i = 1; i < pages; i++) {
        Object.assign(params, { page: i + 1 })

        const { data: resData } = await httpAgent.get(route, {
            params,
        })
        data.push(...resData)
    }

    return data
}
