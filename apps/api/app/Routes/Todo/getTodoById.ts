import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'

export const getTodoByIdSchema = z.object({
  id: z.string(),
})

export const getTodoByIdProcedure = procedure.protected
  .input(getTodoByIdSchema)
  .query(async ({ ctx: { auth }, input }) => {
    const todo = await auth.user?.related('todos').query().where('id', input.id).first()

    if (!todo) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Todo not found',
      })
    }

    return todo.serialize()
  })
