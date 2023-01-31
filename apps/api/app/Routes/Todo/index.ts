import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createTodoProcedure } from './createTodo'
import { getTodoByUserProcedure } from './getTodoByUser'
import { updateTodoProcedure } from './updateTodo'

export const todosRouter = router({
  create: createTodoProcedure,
  getByUser: getTodoByUserProcedure,
  update: updateTodoProcedure,
})
