import { integer, jsonb, pgTable, uuid } from 'drizzle-orm/pg-core';

export const userAchievements = pgTable('user_achievements', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    xp: integer('xp').default(0),
    level: integer('level').default(1),
    streak: integer('streak').default(0),
    badges: jsonb('badges'),
    weeklyActivity: jsonb('weekly_activity'),
});
