
export interface ProjectModel {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  hfUrl: string;
  tags?: string[];
  dataAiHint?: string;
}

export const placeholderProjects: ProjectModel[] = [
  {
    id: '1',
    name: 'Awesome Text Generator (ATL-3B)',
    author: 'OpenSourceCommunity',
    description: 'A powerful 3 billion parameter model for creative text generation and summarization, pushing the boundaries of natural language understanding.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['NLP', 'Text Generation', 'LLM'],
    dataAiHint: 'abstract brain'
  },
  {
    id: '2',
    name: 'VisionMaster Pro',
    author: 'AIStartupX',
    description: 'State-of-the-art image recognition and object detection model, trained on millions of diverse images for unparalleled accuracy.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Computer Vision', 'Object Detection'],
    dataAiHint: 'robotic eye'
  },
  {
    id: '3',
    name: 'AudioSynth AI',
    author: 'MusicTechLabs',
    description: 'Generates unique musical pieces and realistic soundscapes based on textual prompts or existing melodies, with fine-grained control.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Audio Generation', 'Music AI'],
    dataAiHint: 'sound waves'
  },
  {
    id: '4',
    name: 'CodeHelper GPT',
    author: 'DevToolsInc',
    description: 'An AI pair programmer that assists with code completion, debugging complex issues, and generating documentation in multiple languages.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Code Generation', 'AI Assistant'],
    dataAiHint: 'code screen'
  },
  {
    id: '5',
    name: 'MediScan AI',
    author: 'HealthInnovators',
    description: 'Analyzes medical images (X-rays, MRIs) to assist healthcare professionals in early-stage disease detection and diagnosis.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Healthcare AI', 'Medical Imaging'],
    dataAiHint: 'medical scan'
  },
  {
    id: '6',
    name: 'EcoForecaster Plus',
    author: 'ClimateResearchOrg',
    description: 'Predicts environmental changes, pollution levels, and long-term weather patterns using complex climate data and satellite imagery.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Climate AI', 'Forecasting', 'Environment'],
    dataAiHint: 'earth globe'
  },
  {
    id: '7',
    name: 'RoboNavigator X',
    author: 'AutonomousSystemsCo',
    description: 'Advanced real-time pathfinding and navigation AI for autonomous robots and drones in complex, dynamic environments.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Robotics', 'Autonomous Navigation'],
    dataAiHint: 'robot path'
  },
  {
    id: '8',
    name: 'SentimentAnalyzer Max',
    author: 'MarketInsightsLLC',
    description: 'Deeply analyzes text data from social media, news, and customer reviews to determine nuanced public sentiment and trends.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['NLP', 'Sentiment Analysis'],
    dataAiHint: 'social media'
  },
  {
    id: '9',
    name: 'DeepFakeDetector Pro',
    author: 'CyberSecSolutions',
    description: 'A robust system that identifies manipulated images and videos with high accuracy to combat misinformation and digital fraud.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Cybersecurity', 'Deepfake Detection'],
    dataAiHint: 'security shield'
  },
  {
    id: '10',
    name: 'AgriOptimize AI Suite',
    author: 'FarmTechInnovate',
    description: 'Optimizes crop yields, predicts pest outbreaks, and manages resources efficiently in agriculture using IoT sensor data and AI.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Agriculture AI', 'Precision Farming'],
    dataAiHint: 'farm field'
  },
];
