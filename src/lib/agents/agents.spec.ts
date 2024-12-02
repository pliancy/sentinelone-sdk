import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Agents } from './agents'
import { Agent, Package } from './agents.types'

describe('Agents', () => {
    let agents: Agents

    const agent = {
        id: '1',
        name: 'agent',
        siteId: '1',
    } as never as Agent

    beforeEach(() => {
        mockAxios.reset()
        agents = new Agents(mockAxios as never as AxiosInstance)
    })

    it('should get all agents', async () => {
        const data = {
            data: [agent],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await expect(agents.getAll()).resolves.toEqual([agent])
    })

    it('should get agents by site id', async () => {
        const data = {
            data: [agent],
            pagination: {
                nextCursor: null,
                totalItems: 1,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = agents.getBySiteId('1')
        await expect(res).resolves.toEqual([agent])
        expect(mockAxios.get).toHaveBeenCalledWith('agents', {
            params: { siteIds: '1', cursor: null, limit: 100 },
        })
    })

    it('should get agent by id', async () => {
        const data = {
            data: [agent],
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = agents.getById('1')
        await expect(res).resolves.toEqual(agent)
        expect(mockAxios.get).toHaveBeenCalledWith('agents', {
            params: { ids: ['1'] },
        })
    })

    it('should get agent by uuid', async () => {
        const data = {
            data: [agent],
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = agents.getByUuid('1')
        await expect(res).resolves.toEqual(agent)
        expect(mockAxios.get).toHaveBeenCalledWith('agents', {
            params: { uuid: '1' },
        })
    })

    it('should initiate scan by uuid', async () => {
        jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: {} })
        await agents.initiateScanById('1')
        expect(mockAxios.post).toHaveBeenCalledWith('agents/scan', {
            filter: { ids: ['1'] },
        })
    })

    it('should get all packages', async () => {
        const data = {
            data: [],
            pagination: {
                nextCursor: null,
                totalItems: 0,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await agents.getAllPackages()
        expect(mockAxios.get).toHaveBeenCalledWith('update/agent/packages', {
            params: {
                cursor: null,
                limit: 100,
                sortBy: 'createdAt',
                sortOrder: 'desc',
            },
        })
    })

    it('should get agent applications', async () => {
        const data = {
            data: [],
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        await agents.getApplications('1')
        expect(mockAxios.get).toHaveBeenCalledWith('agents/applications', {
            params: { ids: '1' },
        })
    })

    it('should get latest OS packages by platform', async () => {
        const packages = [
            {
                id: '1',
                version: '1.0.0',
                minorVersion: 'GA',
                majorVersion: '1',
                osArch: '64 bit',
                osType: 'windows',
                fileExtension: '.msi',
            },
            {
                id: '2',
                version: '1.0.0',
                minorVersion: 'GA',
                majorVersion: '1',
                osArch: '32 bit',
                osType: 'windows',
                fileExtension: '.msi',
            },
            {
                id: '3',
                version: '1.0.0',
                minorVersion: 'GA',
                majorVersion: '1',
                osArch: '32/64 bit',
                osType: 'macos',
                fileExtension: '.pkg',
            },
        ] as Package[]
        const data = {
            data: packages,
            pagination: {
                nextCursor: null,
                totalItems: 0,
            },
        }

        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await agents.getOsPackages()
        expect(mockAxios.get).toHaveBeenCalledWith('update/agent/packages', {
            params: {
                cursor: null,
                limit: 100,
                sortBy: 'createdAt',
                sortOrder: 'desc',
            },
        })
        expect(res).toEqual({
            macos: packages[2],
            'windows-64': packages[0],
            'windows-32': packages[1],
        })
    })
})
