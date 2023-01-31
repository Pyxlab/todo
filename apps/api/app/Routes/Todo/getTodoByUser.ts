import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'
import Todo from 'App/Models/Todo'
import { z } from 'zod'

export const getTodoByUserProcedure = procedure.protected
  .input(z.object({}).nullish())
  .query(async ({ ctx }) => {
    const todos = await Todo.query().where('user_id', ctx.auth.user?.id!).preload('directory')

    return todos.map((todo) => todo.serialize())
  })
