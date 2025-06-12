import type { Database } from '@stacksjs/database'
import { sql } from '@stacksjs/database'

export async function up(db: Database<any>) {
  await db.schema
    .createTable('oauth_clients')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('secret', 'text', col => col.notNull())
    .addColumn('provider', 'text')
    .addColumn('redirect', 'text', col => col.notNull())
    .addColumn('personal_access_client', 'boolean', col => col.notNull())
    .addColumn('password_client', 'boolean', col => col.notNull())
    .addColumn('revoked', 'boolean', col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp')
    .execute()

  await db.schema.createIndex('oauth_clients_id_index').on('oauth_clients').column('id').execute()
}
