import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import List from './List'

export default class Desk extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public title: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(() => List)
  public lists: HasMany<typeof List>
}
