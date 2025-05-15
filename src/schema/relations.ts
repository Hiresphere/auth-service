import { relations } from 'drizzle-orm';
import { applications } from './applications';
import { interviewSessions } from './interviewSessions';
import { jobListings } from './jobListings';
import { outreachContacts } from './outreachContacts';
import { studyProgress } from './studyProgress';
import { users } from './user';
import { userAchievements } from './userAchievements';
import { userProfiles } from './userProfile';

export const applicationRelations = relations(applications, ({ one }) => ({
    user: one(users, {
        fields: [applications.userId],
        references: [users.id],
    }),
    job: one(jobListings, {
        fields: [applications.jobId],
        references: [jobListings.id],
    }),
}));

export const jobListingRelations = relations(jobListings, ({ many }) => ({
    applications: many(applications),
}));

export const userRelations = relations(users, ({ many, one }) => ({
    applications: many(applications),
    outreachContacts: many(outreachContacts),
    interviewSessions: many(interviewSessions),
    studyProgress: many(studyProgress),
    achievements: one(userAchievements, {
        fields: [users.id],
        references: [userAchievements.userId],
    }),
    profile: one(userProfiles, {
        fields: [users.id],
        references: [userProfiles.userId],
    }),
}));

export const interviewSessionRelations = relations(
    interviewSessions,
    ({ one }) => ({
        user: one(users, {
            fields: [interviewSessions.userId],
            references: [users.id],
        }),
    }),
);

export const outreachContactRelations = relations(
    outreachContacts,
    ({ one }) => ({
        user: one(users, {
            fields: [outreachContacts.userId],
            references: [users.id],
        }),
    }),
);

export const studyProgressRelations = relations(studyProgress, ({ one }) => ({
    user: one(users, {
        fields: [studyProgress.userId],
        references: [users.id],
    }),
}));

export const userAchievementRelations = relations(
    userAchievements,
    ({ one }) => ({
        user: one(users, {
            fields: [userAchievements.userId],
            references: [users.id],
        }),
    }),
);

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
    user: one(users, {
        fields: [userProfiles.userId],
        references: [users.id],
    }),
}));
