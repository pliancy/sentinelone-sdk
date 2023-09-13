import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Applications } from './applications'
import { Application } from './applications.types'

describe('Applications', () => {
    let applications: Applications

    const application = {
        id: '1',
        name: 'application',
    } as never as Application

    beforeEach(() => {
        mockAxios.reset()
        applications = new Applications(mockAxios as never as AxiosInstance)
    })

    it('should get all applications', async () => {
        const data = {
            data: [application],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(applications.getAll()).resolves.toEqual([application])
    })

    it('should get all applications with filter', async () => {
        const data = {
            data: [application],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = applications.getAll({
            riskLevels: ['low', 'medium'],
            agentUuid__contains: ['1', '2'],
            name__contains: ['application', 'application2'],
            agentOsVersion__contains: ['1', '2'],
        })
        await expect(res).resolves.toEqual([application])
        expect(mockAxios.get).toHaveBeenCalledWith('installed-applications', {
            params: {
                cursor: null,
                limit: 100,
                riskLevels: 'low,medium',
                agentUuid__contains: '1,2',
                name__contains: 'application,application2',
                agentOsVersion__contains: '1,2',
            },
        })
    })

    it('should get applications by site id', async () => {
        const data = {
            data: [application],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = applications.getBySiteId('1')
        await expect(res).resolves.toEqual([application])
        expect(mockAxios.get).toHaveBeenCalledWith('installed-applications', {
            params: { siteIds: '1', cursor: null, limit: 100 },
        })
    })

    it('should get agent by uuid', async () => {
        const data = {
            data: [application],
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = applications.getByAgentUUID('1')
        await expect(res).resolves.toEqual([application])
        expect(mockAxios.get).toHaveBeenCalledWith('installed-applications', {
            params: {
                cursor: null,
                limit: 100,
                agentUuid__contains: '1',
            },
        })
    })
})
