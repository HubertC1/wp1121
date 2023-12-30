import { relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
  usersToActivitiesTable: many(usersToActivitiesTable),
  activitiesTable: many(activitiesTable),
}));

export const activitiesTable = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    organizer_id: uuid("organizer_id").notNull(),
    location: text("location").notNull(),
    dateStart: text('date_end').notNull(),
    dateEnd: text("date_start").notNull(),
    schedule_name: text("schedule_name").array().notNull(),
    schedule_location: text("schedule_location").array().notNull(),
    messages_content: text("messages_content").array().notNull(),
    messages_senderId: text("messages_senderId").array().notNull(),
    messages_senderName: text("messages_senderName").array().notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  })
);

export const activitiesRelations = relations(activitiesTable, ({many, one}) => ({
  usersToActivitiesTable: many(usersToActivitiesTable),
  organizer: one(usersTable, {
    fields: [activitiesTable.organizer_id],
    references: [usersTable.displayId],
  }),
}));

// export const messagesTable = pgTable(
//   "messages",
//   {
//     id: serial("id").primaryKey(),
//     displayId: uuid("display_id").defaultRandom().notNull().unique(),
//     content: text("content").notNull(),
//     time: text("time").notNull(),
//     senderId: uuid("sender_id"),
//     activityId: uuid("activity_id"),
//   },
//   (table) => ({
//     displayIdIndex: index("display_id_index").on(table.displayId),
//   })
// );

// export const messagesRelations = relations(messagesTable, ({one}) => ({
//   sender: one(usersTable, {
//     fields: [messagesTable.senderId],
//     references: [usersTable.displayId],
//   }),
//   activity: one(activitiesTable, {
//     fields: [messagesTable.activityId],
//     references: [activitiesTable.displayId],
//   })
// }))

export const documentsTable = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const documentsRelations = relations(documentsTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
}));

export const usersToActivitiesTable = pgTable(
  "users_to_activities",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    activityId: uuid("document_id")
      .notNull()
      .references(() => activitiesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndActivityIndex: index("user_and_activity_index").on(
      table.userId,
      table.activityId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.activityId, table.userId),
  }),
);

export const usersToActivitiesRelations = relations(
  usersToActivitiesTable,
  ({ one }) => ({
    activity: one(activitiesTable, {
      fields: [usersToActivitiesTable.activityId],
      references: [activitiesTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToActivitiesTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const usersToDocumentsTable = pgTable(
  "users_to_documents",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documentsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_document_index").on(
      table.userId,
      table.documentId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.documentId, table.userId),
  }),
);

export const usersToDocumentsRelations = relations(
  usersToDocumentsTable,
  ({ one }) => ({
    document: one(documentsTable, {
      fields: [usersToDocumentsTable.documentId],
      references: [documentsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToDocumentsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);
