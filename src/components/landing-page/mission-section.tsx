import type { FC } from 'react';

const MissionSection: FC = () => {
  return (
    <section id="mission" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            🎯 Our Mission
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            To cultivate an inclusive AI ecosystem that empowers individuals to develop solutions addressing local challenges. By providing accessible tools and fostering collaboration, we aim to bridge the gap between AI advancements and community needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
