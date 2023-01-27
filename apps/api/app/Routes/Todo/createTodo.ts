import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { z } from 'zod'

export const createTodoSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  completed: z.boolean(),
  important: z.boolean(),
  directoryId: z.string(),
})

export const createTodoProcedure = procedure.protected
  .input(createTodoSchema)
  .mutation(async ({ input, ctx }) => {
    const todo = await ctx.auth.user!.related('todos').create(input)

    return todo.serialize()
  })
