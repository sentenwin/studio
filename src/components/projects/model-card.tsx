// This component is not currently used and renders nothing.
import type { FC } from 'react';

interface ModelCardProps {
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  modelUrl: string;
  tags?: string[];
}

const ModelCard: FC<ModelCardProps> = () => {
  return null;
};

export default ModelCard;
