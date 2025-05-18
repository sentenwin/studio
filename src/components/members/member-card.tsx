
"use client";

import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Users, Briefcase } from 'lucide-react'; // Added Briefcase for projects icon
import type { MemberProfile } from '@/app/members/page';
import { supabase } from '@/lib/supabaseClient';

// Simplified project type for display
interface BriefProject {
  id: string;
  project_name: string;
}

interface MemberCardProps {
  member: MemberProfile;
}

const MemberCard: FC<MemberCardProps> = ({ member }) => {
  const displayName = member.githubName || member.supabaseName;

  const [showProjects, setShowProjects] = useState(false);
  const [memberProjects, setMemberProjects] = useState<BriefProject[] | null>(null);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const handleToggleProjects = async () => {
    if (!showProjects && !memberProjects) { // Only fetch if showing for the first time
      setIsLoadingProjects(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, project_name')
          .eq('email', member.email);

        if (error) {
          console.error('Error fetching member projects:', error.message);
          setMemberProjects([]); // Set to empty array on error to show "Upload" button
        } else {
          setMemberProjects(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching projects:', err);
        setMemberProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    }
    setShowProjects(!showProjects);
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="items-center text-center pb-3">
        {member.avatarUrl ? (
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary mb-3">
            <Image
              src={member.avatarUrl}
              alt={`${displayName}'s avatar`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="user avatar"
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-3 border-2 border-primary">
            <span className="text-3xl text-muted-foreground">
              {displayName ? displayName.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-primary line-clamp-2">
          {displayName}
        </CardTitle>
        {member.githubLogin && (
          <p className="text-sm text-muted-foreground">@{member.githubLogin}</p>
        )}
      </CardHeader>
      <CardContent className="flex-grow text-center pb-2">
        {member.followers !== undefined && (
          <div className="flex items-center justify-center text-sm text-foreground/80">
            <Users className="mr-2 h-4 w-4 text-accent" />
            {member.followers.toLocaleString()} Followers
          </div>
        )}
      </CardContent>

      {/* My Projects Section */}
      <CardContent className="py-3 border-t border-b">
        <div className="text-center">
          <Button variant="secondary" size="sm" onClick={handleToggleProjects} className="w-full">
            <Briefcase className="mr-2 h-4 w-4" />
            {showProjects ? 'Hide My Projects' : 'Show My Projects'}
          </Button>
        </div>
        {showProjects && (
          <div className="mt-3 text-left">
            {isLoadingProjects && <p className="text-sm text-muted-foreground text-center">Loading projects...</p>}
            {!isLoadingProjects && memberProjects && memberProjects.length === 0 && (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">No projects found.</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/projects/submit">Upload New Project</Link>
                </Button>
              </div>
            )}
            {!isLoadingProjects && memberProjects && memberProjects.length > 0 && (
              <>
                <h4 className="text-sm font-medium text-primary mb-1">Projects:</h4>
                <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-foreground/80">
                  {memberProjects.map((project) => (
                    <li key={project.id}>{project.project_name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter>
        {member.githubProfileUrl ? (
          <Button asChild className="w-full" variant="outline">
            <Link href={member.githubProfileUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View GitHub Profile
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            GitHub Not Linked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
