import type { Database } from '@stacksjs/database'
import { sql } from '@stacksjs/database'

export async function up(db: Database<any>) {
  await db.schema
    .createTable('product_items')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('uuid', 'text')
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('size', 'text')
    .addColumn('color', 'text')
    .addColumn('price', 'integer', col => col.notNull())
    .addColumn('image_url', 'text')
    .addColumn('is_available', 'boolean')
    .addColumn('inventory_count', 'integer')
    .addColumn('sku', 'text', col => col.notNull())
    .addColumn('custom_options', 'text')
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp')
    .execute()

  await db.schema.createIndex('product_items_id_index').on('product_items').column('id').execute()
}
