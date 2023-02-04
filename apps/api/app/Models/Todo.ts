import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, InferTypeModel } from '@ioc:Adonis/Lucid/Orm'
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

  @column({
    serializeAs: 'userId',
  })
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({
    serializeAs: 'dueDate',
  })
  public dueDate: DateTime

  @column({
    serializeAs: 'directoryId',
  })
  public directoryId: string

  @belongsTo(() => Directory)
  public directory: BelongsTo<typeof Directory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public override serialize() {
    return super.serialize() as InferTypeModel<Todo>
  }
}
