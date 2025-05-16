
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Open MaduraAI',
  description: 'Get in touch with Open MaduraAI. Find our contact details and location.',
};

export default function ContactUsPage() {
  const address = "MakersMadurai, Madurai 625004";
  const mapQuery = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-primary">Get In Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">Makers Madurai</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-accent" />
                  <a href="mailto:hello@openmadurai.org" className="hover:underline">hello@openmadurai.org</a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent" />
                  <a href="tel:+918095207092" className="hover:underline">+91 809520 7092</a>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
                  <span>{address}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Our Location</h3>
              <div className="aspect-video rounded-md overflow-hidden border border-border">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Map for ${address}`}
                ></iframe>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
