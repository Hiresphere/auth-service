import { jsonb, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const userProfiles = pgTable('user_profiles', {
    userId: uuid('user_id').primaryKey().notNull(),
    firstName: varchar('first_name', { length: 255 }), // First name of the user
    lastName: varchar('last_name', { length: 255 }), // Last name of the user
    address: text('address'), // Address of the user
    industry: varchar('industry', { length: 255 }), // Industry in which the user works
    industryInsight: text('industry_insight'), // Industry insights the user is interested in
    experience: jsonb('experience'), // Experience
    skills: jsonb('skills'), // Skills
    assessments: jsonb('assessments'), // Assessments attempted by the user
    resume: text('resume'), // Resume
    coverLetter: jsonb('cover_letter'), // Array of cover letters for a particular job
    preferredLocations: jsonb('preferred_locations'), // Preferred locations of the user
    targetSalary: jsonb('target_salary'), // Target salary of the user
    jobPreferences: jsonb('job_preferences'), // remote, hybrid, etc.
    personalityAssessments: jsonb('personality_assessments'), // DISC/MBTI results
    languages: jsonb('languages'), // spoken languages
    portfolioLinks: jsonb('portfolio_links'), // Links to the user's portfolio
    socialProfiles: jsonb('social_profiles'), // Social profiles of the user
    preparationProgress: jsonb('preparation_progress'), // Preparation progress of the user
    weeklyDigestPreferences: jsonb('weekly_digest_preferences'), // Weekly digest preferences of the user
});
