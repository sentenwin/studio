
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, CalendarDays, UserCircle } from 'lucide-react';

export interface NewsItem {
  title: string;
  link: string;
  pubDate?: string;
  creator?: string;
  contentSnippet?: string;
  isoDate?: string;
  sourceName?: string;
  imageUrl?: string;
}

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: FC<NewsCardProps> = ({ item }) => {
  const displayDate = item.isoDate ? new Date(item.isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not available';
  const displayCreator = item.creator || item.sourceName || 'Source unknown';

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card overflow-hidden">
      {item.imageUrl && (
        <div className="relative aspect-video w-full">
          <Image
            src={item.imageUrl}
            alt={`Image for ${item.title}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="news article"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary mb-1 line-clamp-2">
          <Link href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {item.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-3 gap-y-1">
          <div className="flex items-center">
            <UserCircle className="mr-1.5 h-3.5 w-3.5" />
            <span>{displayCreator}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            <span>{displayDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-0">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-2">
          {item.contentSnippet || 'No description available.'}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <span
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
            aria-label={`Read more about ${item.title}`}
          >
            Read More <ExternalLink className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
