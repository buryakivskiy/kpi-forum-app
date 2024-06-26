import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Forum from './Forum'
import Comment from './Comment'
import Like from './Like'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column({ serializeAs: 'firstName' })
  public firstName: string

  @column({ serializeAs: 'lastName' })
  public lastName: string

  @column()
  public patronymic: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: 'rememberMeToken' })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt'})
  public updatedAt: DateTime

  // Relationship
  @hasMany(() => Forum)
  public forums: HasMany<typeof Forum>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>;

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
