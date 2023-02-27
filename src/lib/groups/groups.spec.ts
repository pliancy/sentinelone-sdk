import mockAxios from 'jest-mock-axios'
import { Groups } from './groups'
import { AxiosInstance } from 'axios'
import { Group } from './groups.types'

describe('Groups', () => {
    let groups: Groups

    const group = {
        id: '123',
        name: 'Test Group',
    } as never as Group

    beforeEach(() => {
        mockAxios.reset()
        groups = new Groups(mockAxios as never as AxiosInstance)
    })

    it('gets all groups', async () => {
        const data = {
            data: [group],
            pagination: {
                nextCursor: null,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(groups.getAll()).resolves.toEqual([group])
    })

    it('gets group by Id', async () => {
        const group = { id: '1' }
        const data = {
            data: group,
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await groups.getById('1')
        expect(res).toEqual(group)
        expect(mockAxios.get).toHaveBeenCalledWith('groups/1')
    })

    it('gets group by name', async () => {
        const group = { id: '1', name: 'Cust' }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { data: [group] } })
        const res = await groups.getByName('Cust')
        expect(res).toEqual(group)
        expect(mockAxios.get).toHaveBeenCalledWith('groups', {
            params: {
                name: 'Cust',
            },
        })
    })

    it('creates a group', async () => {
        const data = {
            data: group,
        }
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data })
        const res = await groups.create(group)
        expect(res).toEqual(group)
        expect(mockAxios.post).toHaveBeenCalledWith('groups', { data: group })
    })

    it('updates a group', async () => {
        const data = {
            data: group,
        }
        jest.spyOn(mockAxios, 'put').mockResolvedValue({ data })
        const res = await groups.update('123', group)
        expect(res).toEqual(group)
        expect(mockAxios.put).toHaveBeenCalledWith('groups/123', { data: group })
    })

    it('deletes a group', async () => {
        jest.spyOn(mockAxios, 'delete').mockResolvedValue({ data: {} })
        await groups.delete('123')
        expect(mockAxios.delete).toHaveBeenCalledWith('groups/123')
    })

    it('gets groups by siteId', async () => {
        const data = {
            data: [group],
            pagination: {
                nextCursor: null,
            },
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await groups.getBySiteId('123')
        expect(res).toEqual([group])
        expect(mockAxios.get).toHaveBeenCalledWith('groups', {
            params: {
                siteIds: '123',
                limit: 100,
                cursor: null,
            },
        })
    })
})
