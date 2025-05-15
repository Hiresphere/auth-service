import {
    integer,
    jsonb,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const studyProgress = pgTable('study_progress', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    topic: varchar('topic', { length: 255 }), // DSA, DBMS, etc.
    subtopic: varchar('subtopic', { length: 255 }),
    progress: integer('progress'), // percentage
    quizScores: jsonb('quiz_scores'),
    lastStudied: timestamp('last_studied'),
});
