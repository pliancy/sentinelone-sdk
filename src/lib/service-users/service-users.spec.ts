import { AxiosInstance } from 'axios'
import mockAxios from 'jest-mock-axios'
import { ServiceUsers } from './service-users'
import { ServiceUser } from './service-users.types'

describe('ServiceUsers', () => {
    let serviceUsers: ServiceUsers

    const user = {
        id: '123',
        name: 'Test User',
    } as never as ServiceUser

    beforeEach(() => {
        mockAxios.reset()
        serviceUsers = new ServiceUsers(mockAxios as never as AxiosInstance)
    })

    it('gets a service user by Id', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await serviceUsers.getById('123')
        expect(res).toEqual(user)
        expect(mockAxios.get).toHaveBeenCalledWith('service-users/123')
    })

    it('creates a service user', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data })
        const res = await serviceUsers.create(user)
        expect(res).toEqual(user)
        expect(mockAxios.post).toHaveBeenCalledWith('service-users', {
            data: user,
        })
    })

    it('updates a service user', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'put').mockResolvedValue({ data })
        const res = await serviceUsers.update('123', user)
        expect(res).toEqual(user)
        expect(mockAxios.put).toHaveBeenCalledWith('service-users/123', {
            data: user,
        })
    })
})
