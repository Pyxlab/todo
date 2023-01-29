import { z } from 'zod'
import procedure from '@ioc:Pyxlab/Adonis/Trpc/Procedure'

export const updateUserAvatarSchema = z.object({
  avatar: z.string(),
})

export const updateUserAvatarProcedure = procedure.protected
  .input(updateUserAvatarSchema)
  .mutation(async ({ ctx: { auth }, input }) => {
    const user = auth.user

    user?.fill({
      avatar: input.avatar,
    })

    await user?.save()

    return user?.serialize()
  })
