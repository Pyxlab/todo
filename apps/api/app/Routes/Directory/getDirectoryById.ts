import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Directory from 'App/Models/Directory'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'

export const getDirectoryByIdSchema = z.object({
  id: z.string().uuid(),
})

export const getDirectoryByIdProcedure = procedure.protected
  .input(getDirectoryByIdSchema)
  .query(async ({ input }) => {
    const directory = await Directory.find(input.id)

    if (!directory) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Directory not found',
      })
    }

    return directory.serialize()
  })
