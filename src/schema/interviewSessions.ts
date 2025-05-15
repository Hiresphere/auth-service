import {
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const interviewSessions = pgTable('interview_sessions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    type: varchar('type', { length: 50 }), // technical, behavioral, system_design
    recording: text('recording_url'),
    feedback: jsonb('feedback'), // {tone, clarity, confidence, content}
    questions: jsonb('questions'), // array of questions and answers
    score: integer('score'),
    duration: integer('duration'), // in seconds
    createdAt: timestamp('created_at').defaultNow(),
});
