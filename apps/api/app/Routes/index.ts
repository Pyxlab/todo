import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { authRouter } from './Auth'
import { directoriesRouter } from './Directory'
import { todosRouter } from './Todo'
import { usersRouter } from './User'

const appRouter = router({
  auth: authRouter,
  directories: directoriesRouter,
  todos: todosRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
export default appRouter
