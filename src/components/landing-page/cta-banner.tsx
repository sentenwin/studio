import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CTABanner: FC = () => {
  return (
    <section id="join-us" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🌍 Join the Movement
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
            Be part of a transformative journey where technology meets community. Contribute, learn, and innovate with Open MaduraAI.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
            <Link href="/projects" passHref> {/* Placeholder link, adjust as needed */}
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 hover:text-accent shadow-lg hover:shadow-xl transform transition-shadow duration-300"
              >
                Explore Projects
              </Button>
            </Link>
            <Link href="/community" passHref> {/* Placeholder link, adjust as needed */}
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transform transition-shadow duration-300"
              >
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;