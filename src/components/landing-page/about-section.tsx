import type { FC } from 'react';
import Image from 'next/image'; 

const AboutSection: FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="space-y-6 md:order-1"> 
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:text-left text-center"> 
              About us
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 md:text-left text-center"> 
              Open MaduraAI is an open-source platform dedicated to democratizing AI development, fostering collaboration, and addressing real-world challenges through community-driven solutions. Whether you're a student, researcher, or developer, our platform provides the tools and resources to build, share, and deploy AI models tailored to local needs.
            </p>
          </div>
          {/* Image Column */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 md:order-2">
            <Image
              src="https://i.ibb.co/FkZScZCC/file-00000000218861fd8b314f46d298355b-1.png"
              alt="AI development community with Madurai temple"
              fill
              style={{ objectFit: 'cover' }}
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

export default AboutSection;
