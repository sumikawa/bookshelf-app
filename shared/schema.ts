import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  cover: text("cover").notNull(),
  userId: integer("user_id").notNull(),
  isbn: text("isbn"),
  publishedYear: integer("published_year"),
  genre: text("genre"),
  amazonUrl: text("amazon_url")
});

export const insertBookSchema = createInsertSchema(books)
  .omit({ id: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    cover: z.string().min(1, "Cover URL is required"),
    isbn: z.string().optional(),
    publishedYear: z.number().min(1000).max(new Date().getFullYear()).optional(),
    genre: z.string().optional(),
    amazonUrl: z.string().url("Invalid URL").optional()
  });

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;