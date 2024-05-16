import { DateTime } from "luxon";
import User from "App/Models/User";
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import Forum from "./Forum";

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column({ serializeAs: 'forumId' })
  public forumId: number;

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime;

  // Relationship
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Forum)
  public forum: BelongsTo<typeof Forum>;
}