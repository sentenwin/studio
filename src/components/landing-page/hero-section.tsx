import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const HeroSection: FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
              Build Stunning Landing Pages with{' '}
              <span className="text-accent">LandingVerse</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0">
              Effortlessly create high-converting landing pages that captivate your audience and drive results. LandingVerse provides the tools you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transform transition-shadow duration-300">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Landing Page Builder Showcase"
              layout="fill"
              objectFit="cover"
              data-ai-hint="website builder interface"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
