import { rest } from 'msw'

import db, { createUser } from './db'

export const handlers = [
  rest.get('https://fake.api/users', (_, res, ctx) => {
    const users = db.users.getAll()

    return res(ctx.delay(), ctx.json(users))
  }),

  rest.get('https://fake.api/users/:id', (req, res, ctx) => {
    const user = db.users.findFirst({
      where: { id: { equals: +req.params.id } },
    })

    return res(ctx.delay(), ctx.json(user))
  }),

  rest.post('https://fake.api/users', async (req, res, ctx) => {
    const users = createUser(await req.json())

    return res(ctx.delay(), ctx.json(users))
  }),

  rest.put('https://fake.api/users/:id', async (req, res, ctx) => {
    const user = db.users.update({
      where: { id: { equals: +req.params.id } },
      data: await req.json(),
    })

    return res(ctx.delay(), ctx.json(user))
  }),

  rest.delete('https://fake.api/users/:id', (req, res, ctx) => {
    db.users.delete({
      where: { id: { equals: +req.params.id } },
    })

    return res(ctx.delay(), ctx.status(200))
  }),
]
