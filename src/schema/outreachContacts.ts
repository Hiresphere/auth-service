import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const outreachContacts = pgTable('outreach_contacts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    name: varchar('name', { length: 255 }),
    company: varchar('company', { length: 255 }),
    role: varchar('role', { length: 255 }),
    email: varchar('email', { length: 255 }),
    linkedinUrl: varchar('linkedin_url', { length: 1024 }),
    status: varchar('status', { length: 50 }), // new, contacted, responded, etc.
    category: varchar('category', { length: 50 }), // recruiter, hiring_manager, etc.
    sentiment: varchar('sentiment', { length: 50 }), // positive, neutral, negative
    crmId: varchar('crm_id', { length: 255 }), // external CRM reference
});
