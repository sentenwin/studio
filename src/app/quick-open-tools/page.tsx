
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ToolCard from '@/components/quick-open-tools/tool-card';
import { placeholderQuickTools } from '@/lib/placeholder-data';

export const metadata: Metadata = {
  title: 'Quick Open Tools - Open MaduraAI',
  description: 'A collection of handy online tools for various tasks.',
};

export default function QuickOpenToolsPage() {
  const tools = placeholderQuickTools;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quick Open Tools</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Discover a curated list of useful online tools to help you with various tasks.
            </p>
        </div>
        {tools.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No tools available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
