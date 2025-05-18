
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import ModelCard from '@/components/projects/model-card';
import { placeholderProjects } from '@/lib/placeholder-data';

export const metadata: Metadata = {
  title: 'Explore Projects - Open MaduraAI',
  description: 'Discover a wide range of AI models and projects from the Open MaduraAI community and beyond.',
};

export default function ProjectsPage() {
  const projects = placeholderProjects; 

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Explore Projects</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-end">
          <Button asChild>
            <Link href="/projects/submit">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Your Project
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No projects available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {projects.map((project) => (
              <ModelCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
