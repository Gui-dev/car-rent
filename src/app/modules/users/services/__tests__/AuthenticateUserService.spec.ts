import { UserRepositoryInMemory } from '@modules/users/infra/typeorm/repositories/in-memory/UserRepositoryInMemory'
import { FakeBcryptHashProvider } from '@modules/users/providers/hashProvider/fakes/FakeBcryptHashProvider'
import { AuthenticateUserService } from '../AuthenticateUserService'
import { CreateUserServices } from '../CreateUserServices'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { AppError } from '@shared/infra/error/AppError'

let userRepositoryInMemory: UserRepositoryInMemory
let authenticateUserService: AuthenticateUserService
let createUserService: CreateUserServices
let fakeBcryptHashProvider: FakeBcryptHashProvider

describe('Authenticate User Service', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    fakeBcryptHashProvider = new FakeBcryptHashProvider()
    fakeBcryptHashProvider = new FakeBcryptHashProvider()
    authenticateUserService = new AuthenticateUserService(
      userRepositoryInMemory,
      fakeBcryptHashProvider
    )
    createUserService = new CreateUserServices(
      userRepositoryInMemory,
      fakeBcryptHashProvider
    )
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Bruce Wayne',
      email: 'bruce@email.com',
      password: '123456',
      driver_license: '0000111222'
    }

    const userResult = await createUserService.execute(user)
    const authenticateResult = await authenticateUserService.execute({
      email: userResult.email,
      password: userResult.password
    })

    expect(authenticateResult).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: 'fake@email.com',
        password: 'fake_password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Bruce Wayne',
        email: 'bruce@email.com',
        password: '123456',
        driver_license: '0000111222'
      }

      const userResult = await createUserService.execute(user)

      await authenticateUserService.execute({
        email: userResult.email,
        password: 'fake_password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
