
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import MemberCard from '@/components/members/member-card';

export const metadata: Metadata = {
  title: 'Our Community Members - Open MaduraAI',
  description: 'Meet the talented individuals in the Open MaduraAI community.',
};

interface GitHubUser {
  name?: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
}

export interface MemberProfile {
  id: string; // Supabase user ID
  supabaseName: string;
  email: string;
  githubLogin?: string;
  githubName?: string;
  avatarUrl?: string;
  githubProfileUrl?: string;
  followers?: number;
}

async function getMembers(): Promise<MemberProfile[]> {
  // Select id, name, email, and github_url
  const { data: users, error: supabaseError } = await supabase
    .from('users')
    .select('id, name, github_url, email')
    .not('github_url', 'is', null);

  if (supabaseError) {
    console.error('Error fetching users from Supabase. Message:', supabaseError.message, 'Full error:', supabaseError);
    return [];
  }

  if (!users || users.length === 0) {
    return [];
  }

  const memberProfiles: MemberProfile[] = [];

  for (const user of users) {
    let profile: MemberProfile = {
      id: user.id, // Store Supabase user ID
      supabaseName: user.name || 'N/A',
      email: user.email,
    };

    if (user.github_url) {
      try {
        const url = new URL(user.github_url);
        const pathParts = url.pathname.split('/').filter(part => part.length > 0);
        const username = pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;


        if (username) {
          profile.githubLogin = username;
          profile.githubProfileUrl = user.github_url;

          // TODO: Consider adding Authorization header for higher rate limits in production
          // const headers = process.env.GITHUB_PAT ? { 'Authorization': `token ${process.env.GITHUB_PAT}` } : {};
          // const res = await fetch(`https://api.github.com/users/${username}`, { headers });
          const res = await fetch(`https://api.github.com/users/${username}`);

          if (res.ok) {
            const githubData: GitHubUser = await res.json();
            profile.githubName = githubData.name || githubData.login;
            profile.avatarUrl = githubData.avatar_url;
            profile.githubProfileUrl = githubData.html_url;
            profile.followers = githubData.followers;
          } else {
            console.warn(`Failed to fetch GitHub data for ${username}: ${res.status} ${await res.text()}`);
          }
        }
      } catch (fetchError: any) {
        console.error(`Error processing GitHub URL ${user.github_url} or fetching data:`, fetchError.message);
        if (user.github_url && !profile.githubProfileUrl) {
             profile.githubProfileUrl = user.github_url;
        }
      }
    }
    memberProfiles.push(profile);
  }
  return memberProfiles;
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Community Members</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {members.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No members with GitHub profiles found, or failed to fetch details. Be the first to join and link your GitHub!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
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
