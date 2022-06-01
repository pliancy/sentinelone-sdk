import { AxiosInstance } from 'axios'
import mockAxios from 'jest-mock-axios'
import { Users } from './users'
import { User } from './users.types'

describe('Users', () => {
    let users: Users

    const user = {
        id: '123',
        fullName: 'Test User',
        email: 'user.email.com',
    } as never as User

    beforeEach(() => {
        mockAxios.reset()
        users = new Users(mockAxios as never as AxiosInstance)
    })

    it('gets all users', async () => {
        const data = {
            data: [user],
            pagination: {
                nextCursor: null,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(users.getAll()).resolves.toEqual([user])
    })

    it('gets user by Id', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await users.getById('123')
        expect(res).toEqual(user)
        expect(mockAxios.get).toHaveBeenCalledWith('users/123')
    })

    it('gets user by email', async () => {
        const data = {
            data: [user],
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await users.getByEmail('user.email.com')
        expect(res).toEqual(user)
        expect(mockAxios.get).toHaveBeenCalledWith('users', { params: { email: 'user.email.com' } })
    })

    it('creates a user', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data })
        const res = await users.create(user)
        expect(res).toEqual(user)
        expect(mockAxios.post).toHaveBeenCalledWith('users', { data: user })
    })

    it('updates a user', async () => {
        const data = {
            data: user,
        }
        jest.spyOn(mockAxios, 'put').mockResolvedValue({ data })
        const res = await users.update('123', user)
        expect(res).toEqual(user)
        expect(mockAxios.put).toHaveBeenCalledWith('users/123', { data: user })
    })

    it('deletes a user', async () => {
        jest.spyOn(mockAxios, 'delete').mockResolvedValue({ data: null })
        await users.delete('123')
        expect(mockAxios.delete).toHaveBeenCalledWith('users/123')
    })

    it('gets all users by site id', async () => {
        const data = {
            data: [user],
            pagination: {
                nextCursor: null,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await users.getBySiteId('123')
        expect(res).toEqual([user])
        expect(mockAxios.get).toHaveBeenCalledWith('users', {
            params: { siteIds: '123', cursor: null, limit: 100 },
        })
    })
})
