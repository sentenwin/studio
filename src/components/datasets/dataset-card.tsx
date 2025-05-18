
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Database } from 'lucide-react';
import type { Dataset } from '@/lib/placeholder-data';

interface DatasetCardProps {
  dataset: Dataset;
}

const DatasetCard: FC<DatasetCardProps> = ({ dataset }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="relative aspect-video w-full rounded-md overflow-hidden mb-4 border">
          <Image
            src={dataset.imageUrl}
            alt={dataset.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
            data-ai-hint={dataset.dataAiHint || 'dataset abstract'}
          />
        </div>
        <div className="flex items-start gap-2">
          <Database className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <CardTitle className="text-xl font-semibold text-primary line-clamp-2">{dataset.name}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Source: {dataset.source} {dataset.updated && `| Updated: ${dataset.updated}`} {dataset.size && `| Size: ${dataset.size}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3 mb-3">{dataset.description}</p>
        {dataset.tags && dataset.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dataset.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={dataset.datasetUrl} target="_blank" rel="noopener noreferrer">
            View on {dataset.source} <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;
