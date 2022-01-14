import { v4 as uuid } from 'uuid'

import { BcryptHashProvider } from '@modules/users/providers/hashProvider/implementations/BcryptHasProvider'
import createConnection from '@shared/infra/database'

const create = async () => {
  const connection = await createConnection('localhost')
  const bcryptHashProvider = new BcryptHashProvider()
  const password = await bcryptHashProvider.generateHash('123456')
  const id = uuid()

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "admin", created_at)
     VALUES('${id}', 'Batman', 'batman@email.com', '${password}', 'XXXXXXXXX', 'true', 'now()')
    `
  )

  await connection.close()
}

create().then(() => console.log('User admin created'))
