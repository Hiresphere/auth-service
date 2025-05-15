import {
    boolean,
    integer,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).default('user').notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),

    // Social Login fields
    provider: varchar('provider', { length: 128 }),
    providerId: varchar('provider_id', { length: 256 }),

    // MFA-related fields
    mfaEnabled: boolean('mfa_enabled').default(false),
    mfaSecret: varchar('mfa_secret', { length: 255 }),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    lastLogin: timestamp('last_login', { mode: 'date' }),
    deletedAt: timestamp('deleted_at', { mode: 'date' }),
});
