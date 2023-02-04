import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createTodoProcedure } from './createTodo'
import { deteteTodoByIdProcedure } from './deteteTodoById'
import { getTodoByIdProcedure } from './getTodoById'
import { getTodoByUserProcedure } from './getTodoByUser'
import { updateTodoProcedure } from './updateTodo'

export const todosRouter = router({
  create: createTodoProcedure,
  deteteById: deteteTodoByIdProcedure,
  getById: getTodoByIdProcedure,
  getByUser: getTodoByUserProcedure,
  update: updateTodoProcedure,
})
