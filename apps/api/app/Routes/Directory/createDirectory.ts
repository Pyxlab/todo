import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'

export const createDirectorySchema = z.object({
  name: z.string().min(3).max(255),
})

export const createDirectoryProcedure = procedure.protected
  .input(createDirectorySchema)
  .mutation(async ({ ctx: { auth }, input }) => {
    const user = auth.user

    const directoryExit = await user.related('directories').query().where('name', input.name)

    if (directoryExit) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Directory already exists',
      })
    }

    const directory = await user.related('directories').create(input)

    return directory?.serialize()
  })
