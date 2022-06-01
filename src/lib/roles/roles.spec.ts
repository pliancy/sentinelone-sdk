import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Roles } from './roles'
import { Role } from './roles.types'

describe('Roles', () => {
    let roles: Roles

    const role = {
        id: '1',
        name: 'role',
    } as never as Role

    beforeEach(() => {
        mockAxios.reset()
        roles = new Roles(mockAxios as never as AxiosInstance)
    })

    it('should get all roles', async () => {
        const data = {
            data: [role],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(roles.getAll()).resolves.toEqual([role])
    })

    it('should get roles by name', async () => {
        const data = {
            data: [role],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = roles.getByName('role')
        await expect(res).resolves.toEqual(role)
        expect(mockAxios.get).toHaveBeenCalledWith('rbac/roles', { params: { name: 'role' } })
    })

    it('should get roles by id', async () => {
        const data = {
            data: role,
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = roles.getById('1')
        await expect(res).resolves.toEqual(role)
        expect(mockAxios.get).toHaveBeenCalledWith('rbac/role/1')
    })
})
