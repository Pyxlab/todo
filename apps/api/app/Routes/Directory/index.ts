import router from '@ioc:Pyxlab/Adonis/Trpc/Router'
import { createDirectoryProcedure } from './createDirectory'
import { deleteDirectoryProcedure } from './deleteDirectory'
import { getDirectoryByIdProcedure } from './getDirectoryById'
import { listDirectoryProcedure } from './listDirectory'
import { updateDirectoryProcedure } from './updateDirectory'

export const directoriesRouter = router({
  create: createDirectoryProcedure,
  delete: deleteDirectoryProcedure,
  getById: getDirectoryByIdProcedure,
  list: listDirectoryProcedure,
  update: updateDirectoryProcedure,
})
