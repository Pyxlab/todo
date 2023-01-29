import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createUserProcedure } from './createUser'
import { updateUserAvatarProcedure } from './updateUserAvatar'

export const usersRouter = router({
  create: createUserProcedure,
  updateAvatar: updateUserAvatarProcedure,
})
