import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'

export const updateDirectorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
})

export const updateDirectoryProcedure = procedure.protected
  .input(updateDirectorySchema)
  .mutation(async ({ ctx: { auth }, input }) => {
    const user = auth.user

    const directory = await user.related('directories').query().where('id', input.id).first()

    if (!directory) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Directory not found',
      })
    }

    await directory.merge(input).save()

    return directory.serialize()
  })
