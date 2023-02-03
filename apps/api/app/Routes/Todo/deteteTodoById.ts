import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Todo from 'App/Models/Todo'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'

export const deteteTodoByIdSchema = z.object({
  id: z.string(),
})

export const deteteTodoByIdProcedure = procedure.protected
  .input(deteteTodoByIdSchema)
  .mutation(async ({ ctx: { auth }, input }) => {
    const todo = await Todo.find(input.id)

    if (!todo) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Todo not found',
      })
    }

    if (todo.userId !== auth.user?.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to delete this todo',
      })
    }

    try {
      await todo.delete()
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    }
  })
