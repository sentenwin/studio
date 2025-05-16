
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface CommunityCardProps {
  name: string;
  logoUrl: string;
  description: string;
  joinLink: string;
}

const CommunityCard: FC<CommunityCardProps> = ({ name, logoUrl, description, joinLink }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <div className="flex-shrink-0">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={56}
            height={56}
            className="rounded-md border object-contain aspect-square"
            data-ai-hint="community logo"
          />
        </div>
        <div className="flex-grow min-w-0">
          <CardTitle className="text-lg font-semibold text-primary mb-1 line-clamp-2">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-0">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
          <Link href={joinLink} target="_blank" rel="noopener noreferrer" aria-label={`Join ${name}`}>
            Join Now <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
