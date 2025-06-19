import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(), // 'job_seeker', 'employer', 'freelancer'
  city: text("city"),
  avatar: text("avatar"),
  bio: text("bio"),
  skills: text("skills").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  salary: text("salary").notNull(),
  type: text("type").notNull(), // 'full-time', 'part-time', 'contract', 'remote'
  category: text("category").notNull(),
  requirements: text("requirements").array(),
  skills: text("skills").array(),
  experience: text("experience").notNull(),
  employerId: integer("employer_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(), // in taka
  deliveryTime: integer("delivery_time").notNull(), // in days
  images: text("images").array(),
  freelancerId: integer("freelancer_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id),
  applicantId: integer("applicant_id").references(() => users.id),
  status: text("status").notNull().default("pending"), // 'pending', 'accepted', 'rejected'
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => tasks.id),
  buyerId: integer("buyer_id").references(() => users.id),
  status: text("status").notNull().default("pending"), // 'pending', 'in_progress', 'completed', 'cancelled'
  requirements: text("requirements"),
  deliveryDate: timestamp("delivery_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id),
  receiverId: integer("receiver_id").references(() => users.id),
  orderId: integer("order_id").references(() => orders.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  deliveryDate: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  jobs: many(jobs),
  tasks: many(tasks),
  applications: many(applications),
  orders: many(orders),
  sentMessages: many(messages, { relationName: "sender" }),
  receivedMessages: many(messages, { relationName: "receiver" }),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(users, {
    fields: [jobs.employerId],
    references: [users.id],
  }),
  applications: many(applications),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  freelancer: one(users, {
    fields: [tasks.freelancerId],
    references: [users.id],
  }),
  orders: many(orders),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  applicant: one(users, {
    fields: [applications.applicantId],
    references: [users.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  task: one(tasks, {
    fields: [orders.taskId],
    references: [tasks.id],
  }),
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
  order: one(orders, {
    fields: [messages.orderId],
    references: [orders.id],
  }),
}));
