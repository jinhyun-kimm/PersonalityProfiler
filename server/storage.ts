import { testSessions, type TestSession, type InsertTestSession } from "@shared/schema";

export interface IStorage {
  createTestSession(session: InsertTestSession): Promise<TestSession>;
  getTestSession(id: number): Promise<TestSession | undefined>;
}

export class MemStorage implements IStorage {
  private sessions: Map<number, TestSession>;
  private currentId: number;

  constructor() {
    this.sessions = new Map();
    this.currentId = 1;
  }

  async createTestSession(insertSession: InsertTestSession): Promise<TestSession> {
    const id = this.currentId++;
    const session: TestSession = {
      ...insertSession,
      id,
      createdAt: new Date().toISOString(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async getTestSession(id: number): Promise<TestSession | undefined> {
    return this.sessions.get(id);
  }
}

export const storage = new MemStorage();
