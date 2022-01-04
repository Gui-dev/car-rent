import { container } from 'tsyringe'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

import { IBcryptHashProvider } from '@modules/users/providers/hashProvider/models/IBcryptHashProvider'
import { BcryptHashProvider } from '@modules/users/providers/hashProvider/implementations/BcryptHasProvider'

import { IJsonWebTokenProvider } from '@modules/users/providers/jwt/models/IJsonWebTokenProvider'
import { JsonWebTokenProvider } from '@modules/users/providers/jwt/implementations/JsonWebTokenProvider'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IBcryptHashProvider>('BcryptHashProvider', BcryptHashProvider)
container.registerSingleton<IJsonWebTokenProvider>('JsonWebTokenProvider', JsonWebTokenProvider)
