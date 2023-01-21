import { router } from '@ioc:Pyxlab/Adonis/Trpc'
import { authRouter } from 'App/Routes/Auth'

const appRouter = router({
  auth: authRouter,
})

export default appRouter

export type AppRouter = typeof appRouter
