
"use client";

import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CommunityCard from '@/components/community/community-card';
import React, { useState, useEffect } from 'react';

// Metadata can't be dynamic in client components easily without workarounds.
// For simplicity, we'll define it statically.
// export const metadata: Metadata = { // This would typically be in a server component or layout
//   title: 'Developer Communities - Open MaduraAI',
//   description: 'Discover and join developer communities in Madurai.',
// };

interface Community {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  joinLink: string;
}

const allCommunitiesData: Community[] = [
  {
    id: 'gdg-madurai',
    name: 'Google Developer Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=GDG',
    description: 'A community for developers interested in Google technologies. Regular meetups, workshops, and tech talks.',
    joinLink: 'https://gdg.community.dev/gdg-madurai/',
  },
  {
    id: 'digitall-madurai',
    name: 'Digitall Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=DM',
    description: 'Focuses on digital transformation, marketing, and technology trends. Events and networking opportunities.',
    joinLink: 'https://www.linkedin.com/company/digitallmadurai/',
  },
  {
    id: 'sida',
    name: 'SIDA (Small Industries Development Association)',
    logoUrl: 'https://placehold.co/100x100.png?text=SIDA',
    description: 'Supports small and medium-sized enterprises with technology adoption and skill development.',
    joinLink: '#', // Placeholder, actual link needed
  },
  {
    id: 'madurai-js',
    name: 'Madurai JS Developers',
    logoUrl: 'https://placehold.co/100x100.png?text=JS',
    description: 'A group for JavaScript enthusiasts and developers. Share knowledge on frameworks, libraries, and best practices.',
    joinLink: '#',
  },
  {
    id: 'python-madurai',
    name: 'Python Programmers Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Py',
    description: 'Connect with Python developers in Madurai. Discuss web development, data science, AI/ML with Python.',
    joinLink: '#',
  },
  {
    id: 'ai-ml-madurai',
    name: 'AI & ML Enthusiasts Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=AI/ML',
    description: 'Explore the world of Artificial Intelligence and Machine Learning. Workshops and project collaborations.',
    joinLink: '#',
  },
  {
    id: 'madurai-designers',
    name: 'Madurai UI/UX Designers',
    logoUrl: 'https://placehold.co/100x100.png?text=UI/UX',
    description: 'A community for UI/UX designers to share work, get feedback, and discuss design principles.',
    joinLink: '#',
  },
  {
    id: 'flutter-madurai',
    name: 'Flutter Developers Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Flutter',
    description: 'Dedicated to Flutter app development. Share experiences, solve problems, and build amazing apps.',
    joinLink: '#',
  },
  {
    id: 'cloud-native-madurai',
    name: 'Cloud Native Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Cloud',
    description: 'Discuss cloud computing, Kubernetes, Docker, and serverless technologies. DevOps practices.',
    joinLink: '#',
  },
  {
    id: 'cybersec-madurai',
    name: 'Cybersecurity Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Cyber',
    description: 'Learn about cybersecurity, ethical hacking, and data privacy. Stay updated on security threats.',
    joinLink: '#',
  },
  // Add 10 more for "Show More" functionality
  {
    id: 'startup-madurai',
    name: 'Startup Madurai Network',
    logoUrl: 'https://placehold.co/100x100.png?text=Startup',
    description: 'Connecting entrepreneurs, mentors, and investors in Madurai. Pitch events and startup support.',
    joinLink: '#',
  },
  {
    id: 'data-science-madurai',
    name: 'Data Science Madurai Hub',
    logoUrl: 'https://placehold.co/100x100.png?text=Data',
    description: 'A hub for data scientists and analysts to learn, share, and work on data-driven projects.',
    joinLink: '#',
  },
  {
    id: 'blockchain-madurai',
    name: 'Blockchain Developers Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Chain',
    description: 'Exploring blockchain technology, cryptocurrencies, and decentralized applications (dApps).',
    joinLink: '#',
  },
  {
    id: 'game-dev-madurai',
    name: 'Game Developers Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Game',
    description: 'For aspiring and professional game developers. Discuss game engines, design, and art.',
    joinLink: '#',
  },
  {
    id: 'iot-madurai',
    name: 'IoT Innovators Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=IoT',
    description: 'Working on Internet of Things projects, hardware, and software. Smart city solutions.',
    joinLink: '#',
  },
  {
    id: 'madurai-women-tech',
    name: 'Madurai Women in Technology',
    logoUrl: 'https://placehold.co/100x100.png?text=WIT',
    description: 'Empowering and supporting women in the tech industry through mentorship and networking.',
    joinLink: '#',
  },
  {
    id: 'open-source-madurai',
    name: 'Open Source Contributors Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=OS',
    description: 'Promoting open-source software development and contributions in the local community.',
    joinLink: '#',
  },
  {
    id: 'devops-madurai',
    name: 'DevOps Madurai Circle',
    logoUrl: 'https://placehold.co/100x100.png?text=DevOps',
    description: 'Sharing best practices in DevOps, CI/CD, automation, and infrastructure as code.',
    joinLink: '#',
  },
  {
    id: 'ar-vr-madurai',
    name: 'AR/VR Creators Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=AR/VR',
    description: 'Community for developers and artists working with Augmented Reality and Virtual Reality.',
    joinLink: '#',
  },
  {
    id: 'madurai-tech-talks',
    name: 'Madurai Tech Talks',
    logoUrl: 'https://placehold.co/100x100.png?text=Talks',
    description: 'A general forum for tech talks on various topics, fostering learning and networking.',
    joinLink: '#',
  },
];

const ITEMS_PER_PAGE = 10;

export default function CommunityPage() {
  const [displayedCommunities, setDisplayedCommunities] = useState<Community[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTitle, setPageTitle] = useState('Developer Communities - Open MaduraAI'); // Default title

  useEffect(() => {
    // Set document title on client side for SPA-like feel
    document.title = pageTitle;
  }, [pageTitle]);


  useEffect(() => {
    setDisplayedCommunities(allCommunitiesData.slice(0, ITEMS_PER_PAGE));
  }, []);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const nextItems = allCommunitiesData.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedCommunities(nextItems);
    setCurrentPage(nextPage);
  };

  const hasMoreCommunities = displayedCommunities.length < allCommunitiesData.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Developer Communities</h1>
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
          Discover and connect with vibrant developer communities in Madurai. Share knowledge, collaborate on projects, and grow your network.
        </p>
        {displayedCommunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayedCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                name={community.name}
                logoUrl={community.logoUrl}
                description={community.description}
                joinLink={community.joinLink}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">Loading communities...</p>
        )}

        {hasMoreCommunities && (
          <div className="mt-12 text-center">
            <Button onClick={handleShowMore} size="lg" className="shadow-md hover:shadow-lg">
              Show More
            </Button>
          </div>
        )}
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
