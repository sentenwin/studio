
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, ExternalLink, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import ToolCard from '@/components/quick-open-tools/tool-card';
import { placeholderQuickTools, type QuickTool } from '@/lib/placeholder-data';
import { searchQuickTools, type SearchQuickToolsOutput } from '@/ai/flows/search-tools-flow';

const ITEMS_PER_PAGE = 6;

export default function QuickOpenToolsPage() {
  const allTools = placeholderQuickTools;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchQuickToolsOutput>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }
    setIsSearching(true);
    setSearchError(null);
    try {
      const results = await searchQuickTools({ query: searchQuery });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching tools:", error);
      setSearchError("Failed to search for tools. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
        document.title = 'Quick Open Tools - Open MaduraAI';
    }
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(allTools.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItemsToDisplay = allTools.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

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
                Discover a curated list of useful online tools to help you with various tasks. Use the search below to find a specific tool.
            </p>
        </div>

        {/* Search Bar Section */}
        <div className="mb-10 flex flex-col items-center gap-4">
            <div className="relative flex items-center w-full max-w-md">
              <Input
                type="search"
                placeholder="Search tools..."
                className="h-11 w-full rounded-md border border-input bg-background pl-4 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                aria-label="Search for quick tools"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary"
                onClick={handleSearch}
                disabled={isSearching}
                aria-label="Search"
              >
                {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>

            {searchError && (
              <p className="text-sm text-destructive mt-2">{searchError}</p>
            )}

            {searchResults.length > 0 && (
              <div className="mt-4 w-full max-w-md text-left">
                <h3 className="text-md font-semibold mb-2 text-primary">Search Results:</h3>
                <ul className="space-y-2">
                  {searchResults.map((tool) => (
                    <li key={tool.id} className="border p-3 rounded-md bg-card hover:shadow-md transition-shadow">
                      <Link href={tool.weblink} target={tool.weblink.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="group">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary group-hover:underline">{tool.name}</span>
                           {tool.weblink.startsWith('http') && <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent" /> }
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {searchResults.length === 0 && !isSearching && searchQuery.trim().length > 0 && !searchError && (
                 <p className="text-sm text-muted-foreground mt-2">No tools found for &quot;{searchQuery}&quot;.</p>
            )}
        </div>

        {/* Full List of Tools */}
        {allTools.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No tools available at the moment. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentItemsToDisplay.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
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
