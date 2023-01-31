import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.datetime('due_date').notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('due_date')
    })
  }
}
