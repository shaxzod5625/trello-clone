import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import List from "App/Models/List";
import Task from "App/Models/Task";

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public list_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => List)
  public list: BelongsTo<typeof List>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>
}
