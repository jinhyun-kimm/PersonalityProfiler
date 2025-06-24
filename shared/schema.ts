import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testSessions = pgTable("test_sessions", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").notNull(),
  personalityType: text("personality_type").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertTestSession = z.infer<typeof insertTestSessionSchema>;
export type TestSession = typeof testSessions.$inferSelect;

export const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.object({
    text: z.string(),
    score: z.record(z.string(), z.number())
  }))
});

export const personalityTypeSchema = z.object({
  name: z.string(),
  emoji: z.string(),
  description: z.string(),
  characteristics: z.array(z.string()),
  strengths: z.array(z.string()),
  advice: z.array(z.string())
});

export type Question = z.infer<typeof questionSchema>;
export type PersonalityType = z.infer<typeof personalityTypeSchema>;
