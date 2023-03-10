import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  InferTypeModel,
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
  public name: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Directory)
  public directories: HasMany<typeof Directory>

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

  @column()
  public avatar: string

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

  public override serialize() {
    return super.serialize() as InferTypeModel<User>
  }
}
