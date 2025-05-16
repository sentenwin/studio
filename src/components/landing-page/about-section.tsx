import type { FC } from 'react';

const AboutSection: FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            About Open MaduraAI
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Open MaduraAI is an open-source platform dedicated to democratizing AI development, fostering collaboration, and addressing real-world challenges through community-driven solutions. Whether you're a student, researcher, or developer, our platform provides the tools and resources to build, share, and deploy AI models tailored to local needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
