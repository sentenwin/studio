
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CommunityCard, { type CommunityInfo } from '@/components/community/community-card';

export const metadata: Metadata = {
  title: 'Explore Developer Communities - Open MaduraAI',
  description: 'Discover developer communities in Madurai. Connect, learn, and grow with local tech groups.',
};

const communitiesData: CommunityInfo[] = [
  {
    id: '1',
    name: 'Google Developer Group (GDG) Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=GDG',
    description: 'Google technologies, Android, Flutter, Firebase, and community-led tech events.',
    joinLink: 'https://gdg.community.dev/gdg-madurai',
    dataAiHint: 'tech community'
  },
  {
    id: '2',
    name: 'Google Developer Cloud Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=GDC',
    description: 'Google Cloud Platform (GCP), AI/ML, BigQuery, and cloud certifications.',
    joinLink: 'https://gdg.community.dev/gdg-cloud-madurai',
    dataAiHint: 'cloud community'
  },
  {
    id: '3',
    name: 'Digitall Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=DM',
    description: 'Digital marketing, web development, SEO, and tech entrepreneurship.',
    joinLink: 'https://digitallmadurai.in',
    dataAiHint: 'digital marketing'
  },
  {
    id: '4',
    name: 'StartupTN Regional Hub – Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=STN',
    description: 'Startup incubation, networking, funding opportunities, and business mentoring.',
    joinLink: 'https://startuptn.in',
    dataAiHint: 'startup hub'
  },
  {
    id: '5',
    name: 'SIDA (Software Industries Development Association)',
    logoUrl: 'https://placehold.co/80x80.png?text=SIDA',
    description: 'Software development, IT services, industry networking, and skill development.',
    joinLink: 'https://sida.in', // Assuming this is the correct direct link
    dataAiHint: 'software development'
  },
  {
    id: '6',
    name: 'Madurai Tech Community',
    logoUrl: 'https://placehold.co/80x80.png?text=MTC',
    description: 'Knowledge sharing, startup events, hackathons, mentorship, and job fairs.',
    joinLink: 'https://www.madurai-tech.org',
    dataAiHint: 'tech events'
  },
  {
    id: '7',
    name: 'AWS User Group Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=AWS',
    description: 'Amazon Web Services (AWS), cloud computing, and related technologies.',
    joinLink: 'https://www.meetup.com/aws-user-group-madurai',
    dataAiHint: 'aws cloud'
  },
  {
    id: '8',
    name: 'Cloud Native Madurai (CNCF Chapter)',
    logoUrl: 'https://placehold.co/80x80.png?text=CNCF',
    description: 'Cloud-native computing, Kubernetes, and CNCF projects.',
    joinLink: 'https://community.cncf.io/madurai',
    dataAiHint: 'kubernetes logo'
  },
  {
    id: '9',
    name: 'Madurai WordPress Meetup Group',
    logoUrl: 'https://placehold.co/80x80.png?text=WP',
    description: 'WordPress development, design, and publishing.',
    joinLink: 'https://www.meetup.com/madurai-wordpress-meetup-group',
    dataAiHint: 'wordpress logo'
  },
  {
    id: '10',
    name: 'MakersMadurai',
    logoUrl: 'https://placehold.co/80x80.png?text=MM',
    description: 'Makerspace, Fablab, Hackerspace, and tech innovation.',
    joinLink: 'https://www.meetup.com/makersmadurai', // Guessed based on pattern
    dataAiHint: 'maker space'
  },
  {
    id: '11',
    name: 'MaduraiStartups',
    logoUrl: 'https://placehold.co/80x80.png?text=MS',
    description: 'Entrepreneurship, startups, business networking, and technology for business.',
    joinLink: 'https://www.meetup.com/maduraistartups',
    dataAiHint: 'startup company'
  },
  {
    id: '12',
    name: 'Zoho Developer Community - Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=Zoho',
    description: 'Zoho applications, Zobot development, and automation.',
    joinLink: 'https://www.zohomeetups.com/madurai-developers-zug-meetup-zobot-bootcamp-sep-2024',
    dataAiHint: 'zoho logo'
  },
  {
    id: '13',
    name: 'Azure Developer Group Madurai',
    logoUrl: 'https://placehold.co/80x80.png?text=Azure',
    description: 'Microsoft Azure cloud services, AI/ML, DevOps, and certifications.',
    joinLink: 'https://www.meetup.com/azure-dev-group-madurai',
    dataAiHint: 'azure logo'
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Explore Developer Communities</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Feel free to explore these communities to connect, learn, and grow in the tech ecosystem of Madurai!
            </p>
        </div>
        {communitiesData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No communities available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {communitiesData.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
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
