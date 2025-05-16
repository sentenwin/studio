
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, User, Tag, ThumbsUp } from 'lucide-react';

interface AiModel {
  id: string;
  name: string;
  author: string;
  description: string;
  hfLink: string;
  tags?: string[];
  likes?: number;
  imageUrl: string;
}

interface ModelCardProps {
  model: AiModel;
}

const ModelCard: FC<ModelCardProps> = ({ model }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card">
      <CardHeader className="pb-3">
        <div className="relative aspect-video w-full rounded-t-md overflow-hidden mb-3">
          <Image
            src={model.imageUrl}
            alt={`${model.name} visual representation`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="AI model concept"
            className="rounded-t-md"
          />
        </div>
        <CardTitle className="text-xl font-semibold text-primary mb-1 line-clamp-2">{model.name}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <User className="mr-1.5 h-3.5 w-3.5" />
          <span>{model.author}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-0">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-2">{model.description}</CardDescription>
        {model.tags && model.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {model.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full flex items-center">
                <Tag className="mr-1 h-3 w-3" />{tag}
              </span>
            ))}
          </div>
        )}
        {model.likes !== undefined && (
          <div className="text-xs text-muted-foreground flex items-center">
            <ThumbsUp className="mr-1.5 h-3.5 w-3.5 text-accent" />
            {model.likes.toLocaleString()} likes
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
          <Link href={model.hfLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${model.name} on Hugging Face`}>
            View Model <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;
