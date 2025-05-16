
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModelCard from '@/components/projects/model-card'; // Reusing the existing ModelCard
import { ArrowRight } from 'lucide-react';

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

// Using the same placeholder data structure and some initial models as the /projects page
// TODO: This data could be fetched or curated specifically for the landing page.
const placeholderModels: AiModel[] = [
  {
    id: 'bert-base-uncased',
    name: 'BERT Base Uncased',
    author: 'Google',
    description: 'Pre-trained model on English language using a masked language modeling (MLM) objective. Ideal for fine-tuning on various NLP tasks.',
    hfLink: 'https://huggingface.co/bert-base-uncased',
    tags: ['NLP', 'Transformer', 'English'],
    likes: 15200,
    imageUrl: 'https://placehold.co/600x338.png?text=BERT',
  },
  {
    id: 'gpt2',
    name: 'GPT-2',
    author: 'OpenAI',
    description: 'A large transformer-based language model with 1.5 billion parameters, trained on a diverse dataset of text.',
    hfLink: 'https://huggingface.co/gpt2',
    tags: ['NLP', 'Text Generation', 'Large Model'],
    likes: 12800,
    imageUrl: 'https://placehold.co/600x338.png?text=GPT-2',
  },
  {
    id: 'stabilityai/stable-diffusion-2-1',
    name: 'Stable Diffusion 2.1',
    author: 'Stability AI',
    description: 'A powerful text-to-image diffusion model capable of generating high-quality images from textual descriptions.',
    hfLink: 'https://huggingface.co/stabilityai/stable-diffusion-2-1',
    tags: ['Image Generation', 'Diffusion', 'Multimodal'],
    likes: 25300,
    imageUrl: 'https://placehold.co/600x338.png?text=Stable+Diffusion',
  },
  {
    id: 'facebook/wav2vec2-base-960h',
    name: 'Wav2Vec2 Base 960h',
    author: 'Facebook',
    description: 'Pre-trained model for Automatic Speech Recognition (ASR) on 960 hours of Librispeech audio. Can be fine-tuned for speech-to-text tasks.',
    hfLink: 'https://huggingface.co/facebook/wav2vec2-base-960h',
    tags: ['Audio', 'Speech Recognition', 'ASR'],
    likes: 9700,
    imageUrl: 'https://placehold.co/600x338.png?text=Wav2Vec2',
  },
  {
    id: 'sentence-transformers/all-MiniLM-L6-v2',
    name: 'all-MiniLM-L6-v2',
    author: 'Sentence Transformers',
    description: 'A sentence-transformers model: It maps sentences & paragraphs to a 384 dimensional dense vector space and can be used for tasks like clustering or semantic search.',
    hfLink: 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2',
    tags: ['NLP', 'Embeddings', 'Semantic Search'],
    likes: 8200,
    imageUrl: 'https://placehold.co/600x338.png?text=MiniLM',
  },
];

const FeaturedProjectsSection: FC = () => {
  const projectsToShow = placeholderModels.slice(0, 5);

  return (
    <section id="featured-projects" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            🚀 Featured Projects
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover some of the innovative AI models and projects from our community and beyond.
          </p>
        </div>
        {projectsToShow.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projectsToShow.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">No featured projects at the moment. Check back soon!</p>
        )}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="shadow-md hover:shadow-lg">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
