import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';


interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  rating?: number;
  className?: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ quote, name, role, avatarSrc, rating = 5, className }) => {
  return (
    <Card className={`flex flex-col h-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 ${className}`}>
      <CardContent className="pt-6 flex-grow flex flex-col">
        {rating && (
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
            ))}
          </div>
        )}
        <p className="text-foreground/80 italic mb-6 flex-grow">"{quote}"</p>
        <div className="flex items-center mt-auto">
          <Avatar className="h-12 w-12 mr-4 border-2 border-primary/20">
            <AvatarImage src={avatarSrc} alt={name} data-ai-hint="person" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
