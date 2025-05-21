import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const HeroSection: FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            Empowering Local Innovation Through{' '}
            <span className="text-accent">Collaboration</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#join-us" passHref>
              <Button size="lg" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300">
                Get Started
              </Button>
            </Link>
            {/* Search Bar */}
            <div className="relative flex items-center w-full max-w-xs sm:max-w-sm">
              <Input
                type="search"
                placeholder="Quick Open"
                className="h-11 w-full rounded-md border border-input bg-background pl-4 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;