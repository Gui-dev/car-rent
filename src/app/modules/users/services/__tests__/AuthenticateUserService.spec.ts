import { UserRepositoryInMemory } from '@modules/users/infra/typeorm/repositories/in-memory/UserRepositoryInMemory'
import { FakeBcryptHashProvider } from '@modules/users/providers/hashProvider/fakes/FakeBcryptHashProvider'
import { AuthenticateUserService } from '../AuthenticateUserService'
import { CreateUserServices } from '../CreateUserServices'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

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
})
