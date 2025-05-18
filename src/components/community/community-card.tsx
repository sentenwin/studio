
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export interface CommunityInfo {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  joinLink: string;
  dataAiHint?: string;
}

interface CommunityCardProps {
  community: CommunityInfo;
}

const CommunityCard: FC<CommunityCardProps> = ({ community }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border">
          <Image
            src={community.logoUrl}
            alt={`${community.name} logo`}
            fill
            style={{ objectFit: 'contain' }} // Changed to 'contain' for logos
            className="p-1" // Added padding for logo within its container
            data-ai-hint={community.dataAiHint || 'community logo'}
          />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold text-primary mb-1 line-clamp-2">
            {community.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-0">
        <CardDescription className="text-sm text-foreground/80 line-clamp-4">
          <span className="font-medium text-foreground/90">Focus:</span> {community.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={community.joinLink} target="_blank" rel="noopener noreferrer">
            Join here <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
