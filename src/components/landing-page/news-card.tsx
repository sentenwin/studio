import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  sourceName?: string;
}

const NewsCard: FC<NewsCardProps> = ({ title, link, description, pubDate, sourceName }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary leading-tight mb-1 line-clamp-3">{title}</CardTitle>
        {pubDate && (
          <p className="text-xs text-muted-foreground">
            {new Date(pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {sourceName && (
              <span className="before:content-['•'] before:mx-1.5">{sourceName}</span>
            )}
          </p>
        )}
      </CardHeader>
      {description && (
        <CardContent className="flex-grow py-0">
          <CardDescription className="text-sm text-foreground/80 line-clamp-4">
            {description}
          </CardDescription>
        </CardContent>
      )}
      <CardFooter className="pt-4 mt-auto">
        <Button asChild variant="outline" size="sm" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
          <Link href={link} target="_blank" rel="noopener noreferrer" aria-label={`Read more about ${title}`}>
            Read More <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
