import type { FC, ElementType } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, className }) => {
  return (
    <Card className={`flex flex-col h-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-foreground/70">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
