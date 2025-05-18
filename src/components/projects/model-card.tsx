
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { ProjectModel } from '@/lib/placeholder-data';

interface ModelCardProps {
  project: ProjectModel;
}

const ModelCard: FC<ModelCardProps> = ({ project }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="relative aspect-video w-full rounded-md overflow-hidden mb-4">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
            data-ai-hint={project.dataAiHint || 'technology abstract'}
          />
        </div>
        <CardTitle className="text-xl font-semibold text-primary line-clamp-2">{project.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">By {project.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3 mb-3">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={project.hfUrl} target="_blank" rel="noopener noreferrer">
            View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;
