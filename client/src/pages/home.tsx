import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BookGrid from "@/components/book-grid";
import SearchFilter from "@/components/search-filter";
import type { Book } from "@shared/schema";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: searchQuery ? ["/api/books/search", searchQuery] : ["/api/books"],
    queryFn: async ({ queryKey }) => {
      const url = searchQuery 
        ? `${queryKey[0] as string}?q=${encodeURIComponent(searchQuery)}`
        : queryKey[0] as string;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return response.json();
    }
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          My Bookshelf
        </h1>
        <Link href="/add-book">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </Link>
      </div>

      <SearchFilter value={searchQuery} onChange={setSearchQuery} />

      <BookGrid books={books || []} isLoading={isLoading} />
    </div>
  );
}