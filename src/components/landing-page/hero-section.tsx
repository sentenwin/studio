
"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { searchQuickTools, type SearchQuickToolsOutput } from '@/ai/flows/search-tools-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const HeroSection: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchQuickToolsOutput>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

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

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            Empowering Local Innovation Through{' '}
            <span className="text-accent">Collaboration</span>
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center w-full max-w-xs sm:max-w-sm">
              <Input
                type="search"
                placeholder="Quick Open: Search tools..."
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
              <div className="mt-4 w-full max-w-xs sm:max-w-sm text-left">
                <h3 className="text-md font-semibold mb-2 text-primary">Search Results:</h3>
                <ul className="space-y-2">
                  {searchResults.map((tool) => (
                    <li key={tool.id} className="border p-3 rounded-md bg-card hover:shadow-md transition-shadow">
                      <Link href={tool.weblink} target="_blank" rel="noopener noreferrer" className="group">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary group-hover:underline">{tool.name}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {searchResults.length === 0 && !isSearching && searchQuery.length > 0 && !searchError && (
                 <p className="text-sm text-muted-foreground mt-2">No tools found for &quot;{searchQuery}&quot;.</p>
            )}


            <Link href="/quick-open-tools" passHref>
              <Button size="lg" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300 mt-2">
                Browse All Quick Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
