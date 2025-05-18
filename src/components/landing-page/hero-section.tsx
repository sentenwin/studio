import type { FC } from 'react';
import { Button } from '@/components/ui/button';
// Image component is removed as it's no longer used here
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed the grid layout, content will be centered */}
        <div className="space-y-8 text-center max-w-4xl mx-auto"> {/* Increased max-width and centered */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            Empowering Local Innovation Through{' '}
            <span className="text-accent">Collaboration</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Ensure buttons are centered */}
            <Link href="#join-us" passHref>
              <Button size="lg" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300">
                Get Started
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/* Image div has been removed and will be placed in AboutSection */}
      </div>
    </section>
  );
};

export default HeroSection;