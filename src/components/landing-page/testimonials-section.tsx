import type { FC } from 'react';
import TestimonialCard from './testimonial-card';

const testimonials = [
  {
    quote: "LandingVerse revolutionized how we create landing pages. It's fast, intuitive, and the AI features are a game-changer!",
    name: 'Sarah L.',
    role: 'Marketing Manager, Tech Startup',
    avatarSrc: 'https://placehold.co/100x100.png?text=SL',
    rating: 5,
  },
  {
    quote: "The best landing page builder I've used. Our conversion rates have improved significantly since switching to LandingVerse.",
    name: 'John B.',
    role: 'Founder, E-commerce Store',
    avatarSrc: 'https://placehold.co/100x100.png?text=JB',
    rating: 5,
  },
  {
    quote: "Exceptional tool with excellent support. The templates are beautiful and easy to customize. Highly recommended!",
    name: 'Alice M.',
    role: 'Digital Marketer, Creative Agency',
    avatarSrc: 'https://placehold.co/100x100.png?text=AM',
    rating: 5,
  },
];

const TestimonialsSection: FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Loved by Creators Worldwide
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience with LandingVerse.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatarSrc={testimonial.avatarSrc}
              rating={testimonial.rating}
              data-ai-hint="testimonial person"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
