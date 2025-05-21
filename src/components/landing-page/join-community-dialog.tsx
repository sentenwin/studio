
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { useRouter } from 'next/navigation'; 

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { sendWelcomeNotifications } from "@/ai/flows/send-welcome-notifications-flow"; // Import the new flow

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).refine(val => /^\+?[1-9]\d{1,14}$/.test(val) || val === '', { message: "Please enter a valid phone number in E.164 format (e.g., +1234567890) or leave empty."}).optional().or(z.literal('')),
  githubLink: z.string().url({ message: "Please enter a valid URL (e.g., https://github.com/username)." }).optional().or(z.literal('')),
  gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function JoinCommunityDialog() {
  const { toast } = useToast();
  const router = useRouter(); 
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      githubLink: "",
      gender: undefined,
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('email')
        .eq('email', values.email)
        .maybeSingle(); 

      if (selectError && selectError.code !== 'PGRST116') { 
        console.error('Supabase select error:', selectError);
        toast({
          title: "Error Checking User",
          description: selectError.message || "Could not verify your details. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (existingUser) {
        toast({
          title: "Already Joined!",
          description: "You have already joined our community. Redirecting...",
        });
        setIsOpen(false); 
        form.reset();
        router.push('/projects'); 
      } else {
        const { data: newUserData, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              name: values.name,
              email: values.email,
              phone: values.phone || null,
              github_url: values.githubLink || null, 
              gender: values.gender || null,
            },
          ])
          .select()
          .single(); // Assuming you want the newly inserted user's data

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          toast({
            title: "Submission Failed",
            description: insertError.message || "Could not save your details. Please try again.",
            variant: "destructive",
          });
        } else {
          console.log("Supabase success data:", newUserData);
          toast({
            title: "Welcome Aboard!",
            description: "Thanks for your interest. We'll be in touch soon.",
          });
          
          // Send Twilio notifications if phone number is provided
          if (values.phone && newUserData) { // Check if newUserData is not null
            try {
              toast({
                title: "Sending Welcome Notifications...",
                description: "Please wait a moment.",
              });
              const notificationResult = await sendWelcomeNotifications({ name: values.name, phone: values.phone });
              console.log('Twilio Notification Result:', notificationResult);
              if (notificationResult.error) {
                toast({
                  title: "Notification Issue",
                  description: `Welcome message sent, but: ${notificationResult.error}`,
                  variant: "destructive",
                  duration: 7000,
                });
              } else {
                 toast({
                  title: "Notifications Sent!",
                  description: `SMS status: ${notificationResult.smsStatus}, Call status: ${notificationResult.callStatus}`,
                  duration: 7000,
                });
              }
            } catch (notificationError: any) {
              console.error('Error sending Twilio notifications:', notificationError);
              toast({
                title: "Notification Error",
                description: notificationError.message || "Failed to send welcome SMS/call.",
                variant: "destructive",
              });
            }
          }
          
          form.reset();
          setIsOpen(false);
        }
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
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
    <Dialog
        open={isOpen}
        onOpenChange={(openState) => {
            if (isSubmitting) return; // Prevent closing while submitting
            setIsOpen(openState);
            if (!openState) { // Reset form if dialog is closed
                form.reset();
            }
        }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transform transition-shadow duration-300"
          disabled={isSubmitting}
        >
          Join the Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Join Our Community</DialogTitle>
          <DialogDescription>
            Fill in your details below to express your interest. We're excited to collaborate with you!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2 pb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (e.g., +1234567890, Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your contact number" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/yourusername" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender (Optional)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={isSubmitting}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" disabled={isSubmitting} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" disabled={isSubmitting} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Female
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="prefer_not_to_say" disabled={isSubmitting} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Prefer not to say
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
