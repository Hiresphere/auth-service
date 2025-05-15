import type { Config } from 'drizzle-kit';
import { dbConfig } from './src/config/db';

export default {
    schema: ['./src/schema/**/*.ts'],
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: dbConfig,
} satisfies Config;
