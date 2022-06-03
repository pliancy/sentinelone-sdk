import { createHttpAgent } from './create-http-agent'
import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'

describe('HttpAgent', () => {
    let instance: AxiosInstance

    const conf = { site: 'foo.bar', token: 'token' }

    const axiosError = {
        response: {
            status: 400,
            statusText: 'BAD_REQUEST',
            data: {
                errors: [
                    {
                        code: '00000',
                        detail: 'the thing is bork',
                        title: 'Validation Error',
                    },
                ],
            },
        },
        request: {},
    }

    beforeEach(() => {
        instance = createHttpAgent(conf)
        jest.spyOn(mockAxios, 'create')
    })

    afterEach(() => {
        expect(mockAxios.create).toHaveBeenCalledWith({
            baseURL: `https://${conf.site}/web/api/v2.1`,
        })
        expect(mockAxios.defaults.headers.common['Authorization']).toEqual('ApiToken token')
    })

    it('creates an axios instance', () => {
        expect(instance).toBeTruthy()
    })

    it('sets the Authorization header', () => {
        expect(mockAxios.defaults.headers.common['Authorization']).toEqual('ApiToken token')
    })

    it('intercepts and transforms errors', async () => {
        const expected = {
            status: axiosError.response.status,
            statusText: axiosError.response.statusText,
            errors: axiosError.response.data.errors,
        }

        const mockResponseErrorCallback = (mockAxios.interceptors.response.use as jest.Mock).mock
            .calls[0][1]

        try {
            mockResponseErrorCallback(axiosError)
        } catch (e) {
            expect(e).toEqual(expected)
        }
    })

    it('intercepts and returns the response', async () => {
        const expected = {}
        const mockResponseCallback = (mockAxios.interceptors.response.use as jest.Mock).mock
            .calls[0][0]

        expect(mockResponseCallback(expected)).toEqual(expected)
    })
})
