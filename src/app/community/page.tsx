
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

// TODO: This data should ideally be fetched dynamically from a Firebase collection named "developer_communities".
// The following is placeholder data based on provided text and existing examples.
const allCommunitiesData: Community[] = [
  {
    id: 'gdg-madurai',
    name: 'Google Developer Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=GDG',
    description: 'Official Google chapter in Madurai fostering tech learning for students, professionals, and entrepreneurs. Organizes tech talks, workshops, hackathons, and has hosted events like Devfest Madurai.',
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
    id: 'gdg-cloud-madurai',
    name: 'Google Developer Group Cloud Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=GDGC',
    description: 'Independent Google chapter focused on Google Cloud technologies. Connects developers, sysadmins, data scientists, and leaders. Past events include Cloud & AI talks and Google Cloud Community Day.',
    joinLink: 'https://gdg.community.dev/gdg-cloud-madurai/',
  },
  {
    id: 'zoho-madurai-zug',
    name: 'Zoho User Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Zoho',
    description: "Local Zoho User Group for users, developers, and partners to network and share insights on Zoho's ecosystem. Past events include Zobot Bootcamps and product-specific meetups.",
    joinLink: 'https://community.zoho.com/user-groups/madurai.html',
  },
  {
    id: 'sida',
    name: 'SIDA (Software Industries Development Association)',
    logoUrl: 'https://placehold.co/100x100.png?text=SIDA',
    description: 'Supports small and medium-sized enterprises with technology adoption and skill development.',
    joinLink: '#', // Placeholder, actual link needed
  },
  {
    id: 'madurai-tech-community',
    name: 'Madurai Tech Community',
    logoUrl: 'https://placehold.co/100x100.png?text=MTC',
    description: 'Focus: Knowledge sharing, startup events, hackathons, mentorship, and job fairs.',
    joinLink: 'https://madurai-tech.org',
  },
  {
    id: 'aws-user-group-madurai',
    name: 'AWS User Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=AWS',
    description: 'Focus: Amazon Web Services (AWS), cloud computing, and related technologies.',
    joinLink: 'https://www.meetup.com/aws-user-group-madurai/',
  },
  {
    id: 'cloud-native-madurai',
    name: 'Cloud Native Madurai (CNCF Chapter)',
    logoUrl: 'https://placehold.co/100x100.png?text=CNCF',
    description: 'Focus: Cloud-native computing, Kubernetes, and CNCF projects. Example: Cloud Native Madurai Meetup.',
    joinLink: 'https://community.cncf.io/madurai/',
  },
  {
    id: 'madurai-wordpress-meetup',
    name: 'Madurai WordPress Meetup Group',
    logoUrl: 'https://placehold.co/100x100.png?text=WP',
    description: 'Focus: WordPress development, design, and publishing.',
    joinLink: 'https://www.meetup.com/Madurai-WordPress-Meetup-Group/',
  },
  {
    id: 'makersmadurai',
    name: 'MakersMadurai',
    logoUrl: 'https://placehold.co/100x100.png?text=MM',
    description: 'Focus: Makerspace, Fablab, Hackerspace, and tech innovation.',
    joinLink: 'https://makersmadurai.org/',
  },
  {
    id: 'maduraistartups',
    name: 'MaduraiStartups',
    logoUrl: 'https://placehold.co/100x100.png?text=MS',
    description: 'Focus: Entrepreneurship, startups, business networking, and technology for business.',
    joinLink: 'https://www.meetup.com/MaduraiStartups/',
  },
  {
    id: 'cybersec-madurai',
    name: 'Cybersecurity Group Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Cyber',
    description: 'Learn about cybersecurity, ethical hacking, and data privacy. Stay updated on security threats.',
    joinLink: '#',
  },
  {
    id: 'azure-dev-madurai',
    name: 'Azure Developer Community Madurai',
    logoUrl: 'https://placehold.co/100x100.png?text=Azure',
    description: "Community focused on Microsoft Azure technologies in Madurai. Connects local professionals interested in Microsoft's cloud platform. Find specific Madurai details via the directory.",
    joinLink: 'https://azdev.reskilll.com/findcommunity',
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

