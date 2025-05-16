import type { FC } from 'react';
import FeatureCard from './feature-card';
import { Cpu, ShieldCheck, BarChartBig, Zap, Edit3, Users } from 'lucide-react';

const features = [
  {
    icon: Edit3,
    title: 'Intuitive Builder',
    description: 'Drag-and-drop interface that makes page creation a breeze, no coding required.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Content',
    description: 'Generate compelling copy and headlines with our integrated AI assistant.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Pages built with LandingVerse are optimized for speed and performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Highly Secure',
    description: 'Robust security features to protect your data and your visitors.',
  },
  {
    icon: BarChartBig,
    title: 'Insightful Analytics',
    description: 'Track your page performance with built-in analytics and reporting tools.',
  },
  {
    icon: Users,
    title: 'Seamless Integrations',
    description: 'Connect with your favorite marketing tools and CRMs effortlessly.',
  },
];

const FeatureShowcase: FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            LandingVerse is packed with powerful features designed to help you create effective landing pages quickly and easily.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
