import { AxiosInstance } from 'axios'
import { Agent, AgentApplication, Package } from './agents.types'
import { paginatedRequest } from '../utils/paginated-request'

export class Agents {
    constructor(private readonly httpAgent: AxiosInstance) {}

    async getAll(): Promise<Agent[]> {
        return paginatedRequest(this.httpAgent, 'agents')
    }

    async getBySiteId(siteId: string): Promise<Agent[]> {
        return paginatedRequest(this.httpAgent, 'agents', {
            params: { siteIds: siteId },
        })
    }

    async getById(id: string): Promise<Agent> {
        const { data: res } = await this.httpAgent.get('agents', {
            params: { ids: [id] },
        })
        return res.data[0] as Agent
    }

    async getByUuid(uuid: string): Promise<Agent> {
        const { data: res } = await this.httpAgent.get('agents', {
            params: { uuid },
        })
        return res.data[0] as Agent
    }

    async getApplications(id: string): Promise<AgentApplication[]> {
        const { data: res } = await this.httpAgent.get('agents/applications', {
            params: { ids: id },
        })

        return res.data
    }

    async initiateScanByUuid(uuid: string): Promise<any> {
        const { data: res } = await this.httpAgent.post('agents/scan', {
            filter: { uuid },
        })
        return res.data
    }

    async initiateScanById(id: string): Promise<any> {
        const { data: res } = await this.httpAgent.post('agents/scan', {
            filter: { ids: [id] },
        })
        return res.data
    }

    async getAllPackages(): Promise<Package[]> {
        return paginatedRequest(this.httpAgent, 'update/agent/packages', {
            params: { sortBy: 'createdAt', sortOrder: 'desc' },
        })
    }

    /**
     * Gets the latest GA Packages for MacOs, Windows 32 and Windows 64
     */

    async getOsPackages() {
        const packages = await this.getAllPackages()

        return {
            macos: packages.find(
                (p) =>
                    p.osType === 'macos' && p.minorVersion === 'GA' && p.fileExtension === '.pkg',
            ),
            'windows-64': packages.find(
                (p) =>
                    p.osType === 'windows' &&
                    p.osArch === '64 bit' &&
                    p.fileExtension === '.msi' &&
                    p.minorVersion === 'GA',
            ),
            'windows-32': packages.find(
                (p) =>
                    p.osType === 'windows' &&
                    p.osArch === '32 bit' &&
                    p.fileExtension === '.msi' &&
                    p.minorVersion === 'GA',
            ),
        }
    }
}
