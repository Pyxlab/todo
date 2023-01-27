import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, InferTypeModel } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Directory from './Directory'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public completed: boolean

  @column()
  public important: boolean

  @column()
  public userId: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column()
  public directoryId: string

  @hasOne(() => Directory)
  public directory: HasOne<typeof Directory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public override serialize() {
    return super.serialize() as InferTypeModel<Todo>
  }
}
