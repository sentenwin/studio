import type { FC } from 'react';
import { Button } from '@/components/ui/button';

const CTABanner: FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Landing Pages?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
            Join thousands of creators who trust LandingVerse to build high-converting pages. 
            Start your free trial today and experience the difference.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transform transition-shadow duration-300"
          >
            Sign Up Now - It&apos;s Free!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
