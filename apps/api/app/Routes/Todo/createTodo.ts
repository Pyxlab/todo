import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import { DateTime } from 'luxon'
import { z } from 'zod'

export const createTodoSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(0).max(255),
  completed: z.boolean(),
  important: z.boolean(),
  dueDate: z
    .string()
    .or(z.date())
    .transform((value) => {
      if (value instanceof Date) {
        return DateTime.fromJSDate(value)
      }

      return DateTime.fromISO(value)
    }),
  directoryId: z.string().uuid(),
})

export const createTodoProcedure = procedure.protected
  .input(createTodoSchema)
  .mutation(async ({ input, ctx }) => {
    const todo = await ctx.auth.user.related('todos').create(input)

    return todo.serialize()
  })
