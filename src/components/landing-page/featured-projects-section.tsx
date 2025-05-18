
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModelCard from '@/components/projects/model-card';
import { placeholderProjects } from '@/lib/placeholder-data';
import { ArrowRight } from 'lucide-react';

// In a real application, you might fetch this data from an API
// async function getFeaturedProjects() {
//   // Example: Fetch top 2 models from Hugging Face API
//   // const response = await fetch('https://huggingface.co/api/models?sort=downloads&direction=-1&limit=2');
//   // if (!response.ok) {
//   //   console.error('Failed to fetch projects');
//   //   return placeholderProjects.slice(0, 2);
//   // }
//   // const data = await response.json();
//   // return data.map(model => ({ ... map to ProjectModel interface ... }));
//   return placeholderProjects.slice(0, 2); // Use placeholder for now, showing 2 projects
// }

const FeaturedProjectsSection: FC = () => {
  // const projects = await getFeaturedProjects(); // Uncomment when using actual fetching
  const projects = placeholderProjects.slice(0, 2); // Using placeholder data directly, showing 2 projects

  return (
    <section id="featured-projects" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            🚀 Explore Top AI Projects
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover innovative AI models and tools from the community.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12"> {/* Adjusted lg:grid-cols-2 for better layout with 2 items */}
          {projects.map((project) => (
            <ModelCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
