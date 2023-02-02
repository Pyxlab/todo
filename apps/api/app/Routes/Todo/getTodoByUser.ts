import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Todo from 'App/Models/Todo'
import { z } from 'zod'

export const getTodoByUserProcedure = procedure.protected
  .input(
    z
      .object({
        sortBy: z.enum([
          'order-added',
          'min-date',
          'max-date',
          'completed-first',
          'uncompleted-first',
        ] as const),
      })
      .nullish()
  )
  .query(async ({ ctx, input }) => {
    if (!input) {
      const todos = await Todo.query().where('user_id', ctx.auth.user?.id!).preload('directory')

      return todos.map((todo) => todo.serialize())
    }

    switch (input.sortBy) {
      case 'order-added':
        const todos = await Todo.query()
          .where('user_id', ctx.auth.user?.id!)
          .orderBy('created_at', 'asc')
          .preload('directory')

        return todos.map((todo) => todo.serialize())
      case 'min-date':
        const todosMinDate = await Todo.query()
          .where('user_id', ctx.auth.user?.id!)
          .orderBy('due_date', 'asc')
          .preload('directory')

        return todosMinDate.map((todo) => todo.serialize())

      case 'max-date':
        const todosMaxDate = await Todo.query()
          .where('user_id', ctx.auth.user?.id!)
          .orderBy('due_date', 'desc')
          .preload('directory')

        return todosMaxDate.map((todo) => todo.serialize())

      case 'completed-first':
        const todosCompletedFirst = await Todo.query()
          .where('user_id', ctx.auth.user?.id!)
          .orderBy('completed', 'desc')
          .preload('directory')

        return todosCompletedFirst.map((todo) => todo.serialize())

      case 'uncompleted-first':
        const todosUncompletedFirst = await Todo.query()
          .where('user_id', ctx.auth.user?.id!)
          .orderBy('completed', 'asc')
          .preload('directory')

        return todosUncompletedFirst.map((todo) => todo.serialize())
    }
  })
