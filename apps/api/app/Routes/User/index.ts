import { router } from '@ioc:Pyxlab/Adonis/Trpc'
import { createUserProcedure } from './CreateUser'

export const userRouter = router({
  create: createUserProcedure,
})
