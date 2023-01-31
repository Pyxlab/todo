import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Todo from 'App/Models/Todo'
import { TRPCError } from '@ioc:Pyxlab/Adonis/Trpc'
import { DateTime } from 'luxon'

export const updateTodoSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  important: z.boolean().optional(),
  dueDate: z
    .date()
    .optional()
    .transform((date) => {
      if (date) {
        return DateTime.fromISO(date.toISOString())
      }
    }),
  directoryId: z.string().optional(),
})

export const updateTodoProcedure = procedure.protected
  .input(updateTodoSchema)
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
        code: 'FORBIDDEN',
        message: 'Todo does not belong to user',
      })
    }

    todo.merge(input)

    await todo.save()
  })
