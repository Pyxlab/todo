import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Todo from 'App/Models/Todo'
import { z } from 'zod'

type TodoQuery = ModelQueryBuilderContract<typeof Todo, Todo>

const sortOrders = {
  'order-added': 'created_at',
  'min-date': 'due_date',
  'max-date': 'due_date',
  'completed-first': 'completed',
  'uncompleted-first': 'completed',
} as const

const filterConditions = {
  important: (query: TodoQuery) => query.where('important', true),
  completed: (query: TodoQuery) => query.where('completed', true),
  uncompleted: (query: TodoQuery) => query.where('completed', false),
  today: (query: TodoQuery) => {
    const today = new Date().toISOString().split('T')[0]
    return query.whereRaw('DATE(due_date) = ?', [today])
  },
} as const

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
        filterBy: z.enum(['important', 'completed', 'uncompleted', 'today'] as const).optional(),
        directoryId: z.string().uuid().nullable(),
        query: z.string().nullish(),
      })
      .nullish()
  )
  .query(async ({ ctx, input }) => {
    const query = Todo.query().where('user_id', ctx.auth.user?.id!).preload('directory')

    if (!input) {
      const todos = await query

      return todos.map((todo) => todo.serialize())
    }

    if (input.directoryId) {
      query.where('directory_id', input.directoryId)
    }

    if (input.filterBy) {
      filterConditions[input.filterBy](query)
    }

    const sortBy = sortOrders[input.sortBy]
    let direction: 'asc' | 'desc' = 'asc'

    if (sortBy === 'completed') {
      direction = 'desc'
    } else if (input.sortBy === 'max-date') {
      direction = 'desc'
    }

    if (input.query) {
      query.whereRaw('LOWER(title) LIKE ?', [`%${input.query.toLowerCase()}%`])
    }

    const todos = await query.orderBy(sortBy, direction)

    return todos.map((todo) => todo.serialize())
  })
