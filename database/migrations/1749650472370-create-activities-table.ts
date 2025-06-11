import type { Database } from '@stacksjs/database'
import { sql } from '@stacksjs/database'

export async function up(db: Database<any>) {
  await db.schema
    .createTable('activities')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('title', 'text')
    .addColumn('description', 'text')
    .addColumn('address', 'text')
    .addColumn('latlng', 'text')
    .addColumn('info_source', 'text')
    .addColumn('were_detained', 'boolean')
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp')
    .execute()

  await db.schema.createIndex('activities_id_index').on('activities').column('id').execute()
}
