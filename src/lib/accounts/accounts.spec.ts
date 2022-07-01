import { Accounts } from './accounts'
import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'

describe('Accounts', () => {
    let accounts: Accounts

    beforeEach(() => {
        mockAxios.reset()
        accounts = new Accounts(mockAxios as never as AxiosInstance)
    })

    it('works', () => expect(accounts).toBeTruthy())

    it('gets an account by Id', async () => {
        const acct = { id: '1' }
        const data = {
            data: acct,
        }
        jest.spyOn(mockAxios, 'get').mockResolvedValue({ data })
        const res = await accounts.getById('1')
        expect(res).toEqual(acct)
        expect(mockAxios.get).toHaveBeenCalledWith('accounts/1')
    })
})
