"use client"; // No longer needs to be a client component if project display is removed here

import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Removed useState and supabase client import as project fetching is moved
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Users, Briefcase } from 'lucide-react';
import type { MemberProfile } from '@/app/members/page';
// Removed supabase client import

interface MemberCardProps {
  member: MemberProfile; // MemberProfile now includes 'id' and 'email'
}

const MemberCard: FC<MemberCardProps> = ({ member }) => {
  const displayName = member.githubName || member.supabaseName;

  // Removed state and functions for fetching projects within this card
  // (showProjects, memberProjects, isLoadingProjects, handleToggleProjects)

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

      {/* "View Profile & Projects" Button linking to dynamic profile page */}
      <CardContent className="py-3 border-t border-b">
        <div className="text-center">
          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link href={`/profile/${member.id}`}> {/* Link to dynamic profile page */}
              <Briefcase className="mr-2 h-4 w-4" />
              View Profile & Projects
            </Link>
          </Button>
        </div>
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