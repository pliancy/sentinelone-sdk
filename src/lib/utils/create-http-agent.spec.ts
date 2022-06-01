import { createHttpAgent } from './create-http-agent'
import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'

describe('HttpAgent', () => {
    let instance: AxiosInstance

    const conf = { site: 'foo.bar', token: 'token' }

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
})
