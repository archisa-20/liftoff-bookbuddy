import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';
import heroLibrary from '@/assets/hero-library.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroLibrary}
          alt="Mystical Royal Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-navy/90 via-midnight-navy/70 to-aubergine/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <BookOpen className="h-8 w-8 text-muted-gold" />
      </div>
      <div className="absolute top-40 right-20 animate-float opacity-40" style={{ animationDelay: '2s' }}>
        <Star className="h-6 w-6 text-rich-gold" />
      </div>
      <div className="absolute bottom-32 left-16 animate-float opacity-35" style={{ animationDelay: '4s' }}>
        <Sparkles className="h-10 w-10 text-warm-gold" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-muted-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-muted-gold" />
            <span className="text-sm font-medium text-muted-gold">
              Discover Rare & Magical Literature
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="heading-hero mb-6 animate-slide-up">
            Your Gateway to
            <br />
            <span className="text-mystical">Magical Worlds</span>
          </h1>

          {/* Subtitle */}
          <p className="body-elegant text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Instant access to thousands of eBooks and audiobooks. Build your personal digital library 
            with our premium subscription and start reading immediately—no waiting, no limits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Reading Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-muted-gold/50 text-muted-gold hover:bg-muted-gold/10 px-8 py-3 rounded-xl backdrop-blur-sm"
            >
              View Subscription Plans
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="text-center">
              <div className="heading-secondary mb-1">10,000+</div>
              <p className="text-sm text-muted-foreground">Digital Books</p>
            </div>
            <div className="text-center">
              <div className="heading-secondary mb-1">50,000+</div>
              <p className="text-sm text-muted-foreground">Active Readers</p>
            </div>
            <div className="text-center">
              <div className="heading-secondary mb-1">24/7</div>
              <p className="text-sm text-muted-foreground">Instant Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="divider-flourish"></div>
      </div>
    </section>
  );
};