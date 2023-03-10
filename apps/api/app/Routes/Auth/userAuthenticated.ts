import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { z } from 'zod'

export const userAuthenticated = procedure.protected
  .input(z.object({}).nullish())
  .query(async ({ ctx: { auth } }) => auth.user.serialize())
