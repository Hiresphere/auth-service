import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const applications = pgTable('applications', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    jobId: uuid('job_id'),
    status: varchar('status', { length: 50 }), // applied, interviewing, rejected, accepted
    appliedAt: timestamp('applied_at').defaultNow(),
    customResume: text('custom_resume'),
    customCoverLetter: text('custom_cover_letter'),
    notes: text('notes'),
    nextFollowUp: timestamp('next_follow_up'),
    lastInteraction: timestamp('last_interaction'),
});
