import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestSessionSchema } from "@shared/schema";
import { testQuestions, personalityTypes } from "../client/src/lib/personality-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get test questions
  app.get("/api/questions", (req, res) => {
    res.json(testQuestions);
  });

  // Get personality types
  app.get("/api/personality-types", (req, res) => {
    res.json(personalityTypes);
  });

  // Submit test results
  app.post("/api/test-session", async (req, res) => {
    try {
      const validatedData = insertTestSessionSchema.parse(req.body);
      const session = await storage.createTestSession(validatedData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid test session data" });
    }
  });

  // Get test session
  app.get("/api/test-session/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getTestSession(id);
      if (!session) {
        return res.status(404).json({ error: "Test session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session ID" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
