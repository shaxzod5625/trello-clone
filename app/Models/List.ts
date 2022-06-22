import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Desk from 'App/Models/Desk'
import Card from "App/Models/Card";

export default class List extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public desk_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relations
  @belongsTo(() => Desk)
  public desk: BelongsTo<typeof Desk>

  @hasMany(() => Card)
  public cards: HasMany<typeof Card>
}
