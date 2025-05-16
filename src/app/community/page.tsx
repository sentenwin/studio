
import { use } from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// This is now a Server Component (no "use client").
// For the static route "/community", `params` will be an empty object: {}.
// Therefore, `id` will be undefined.
export default function CommunityPage({ params }: { params: { id?: string } }) {
  // The user's original snippet was `use(() => params)`.
  // The React.use() hook expects a Promise or React Context as its argument.
  // To use it with a value like `params`, we can wrap `params` in a Promise.
  // This aligns with the idea of "unwrapping" a potentially proxied `params` object.
  const data = use(Promise.resolve(params));
  const { id } = data || {}; // Ensure data is not null/undefined before destructuring

  console.log("Community Page (Minimal Test Server Component) - ID from params:", id);
  console.log("Community Page (Minimal Test Server Component) - Raw params:", params);
  console.log("Community Page (Minimal Test Server Component) - Data from use:", data);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Community Page (Minimal Test)</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto">
          This is a simplified server-side page to test `params` handling and the "params enumerated" error.
        </p>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <p>ID from params: <strong>{id || "not available (expected for /community)"}</strong></p>
          <p>Raw `params` prop: <strong>{JSON.stringify(params)}</strong></p>
          <p>Data from `use(Promise.resolve(params))`: <strong>{JSON.stringify(data)}</strong></p>
        </div>
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
