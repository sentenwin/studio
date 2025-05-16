
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Open MaduraAI',
  description: 'Terms of Service for Open MaduraAI.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Terms of Service</h1>
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
          <h2 className="text-3xl font-semibold text-primary mb-6">Welcome to Open MaduraAI</h2>
          <p className="mb-4 text-foreground/80">
            These Terms of Service ("Terms") govern your access to and use of the Open MaduraAI website, services, and applications (collectively, the "Services") provided by Open MaduraAI ("we", "us", or "our"). Please read these Terms carefully before using our Services.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">1. Acceptance of Terms</h3>
          <p className="mb-4 text-foreground/80">
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, do not use our Services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">2. Use of Services</h3>
          <p className="mb-4 text-foreground/80">
            You agree to use the Services only for lawful purposes and in accordance with these Terms. You are responsible for all content you contribute and your activities on the platform.
          </p>
          <p className="mb-4 text-foreground/80">
            Prohibited activities include, but are not limited to: violating any applicable laws or regulations; infringing on the rights of others; distributing spam or malicious software; and engaging in any activity that disrupts or interferes with our Services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">3. Intellectual Property</h3>
          <p className="mb-4 text-foreground/80">
            Our Services and their original content, features, and functionality are and will remain the exclusive property of Open MaduraAI and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Open MaduraAI.
          </p>
          <p className="mb-4 text-foreground/80">
            By submitting content to our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content in connection with operating and providing the Services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">4. Termination</h3>
          <p className="mb-4 text-foreground/80">
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">5. Disclaimer of Warranties</h3>
          <p className="mb-4 text-foreground/80">
            Our Services are provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, express or implied. We do not warrant that the Services will be uninterrupted, secure, or error-free.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">6. Limitation of Liability</h3>
          <p className="mb-4 text-foreground/80">
            In no event shall Open MaduraAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">7. Changes to Terms</h3>
          <p className="mb-4 text-foreground/80">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">8. Contact Us</h3>
          <p className="text-foreground/80">
            If you have any questions about these Terms, please contact us at [Your Contact Email/Link to Contact Page].
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
