
import type { FC } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { Github, Linkedin, Bird } from 'lucide-react'; // Bird as a stand-in for Twitter

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Empowering local innovation through collaboration. Open-source AI for community-driven solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/#mission" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Projects</Link></li>
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Open MaduraAI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Bird className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
