import { container } from 'tsyringe'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

import { IBcryptHashProvider } from '@modules/users/providers/hashProvider/models/IBcryptHashProvider'
import { BcryptHashProvider } from '@modules/users/providers/hashProvider/implementations/BcryptHasProvider'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IBcryptHashProvider>('BcryptHashProvider', BcryptHashProvider)
