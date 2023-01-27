import { TRPCError } from '@trpc/server'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { z } from 'zod'

export const userAuthenticated = procedure
  .input(z.object({}).nullish())
  .query(async ({ ctx: { auth } }) => {
    const isAuthenticated = auth.isAuthenticated

    if (!isAuthenticated) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      })
    }

    return auth?.user?.serialize()
  })
