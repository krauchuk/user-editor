import { factory, primaryKey } from '@mswjs/data'

import userData from './fakeUsersData'
import { User } from '@/types'

export const db = factory({
  users: {
    id: primaryKey(Number),
    name: String,
    username: String,
    email: String,
    city: String,
  },
})

export const createUser = (user: Omit<User, 'id'>) => {
  const lastUser = db.users
    .findMany({
      orderBy: {
        id: 'asc',
      },
    })
    .at(-1)

  return db.users.create({ id: lastUser ? lastUser.id + 1 : 1, ...user })
}

userData.forEach(user => createUser(user))

export default db
