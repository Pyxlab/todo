import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createTodoProcedure } from './createTodo'

export const todosRouter = router({
  create: createTodoProcedure,
})
