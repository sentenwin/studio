import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
              Empowering Local Innovation Through {' '}
              <span className="text-accent">Collaboration</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
            <Image
              src="https://i.ibb.co/FkZScZCC/file-00000000218861fd8b314f46d298355b-1.png"
              alt="AI development community with Madurai temple"
              layout="fill"
              objectFit="cover"
              data-ai-hint="temple AI"
              className="rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
