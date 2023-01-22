import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  InferTypeModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Directory from './Directory'
import Todo from './Todo'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Directory)
  public directories: HasMany<typeof Directory>

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public override serialize(): InferTypeModel<User> {
    return super.serialize()
  }
}
