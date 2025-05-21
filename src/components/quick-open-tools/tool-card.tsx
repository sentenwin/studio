
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Wrench } from 'lucide-react'; // Wrench as a generic tool icon
import type { QuickTool } from '@/lib/placeholder-data';

interface ToolCardProps {
  tool: QuickTool;
}

const ToolCard: FC<ToolCardProps> = ({ tool }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-md flex-shrink-0">
            <Wrench className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold text-primary line-clamp-2">{tool.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-3">{tool.description}</CardDescription>
        {tool.tags && tool.tags.length > 0 && (
          <div className="mb-2">
            <p className="text-xs text-muted-foreground mb-1">Also known as:</p>
            <div className="flex flex-wrap gap-1">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={tool.weblink} target="_blank" rel="noopener noreferrer">
            Go to Tool <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
