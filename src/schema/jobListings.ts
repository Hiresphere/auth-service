import {
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const jobListings = pgTable('job_listings', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }).notNull(),
    description: text('description').notNull(),
    location: varchar('location', { length: 255 }),
    salary: jsonb('salary'), // {min, max, currency, period}
    requirements: jsonb('requirements'),
    source: varchar('source', { length: 50 }), // LinkedIn, Indeed, etc.
    sourceUrl: varchar('source_url', { length: 1024 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
