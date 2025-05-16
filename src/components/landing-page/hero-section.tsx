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
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0">
              Open MaduraAI is an open-source platform dedicated to democratizing AI development, fostering collaboration, and addressing real-world challenges through community-driven solutions. Whether you're a student, researcher, or developer, our platform provides the tools and resources to build, share, and deploy AI models tailored to local needs.
            </p>
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
              src="https://placehold.co/600x400.png"
              alt="Diverse community collaborating on AI model development"
              layout="fill"
              objectFit="cover"
              data-ai-hint="community AI"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
