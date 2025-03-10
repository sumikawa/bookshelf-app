import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { insertBookSchema, type InsertBook } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";

export default function AddBook() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InsertBook>({
    resolver: zodResolver(insertBookSchema),
    defaultValues: {
      title: "",
      author: "",
      cover: "",
      isbn: "",
      genre: "",
      amazonUrl: "",
      userId: 1, // Mock user ID for demo
    },
  });

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async (data: InsertBook) => {
      const response = await apiRequest("POST", "/api/books", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({ title: "Success", description: "Book added successfully" });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAmazonUrlChange = async (url: string) => {
    if (!url) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/books/fetch-amazon?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error("Failed to fetch book details");

      const bookDetails = await response.json();
      form.setValue("title", bookDetails.title);
      form.setValue("author", bookDetails.author);
      form.setValue("cover", bookDetails.cover);
      form.setValue("isbn", bookDetails.isbn);
      if (bookDetails.publishedYear) {
        form.setValue("publishedYear", bookDetails.publishedYear);
      }
      toast({ title: "Info", description: "Book details fetched from Amazon" });
    } catch (error) {
      toast({
        title: "Warning",
        description: "Could not fetch book details. Please fill in manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: InsertBook) => {
    submitForm(data);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amazonUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amazon URL (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://www.amazon.co.jp/dp/..."
                        onChange={(e) => {
                          field.onChange(e);
                          handleAmazonUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending || isLoading}>
                  {isPending ? "Adding..." : "Add Book"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}