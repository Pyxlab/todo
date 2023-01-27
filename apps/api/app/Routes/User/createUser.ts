import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import User from 'App/Models/User'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

export const createUserProcedure = procedure.input(createUserSchema).mutation(async ({ input }) => {
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password,
  })

  await user.related('directories').create({ name: 'Main' })

  return user.serialize()
})
