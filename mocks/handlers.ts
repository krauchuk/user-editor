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
    const body = await req.json()
    const isExist = !!db.users.findFirst({ where: { username: { equals: body.username.trim() } } })

    if (isExist) {
      return res(
        ctx.delay(),
        ctx.status(422),
        ctx.json({
          message: 'This name is already taken. Please choose another name',
          code: 422,
        }),
      )
    }

    const user = createUser(body)

    return res(ctx.delay(), ctx.json(user))
  }),

  rest.put('https://fake.api/users/:id', async (req, res, ctx) => {
    const body = await req.json()
    const searchedUser = db.users.findFirst({ where: { username: { equals: body.username.trim() } } })

    if (searchedUser && searchedUser.id !== +req.params.id) {
      return res(
        ctx.delay(),
        ctx.status(422),
        ctx.json({
          message: 'This name is already taken. Please choose another name',
          code: 422,
        }),
      )
    }

    const user = db.users.update({
      where: { id: { equals: +req.params.id } },
      data: body,
    })

    return res(ctx.delay(), ctx.json(user))
  }),

  rest.delete('https://fake.api/users/:id', (req, res, ctx) => {
    db.users.delete({
      where: { id: { equals: +req.params.id } },
    })

    return res(ctx.delay(), ctx.status(200), ctx.json({ ok: true }))
  }),
]
