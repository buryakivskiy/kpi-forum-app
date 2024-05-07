import { DateTime } from "luxon";
import User from "App/Models/User";
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
} from "@ioc:Adonis/Lucid/Orm";

export default class Forum extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column({ serializeAs: 'isOpen' })
  public isOpen: boolean;

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime;

  // Relationship
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}