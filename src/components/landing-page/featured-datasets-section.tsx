
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DatasetCard from '@/components/datasets/dataset-card';
import { placeholderDatasets } from '@/lib/placeholder-data';
import { ArrowRight, Database } from 'lucide-react';

const FeaturedDatasetsSection: FC = () => {
  const datasets = placeholderDatasets.slice(0, 2); // Show first 2 datasets

  return (
    <section id="featured-datasets" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center">
            <Database className="mr-3 h-8 w-8 md:h-10 md:w-10" />
            Discover Key Datasets
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore popular datasets to fuel your next AI innovation.
          </p>
        </div>
        {datasets.length === 0 ? (
           <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No featured datasets available at the moment.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        )}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/datasets">
              View All Datasets <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDatasetsSection;
