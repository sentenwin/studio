
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Open MaduraAI',
  description: 'Privacy Policy for Open MaduraAI.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-primary mb-6">Our Commitment to Your Privacy</h2>
          <p className="mb-4 text-foreground/80">
            This Privacy Policy describes how Open MaduraAI ("we", "us", or "our") collects, uses, and shares information in connection with your use of our website, services, and applications (collectively, the "Services"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">1. Information We Collect</h3>
          <p className="mb-4 text-foreground/80">
            We may collect information that you provide directly to us, such as when you create an account, submit content, or communicate with us. This may include your name, email address, and any other information you choose to provide.
          </p>
          <p className="mb-4 text-foreground/80">
            We may also collect certain information automatically when you use our Services, such as your IP address, browser type, operating system, and usage data.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">2. How We Use Your Information</h3>
          <p className="mb-4 text-foreground/80">
            We may use the information we collect to:
          </p>
          <ul className="list-disc list-inside mb-4 text-foreground/80 space-y-1">
            <li>Provide, operate, and maintain our Services;</li>
            <li>Improve, personalize, and expand our Services;</li>
            <li>Understand and analyze how you use our Services;</li>
            <li>Develop new products, services, features, and functionality;</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes;</li>
            <li>Process your transactions;</li>
            <li>Find and prevent fraud.</li>
          </ul>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">3. Sharing Your Information</h3>
          <p className="mb-4 text-foreground/80">
            We do not sell your personal information. We may share information with third-party vendors and service providers that perform services on our behalf, such as hosting, data analysis, and customer service. These third parties are obligated to protect your information.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">4. Data Security</h3>
          <p className="mb-4 text-foreground/80">
            We implement reasonable security measures to protect the security of your information both online and offline and are committed to the protection of customer information.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">5. Changes to This Privacy Policy</h3>
          <p className="mb-4 text-foreground/80">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">6. Contact Us</h3>
          <p className="text-foreground/80">
            If you have any questions about this Privacy Policy, please contact us at [Your Contact Email/Link to Contact Page].
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
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
