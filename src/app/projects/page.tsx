
"use client"; // Using client component for potential future filtering/sorting

import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ModelCard from '@/components/projects/model-card';
import React, { useState, useEffect } from 'react';

// For simplicity, metadata defined statically.
// export const metadata: Metadata = {
//   title: 'Explore AI Models - Open MaduraAI',
//   description: 'Discover innovative AI models from the community and Hugging Face.',
// };

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

// TODO: This data should ideally be fetched dynamically, e.g., from Hugging Face API or a Firebase collection.
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

const ITEMS_PER_PAGE = 10; // Or however many you want per page if pagination is added later

export default function ProjectsPage() {
  const [displayedModels, setDisplayedModels] = useState<AiModel[]>([]);
  const [pageTitle, setPageTitle] = useState('Explore AI Models - Open MaduraAI');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    // Initially display all placeholder models (up to ITEMS_PER_PAGE if implementing pagination)
    setDisplayedModels(placeholderModels.slice(0, ITEMS_PER_PAGE));
  }, []);

  // Add a "Show More" button or pagination logic here if needed for more than 5 models

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Explore AI Models</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto">
          Discover innovative AI models. Explore capabilities, find inspiration for your next project, or contribute your own.
        </p>
        {displayedModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">Loading models...</p>
        )}

        {/* Placeholder for "Show More" button or pagination if more than 5 models */}
        {/* {placeholderModels.length > displayedModels.length && (
          <div className="mt-12 text-center">
            <Button onClick={handleShowMore} size="lg" className="shadow-md hover:shadow-lg">
              Show More Models
            </Button>
          </div>
        )} */}
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
