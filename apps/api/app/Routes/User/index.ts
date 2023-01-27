import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createUserProcedure } from './createUser'

export const usersRouter = router({
  create: createUserProcedure,
})
