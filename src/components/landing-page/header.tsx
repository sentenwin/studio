
"use client";
import type { FC } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '#about', label: 'About us' },
  { href: '/community', label: 'Community' },
  { href: '#featured-projects', label: 'Projects' },
  { href: '#featured-datasets', label: 'Datasets' },
  { href: '#join-us', label: 'Join Us' },
];

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left Section: Mobile Menu Trigger / Desktop Logo */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background p-6">
                  <SheetHeader className="mb-4 border-b pb-4">
                    <SheetTitle>OpenMaduraAI</SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col space-y-4 mt-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg text-foreground/80 hover:text-primary transition-colors font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            {/* Desktop Logo */}
            <div className="hidden md:block">
              <Logo />
            </div>
          </div>

          {/* Center Section: Mobile Logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <Logo />
          </div>


          {/* Right Section: Desktop Navigation / Mobile Spacer */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 md:ml-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Mobile Spacer (to balance the menu button and center the logo on mobile by occupying the rightmost cell) */}
            <div className="md:hidden w-10 h-10">
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
