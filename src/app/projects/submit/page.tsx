
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

const projectFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }),
  projectDetails: z.string().min(10, { message: "Project details must be at least 10 characters." }),
  projectTags: z.string().optional(), // Comma-separated, can be processed later
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  videoDemoUrl: z.string().url({ message: "Please enter a valid URL or leave empty." }).optional().or(z.literal('')),
  githubRepoUrl: z.string().url({ message: "Please enter a valid GitHub repository URL." }).optional().or(z.literal('')),
  developers: z.string().optional(), // Comma-separated GitHub usernames
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function SubmitProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      email: "",
      projectName: "",
      projectDetails: "",
      projectTags: "",
      imageUrl: "",
      videoDemoUrl: "",
      githubRepoUrl: "",
      developers: "",
    },
  });

  async function onSubmit(values: ProjectFormData) {
    setIsSubmitting(true);

    const tagsArray = values.projectTags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [];
    const developersArray = values.developers?.split(',').map(dev => dev.trim()).filter(dev => dev) || [];

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            email: values.email,
            project_name: values.projectName,
            project_details: values.projectDetails,
            project_tags: tagsArray.length > 0 ? tagsArray : null,
            image_url: values.imageUrl,
            video_demo_url: values.videoDemoUrl || null,
            github_repo_url: values.githubRepoUrl || null,
            developers: developersArray.length > 0 ? developersArray : null,
            // Default values for approved, view_allowed, view_count, interest_count, donate_amount, status
            // are handled by the database schema or can be set later via an admin interface.
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Submission Failed",
          description: error.message || "Could not save your project. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Project Submitted!",
          description: "Thank you for sharing your project. It will be reviewed shortly.",
        });
        form.reset();
        // Optionally redirect after submission
        // router.push('/projects'); 
      }
    } catch (err: any) {
      console.error('Unexpected error during project submission:', err);
      toast({
        title: "Submission Error",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Submit Your AI Project</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome AI Project" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your project, its features, and what it does." {...field} rows={5} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NLP, Computer Vision, LLM" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubRepoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/yourusername/your-repo" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="developers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Developers (comma-separated GitHub usernames, Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="username1, username2" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/your-project-image.png" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoDemoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Demo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/watch?v=your_video" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

