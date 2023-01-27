import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createSession } from 'App/Routes/Auth/createSession'
import { userAuthenticated } from 'App/Routes/Auth/userAuthenticated'

export const authRouter = router({
  session: createSession,
  user: userAuthenticated,
})
