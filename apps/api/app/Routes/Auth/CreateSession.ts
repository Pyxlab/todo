import { z } from 'zod'
import User from 'App/Models/User'
import { TRPCError } from '@trpc/server'
import Hash from '@ioc:Adonis/Core/Hash'
import { publicProcedure } from '@ioc:Pyxlab/Adonis/Trpc'

const input = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const createSession = publicProcedure
  .input(input)
  .mutation(async ({ ctx: { auth }, input }) => {
    const user = await User.findBy('email', input.email)

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Email or password is invalid',
      })
    }

    const isPasswordValid = await Hash.verify(user.password, input.password)

    if (!isPasswordValid) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Email or password is invalid',
      })
    }

    const authToken = await auth.use('api').login(user, {
      expiresIn: '1days',
    })

    return {
      ...authToken.toJSON(),
      user: user.serialize(),
    }
  })

export type CreateSessionInput = z.infer<typeof input>
