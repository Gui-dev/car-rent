import { UserRepositoryInMemory } from '@modules/users/infra/typeorm/repositories/in-memory/UserRepositoryInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/users/infra/typeorm/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DayJSDateProvider } from '@shared/providers/DateProvider/implementations/DayJSDateProvider'
import { EtherealMailProviderInMemory } from '@shared/providers/MailProvider/fakes/EtherealMailProviderInMemory'
import { SendForgotPasswordService } from '../SendForgotPasswordService'
import { AppError } from '@shared/infra/error/AppError'

let userRepositoryInMemory: UserRepositoryInMemory
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory
let dayJSDateProvider: DayJSDateProvider
let etherealMailProviderInMemory: EtherealMailProviderInMemory
let sendForgotPasswordService: SendForgotPasswordService

describe('SendForgotPasswordService', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
    dayJSDateProvider = new DayJSDateProvider()
    etherealMailProviderInMemory = new EtherealMailProviderInMemory()
    sendForgotPasswordService = new SendForgotPasswordService(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayJSDateProvider,
      etherealMailProviderInMemory
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(etherealMailProviderInMemory, 'sendMail')

    await userRepositoryInMemory.create({
      name: 'Bruce Wayne',
      email: 'bruce@email.com',
      password: '123456',
      driver_license: 'XXX-XXX-XXX'
    })

    await sendForgotPasswordService.execute('bruce@email.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user doesn\'t exists', async () => {
    await expect(
      sendForgotPasswordService.execute('fake@email.com')
    ).rejects.toEqual(new AppError('User doesn\'t exists'))
  })
})
