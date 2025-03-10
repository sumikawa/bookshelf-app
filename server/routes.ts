import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertBookSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  app.get("/api/books", async (req, res) => {
    // Mock user ID for demo
    const userId = 1;
    const books = await storage.getBooks(userId);
    res.json(books);
  });

  app.get("/api/books/search", async (req, res) => {
    const userId = 1;
    const query = z.string().parse(req.query.q);
    const books = await storage.searchBooks(userId, query);
    res.json(books);
  });

  app.post("/api/books", async (req, res) => {
    const userId = 1;
    const bookData = insertBookSchema.parse({ ...req.body, userId });
    const book = await storage.createBook(bookData);
    res.status(201).json(book);
  });

  app.patch("/api/books/:id", async (req, res) => {
    const id = z.number().parse(Number(req.params.id));
    const update = insertBookSchema.partial().parse(req.body);
    const book = await storage.updateBook(id, update);
    res.json(book);
  });

  app.delete("/api/books/:id", async (req, res) => {
    const id = z.number().parse(Number(req.params.id));
    await storage.deleteBook(id);
    res.status(204).send();
  });

  return createServer(app);
}
