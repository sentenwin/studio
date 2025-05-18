
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Github, Briefcase } from 'lucide-react';
import ModelCard from '@/components/projects/model-card'; // Re-using ModelCard for projects
import type { ProjectModel } from '@/lib/placeholder-data'; // For project card structure

interface GitHubUser {
  name?: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
}

interface UserProfile {
  id: string;
  supabaseName: string;
  email: string;
  githubLogin?: string;
  githubName?: string;
  avatarUrl?: string;
  githubProfileUrl?: string;
  followers?: number;
}

interface Project {
  id: string;
  email: string;
  project_name: string;
  project_details?: string | null;
  project_tags?: string[] | null;
  github_repo_url?: string | null;
  developers?: string[] | null;
  image_url?: string | null;
  video_demo_url?: string | null;
  // Add other fields from your 'projects' table if needed for display
}

export async function generateStaticParams() {
  const { data: users, error } = await supabase.from('users').select('id');

  if (error || !users) {
    console.error('Error fetching user IDs for generateStaticParams:', error?.message);
    return [];
  }

  return users.map((user) => ({
    userId: user.id.toString(),
  }));
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data: user, error: supabaseError } = await supabase
    .from('users')
    .select('id, name, email, github_url')
    .eq('id', userId)
    .single();

  if (supabaseError || !user) {
    console.error('Error fetching user from Supabase by ID:', supabaseError?.message);
    return null;
  }

  let profile: UserProfile = {
    id: user.id,
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
        profile.githubProfileUrl = user.github_url; // Default to Supabase URL
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const githubData: GitHubUser = await res.json();
          profile.githubName = githubData.name || githubData.login;
          profile.avatarUrl = githubData.avatar_url;
          profile.githubProfileUrl = githubData.html_url; // Update with canonical GitHub URL
          profile.followers = githubData.followers;
        } else {
          console.warn(`Failed to fetch GitHub data for ${username} on profile page: ${res.status}`);
        }
      }
    } catch (fetchError: any) {
      console.error(`Error processing GitHub URL ${user.github_url} for profile:`, fetchError.message);
    }
  }
  return profile;
}

async function getUserProjects(email: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*') // Select all columns for now, adjust as needed
    .eq('email', email)
    .order('created_at', { ascending: false }); // Assuming 'created_at' exists

  if (error) {
    console.error('Error fetching projects for user:', error.message);
    return [];
  }
  return data || [];
}

export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const profile = await getUserProfile(params.userId);
  const displayName = profile?.githubName || profile?.supabaseName || 'User';
  return {
    title: `${displayName}'s Profile - Open MaduraAI`,
    description: `View the profile and projects of ${displayName} on Open MaduraAI.`,
  };
}

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  const profile = await getUserProfile(params.userId);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">User Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">The profile you are looking for does not exist or could not be loaded.</p>
        <Button asChild>
          <Link href="/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
      </div>
    );
  }

  const projects = await getUserProjects(profile.email);
  const displayName = profile.githubName || profile.supabaseName;

  // Adapt projects to ProjectModel structure for ModelCard
  const adaptedProjects: ProjectModel[] = projects.map(p => ({
    id: p.id,
    name: p.project_name,
    author: displayName, // Author is the profile user
    description: p.project_details || 'No description provided.',
    imageUrl: p.image_url || 'https://placehold.co/600x400.png',
    hfUrl: p.github_repo_url || '#', // Use GitHub repo URL or a fallback
    tags: p.project_tags || [],
    dataAiHint: 'project image' // Generic hint
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Section */}
        <section className="mb-12 p-6 bg-card rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-6">
          {profile.avatarUrl ? (
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
              <Image src={profile.avatarUrl} alt={`${displayName}'s avatar`} fill style={{ objectFit: 'cover' }} data-ai-hint="user avatar" />
            </div>
          ) : (
            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary flex-shrink-0">
              <span className="text-5xl text-muted-foreground">{displayName.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-primary">{displayName}</h2>
            {profile.githubLogin && (
              <p className="text-md text-muted-foreground">@{profile.githubLogin}</p>
            )}
            {profile.followers !== undefined && (
              <div className="flex items-center justify-center sm:justify-start text-md text-foreground/80 mt-2">
                <Users className="mr-2 h-5 w-5 text-accent" />
                {profile.followers.toLocaleString()} Followers
              </div>
            )}
            {profile.githubProfileUrl && (
              <Button asChild variant="link" className="mt-2 px-0 text-accent">
                <Link href={profile.githubProfileUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-primary flex items-center">
                <Briefcase className="mr-3 h-6 w-6" />
                Projects
            </h3>
            <Button asChild>
                <Link href="/projects/submit">Upload New Project</Link>
            </Button>
          </div>

          {adaptedProjects.length === 0 ? (
            <div className="text-center py-10 bg-card rounded-lg shadow">
              <p className="text-xl text-muted-foreground mb-4">This user hasn't uploaded any projects yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {adaptedProjects.map((project) => (
                <ModelCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
