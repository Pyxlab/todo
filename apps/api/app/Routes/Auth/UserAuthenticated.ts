import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@ioc:Pyxlab/Adonis/Trpc'

export const userAuthenticated = publicProcedure.query(async ({ ctx: { auth } }) => {
  const isAuthenticated = auth.isAuthenticated

  if (!isAuthenticated) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    })
  }

  return auth?.user?.serialize()
})
