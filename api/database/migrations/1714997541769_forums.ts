import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forums extends BaseSchema {
  protected tableName = 'forums'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_open').defaultTo(true);
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
      table.timestamps(true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
