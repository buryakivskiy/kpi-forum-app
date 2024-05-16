import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Likes extends BaseSchema {
  protected tableName = 'likes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table
        .integer('forum_id')
        .unsigned()
        .references('forums.id')
        .onDelete('CASCADE') 
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
