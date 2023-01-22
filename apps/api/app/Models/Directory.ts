import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  InferTypeModel,
} from '@ioc:Adonis/Lucid/Orm'
import Todo from './Todo'
import User from './User'

export default class Directory extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public userId: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serialize(): InferTypeModel<Directory> {
    return super.serialize()
  }
}
