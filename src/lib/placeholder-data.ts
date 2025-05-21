
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
    dataAiHint: 'sound wave'
  },
  {
    id: '4',
    name: 'CodeHelper GPT',
    author: 'DevToolsInc',
    description: 'An AI pair programmer that assists with code completion, debugging complex issues, and generating documentation in multiple languages.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Code Generation', 'AI Assistant'],
    dataAiHint: 'code editor'
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
    dataAiHint: 'earth weather'
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
    dataAiHint: 'social chart'
  },
  {
    id: '9',
    name: 'DeepFakeDetector Pro',
    author: 'CyberSecSolutions',
    description: 'A robust system that identifies manipulated images and videos with high accuracy to combat misinformation and digital fraud.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Cybersecurity', 'Deepfake Detection'],
    dataAiHint: 'secure shield'
  },
  {
    id: '10',
    name: 'AgriOptimize AI Suite',
    author: 'FarmTechInnovate',
    description: 'Optimizes crop yields, predicts pest outbreaks, and manages resources efficiently in agriculture using IoT sensor data and AI.',
    imageUrl: 'https://placehold.co/600x400.png',
    hfUrl: 'https://huggingface.co/models',
    tags: ['Agriculture AI', 'Precision Farming'],
    dataAiHint: 'farm tractor'
  }
];


export interface Dataset {
  id: string;
  name: string;
  source: string; // e.g., "Kaggle", "UCI Repository"
  description: string;
  imageUrl: string;
  datasetUrl: string; // Link to the dataset page
  tags?: string[];
  dataAiHint?: string; // For placeholder image generation
  size?: string; // e.g., "1.2 GB", "50000 rows"
  updated?: string; // e.g., "July 2024"
}

export const placeholderDatasets: Dataset[] = [
  {
    id: 'ds1',
    name: 'Heart Disease UCI',
    source: 'Kaggle / UCI',
    description: 'A popular dataset for binary classification tasks, predicting the presence of heart disease based on patient attributes.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/redwankarimsony/heart-disease-data',
    tags: ['Healthcare', 'Classification', 'Tabular'],
    dataAiHint: 'medical chart',
    size: '11 KB',
    updated: '2 years ago'
  },
  {
    id: 'ds2',
    name: 'Titanic - Machine Learning from Disaster',
    source: 'Kaggle',
    description: 'Classic introductory dataset for predicting survival on the Titanic. Good for learning data cleaning and feature engineering.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/c/titanic',
    tags: ['Tabular', 'Binary Classification', 'Starter'],
    dataAiHint: 'titanic ship',
    size: '33 KB',
    updated: 'Competition'
  },
  {
    id: 'ds3',
    name: 'CIFAR-10 Image Dataset',
    source: 'Kaggle / University of Toronto',
    description: 'A collection of 60,000 32x32 color images in 10 classes, with 6,000 images per class. Widely used for image classification.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/olgabelitskaya/cifar10-object-recognition-in-images',
    tags: ['Image Classification', 'Computer Vision', 'Deep Learning'],
    dataAiHint: 'image grid',
    size: '170 MB',
    updated: 'Varies'
  },
  {
    id: 'ds4',
    name: 'IMDB Dataset of 50K Movie Reviews',
    source: 'Kaggle / Stanford',
    description: 'Dataset for binary sentiment classification, containing a set of 25,000 highly polar movie reviews for training, and 25,000 for testing.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews',
    tags: ['NLP', 'Sentiment Analysis', 'Text Data'],
    dataAiHint: 'movie reel',
    size: '25 MB',
    updated: '4 years ago'
  },
  {
    id: 'ds5',
    name: 'Global Terrorism Database (GTD)',
    source: 'Kaggle / START Consortium',
    description: 'Comprehensive open-source database on terrorist events around the world from 1970 through 2017 (and often updated).',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/START-UMD/gtd',
    tags: ['Social Science', 'Event Data', 'Geospatial'],
    dataAiHint: 'world map',
    size: '150 MB',
    updated: 'Annually'
  },
  {
    id: 'ds6',
    name: 'Credit Card Fraud Detection',
    source: 'Kaggle',
    description: 'Highly imbalanced dataset containing transactions made by credit cards in September 2013 by European cardholders.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
    tags: ['Fraud Detection', 'Imbalanced Data', 'Classification'],
    dataAiHint: 'credit card',
    size: '144 MB',
    updated: '7 years ago'
  },
  {
    id: 'ds7',
    name: 'Iris Species',
    source: 'Kaggle / UCI',
    description: 'Famous dataset for multiclass classification. Contains 3 classes of 50 instances each, where each class refers to a type of iris plant.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/uciml/iris',
    tags: ['Classification', 'Biology', 'Beginner'],
    dataAiHint: 'iris flower',
    size: '4 KB',
    updated: '7 years ago'
  },
  {
    id: 'ds8',
    name: 'MNIST Original (Digit Recognizer)',
    source: 'Kaggle / Yann LeCun',
    description: 'A large database of handwritten digits that is commonly used for training various image processing systems.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/competitions/digit-recognizer',
    tags: ['Image Classification', 'Handwriting', 'Deep Learning'],
    dataAiHint: 'handwritten digits',
    size: '10 MB',
    updated: 'Competition'
  },
  {
    id: 'ds9',
    name: 'Fashion MNIST',
    source: 'Kaggle / Zalando Research',
    description: 'A dataset of Zalando\'s article images—consisting of a training set of 60,000 examples and a test set of 10,000 examples. Each example is a 28x28 grayscale image, associated with a label from 10 classes.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/zalando-research/fashionmnist',
    tags: ['Image Classification', 'Fashion', 'Deep Learning'],
    dataAiHint: 'clothing items',
    size: '30 MB',
    updated: '6 years ago'
  },
  {
    id: 'ds10',
    name: 'Wine Quality Dataset',
    source: 'Kaggle / UCI',
    description: 'Two datasets are included, related to red and white vinho verde wine samples from the north of Portugal. The goal is to model wine quality based on physicochemical tests.',
    imageUrl: 'https://placehold.co/600x400.png',
    datasetUrl: 'https://www.kaggle.com/datasets/uciml/red-wine-quality-cortez-et-al-2009',
    tags: ['Regression', 'Classification', 'Food Science'],
    dataAiHint: 'wine glass',
    size: '240 KB',
    updated: '7 years ago'
  }
];

export interface QuickTool {
  id: string;
  name: string;
  description: string;
  weblink: string;
  tags: string[]; // Alternative Name
  dataAiHint?: string;
}

export const placeholderQuickTools: QuickTool[] = [
  {
    id: 'tool1',
    name: 'GST Calculator',
    description: 'Calculates the Goods and Services Tax (GST) amount for various tax slabs in India.',
    weblink: '/tools/gst-calculator', // Updated link
    tags: ['GST rate calculator', 'Tax calculator', 'Indian GST tool'],
    dataAiHint: 'calculator tax'
  },
  {
    id: 'tool2',
    name: 'EMI Calculator',
    description: 'Calculates monthly EMI based on loan amount, interest rate, and tenure.',
    weblink: '/tools/emi-calculator', 
    tags: ['Loan calculator', 'Interest calculator', 'Monthly EMI calculator'],
    dataAiHint: 'calculator loan'
  },
  {
    id: 'tool3',
    name: 'Currency Converter',
    description: 'Converts currency values using real-time exchange rates between global currencies.',
    weblink: 'https://www.xe.com/currencyconverter/',
    tags: ['Forex converter', 'Money exchange rate', 'Currency exchange tool'],
    dataAiHint: 'currency exchange'
  },
  {
    id: 'tool4',
    name: 'Image Converter',
    description: 'Converts image files between formats like JPG, PNG, GIF, BMP, and WEBP.',
    weblink: 'https://convertio.co/image-converter/',
    tags: ['PNG to JPG', 'Image format change', 'Online image converter'],
    dataAiHint: 'image file'
  },
  {
    id: 'tool5',
    name: 'File Converter',
    description: 'Converts files across various formats including documents, videos, audio, and more.',
    weblink: 'https://www.zamzar.com/',
    tags: ['Online converter', 'Format changer', 'Document converter'],
    dataAiHint: 'file document'
  },
  {
    id: 'tool6',
    name: 'Bank IFSC Finder',
    description: 'Finds IFSC, MICR codes, and other details of Indian bank branches.',
    weblink: 'https://www.bankbazaar.com/ifsc-code.html',
    tags: ['IFSC search', 'Bank code finder', 'Bank branch locator'],
    dataAiHint: 'bank building'
  },
  {
    id: 'tool7',
    name: 'QR Code Generator',
    description: 'Generates QR codes for URLs, contact info, text, WiFi passwords, and more.',
    weblink: 'https://www.qr-code-generator.com/',
    tags: ['QR creator', 'Barcode generator', 'QR code maker'],
    dataAiHint: 'qr code'
  }
];


