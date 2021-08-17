import { migrate } from '@djgrant/postgres-migrations';
import { Client } from 'pg';
import logger from './logger';

export async function applyMigrations(): Promise<void> {
  logger.info('Applying migrations');

  const dbConfig = {
    connectionString: process.env.DATABASE_URL,
  };

  const client = new Client(dbConfig);
  try {
    await client.connect();
    await migrate({ client }, './migrations', {
      migrationTableName: 'auth.migrations',
    });
  } finally {
    await client.end();
  }
  logger.info('Finished applying migrations');
}