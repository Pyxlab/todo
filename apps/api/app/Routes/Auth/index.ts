import { router } from '@ioc:Pyxlab/Adonis/Trpc'
import { createSession } from 'App/Routes/Auth/CreateSession'
import { userAuthenticated } from 'App/Routes/Auth/UserAuthenticated'

export const authRouter = router({
  session: createSession,
  user: userAuthenticated,
})
