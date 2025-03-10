import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertBookSchema } from "@shared/schema";
import { z } from "zod";

async function fetchAmazonBookDetails(url: string) {
  try {
    // Extract ASIN/ISBN from URL
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    const asin = asinMatch?.[1];

    if (!asin) {
      throw new Error("Invalid Amazon URL");
    }

    // For now, return mock data
    // In a real implementation, you would need to use Amazon's Product Advertising API
    // or scrape the page (following Amazon's terms of service)
    return {
      title: "Sample Book Title",
      author: "Sample Author",
      cover: "https://via.placeholder.com/300x400",
      isbn: asin,
      publishedYear: new Date().getFullYear()
    };
  } catch (error) {
    throw new Error("Failed to fetch book details");
  }
}

export async function registerRoutes(app: Express) {
  app.get("/api/books", async (req, res) => {
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

  app.get("/api/books/fetch-amazon", async (req, res) => {
    try {
      const url = z.string().url().parse(req.query.url);
      const bookDetails = await fetchAmazonBookDetails(url);
      res.json(bookDetails);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to fetch book details" });
    }
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