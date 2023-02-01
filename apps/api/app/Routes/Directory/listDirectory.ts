import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'

export const listDirectorySchema = z.object({}).nullish()

export const listDirectoryProcedure = procedure.protected
  .input(listDirectorySchema)
  .query(async ({ ctx: { auth } }) => {
    const user = auth.user

    const directories = await user.related('directories').query()

    return directories.map((directory) => directory.serialize())
  })
