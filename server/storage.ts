import { books, type Book, type InsertBook } from "@shared/schema";

export interface IStorage {
  getBooks(userId: number): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book>;
  deleteBook(id: number): Promise<void>;
  searchBooks(userId: number, query: string): Promise<Book[]>;
}

export class MemStorage implements IStorage {
  private books: Map<number, Book>;
  private currentId: number;

  constructor() {
    this.books = new Map();
    this.currentId = 1;
  }

  async getBooks(userId: number): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.userId === userId);
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentId++;
    const book: Book = {
      id,
      title: insertBook.title,
      author: insertBook.author,
      cover: insertBook.cover,
      userId: insertBook.userId,
      isbn: insertBook.isbn || null,
      publishedYear: insertBook.publishedYear || null,
      genre: insertBook.genre || null,
      amazonUrl: insertBook.amazonUrl || null
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, update: Partial<InsertBook>): Promise<Book> {
    const existing = this.books.get(id);
    if (!existing) throw new Error("Book not found");

    const updated = { 
      ...existing,
      ...update,
      isbn: update.isbn || existing.isbn,
      publishedYear: update.publishedYear || existing.publishedYear,
      genre: update.genre || existing.genre,
      amazonUrl: update.amazonUrl || existing.amazonUrl
    };
    this.books.set(id, updated);
    return updated;
  }

  async deleteBook(id: number): Promise<void> {
    if (!this.books.has(id)) throw new Error("Book not found");
    this.books.delete(id);
  }

  async searchBooks(userId: number, query: string): Promise<Book[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(book => 
      book.userId === userId && (
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.genre?.toLowerCase().includes(lowercaseQuery)
      )
    );
  }
}

export const storage = new MemStorage();