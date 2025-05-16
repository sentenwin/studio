import type { FC } from 'react';
import FeatureCard from './feature-card';
import { Brain, Database, Server, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Model Development & Sharing',
    description: 'Collaborate on AI models with our integrated tools and version control systems. Inspired by platforms like Hugging Face, we provide a space to host and share models, complete with documentation and community feedback mechanisms.',
  },
  {
    icon: Database,
    title: 'Dataset Repository',
    description: 'Access and contribute to a growing repository of datasets, facilitating research and development. Our dataset hub encourages transparency and reproducibility, akin to Kaggle\'s dataset sharing model.',
  },
  {
    icon: Server,
    title: 'Developer-Friendly Hosting',
    description: 'Deploy your AI projects seamlessly with our hosting solutions. We support containerized deployments, ensuring scalability and ease of integration into various applications.',
  },
  {
    icon: Users,
    title: 'Community Collaboration',
    description: 'Engage with a vibrant community through forums, collaborative projects, and events. Our platform is designed to foster knowledge exchange and mentorship, promoting collective growth.',
  },
];

const FeatureShowcase: FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            🚀 What We Offer
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Open MaduraAI is packed with powerful features designed to help you create effective AI solutions quickly and easily.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
