import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertBookSchema } from "@shared/schema";
import { z } from "zod";

// AmazonのAPIクライアントを初期化する関数
async function createApiClient() {
  try {
    const { ProductAdvertisingAPIv3 } = await import('paapi5-nodejs-sdk');
    if (!process.env.AMAZON_ACCESS_KEY) return null;

    return new ProductAdvertisingAPIv3({
      accessKey: process.env.AMAZON_ACCESS_KEY,
      secretKey: process.env.AMAZON_SECRET_KEY,
      partnerTag: process.env.AMAZON_PARTNER_TAG,
      partnerType: 'Associates',
      host: 'webservices.amazon.co.jp',
      region: 'us-west-2',
    });
  } catch (error) {
    console.error('Failed to initialize Amazon API client:', error);
    return null;
  }
}

let apiClient = null;
createApiClient().then(client => {
  apiClient = client;
});

async function fetchAmazonBookDetails(url: string) {
  try {
    // Extract ASIN from URL
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    const asin = asinMatch?.[1];

    if (!asin) {
      throw new Error("Invalid Amazon URL");
    }

    // APIクライアントが利用できない場合はモックデータを返す
    if (!apiClient) {
      return {
        title: "モックデータ: サンプルブック",
        author: "サンプル著者",
        cover: "https://via.placeholder.com/300x400",
        isbn: asin,
        publishedYear: new Date().getFullYear(),
        genre: "サンプルジャンル"
      };
    }

    const request = {
      ItemIds: [asin],
      Resources: [
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'ItemInfo.ContentInfo',
        'Images.Primary.Large',
        'ItemInfo.Classifications',
      ],
      Condition: "New",
      PartnerTag: process.env.AMAZON_PARTNER_TAG,
      PartnerType: "Associates",
      Marketplace: "www.amazon.co.jp"
    };

    const response = await apiClient.getItems(request);

    if (!response.ItemsResult?.Items?.[0]) {
      throw new Error("Book not found");
    }

    const item = response.ItemsResult.Items[0];

    return {
      title: item.ItemInfo?.Title?.DisplayValue || "",
      author: item.ItemInfo?.ByLineInfo?.Contributors?.[0]?.Name || "",
      cover: item.Images?.Primary?.Large?.URL || "",
      isbn: asin,
      publishedYear: item.ItemInfo?.ContentInfo?.PublicationDate?.Year,
      genre: item.ItemInfo?.Classifications?.ProductGroup?.DisplayValue
    };
  } catch (error) {
    console.error('Amazon API Error:', error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch book details");
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