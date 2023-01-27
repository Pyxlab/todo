import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { z } from 'zod'

export const getTodosByUserProcedure = procedure.protected
  .input(z.object({}))
  .query(async ({ ctx }) => {
    const todos = await ctx.auth.user!.related('todos').query()

    return todos.map((todo) => todo.serialize())
  })
