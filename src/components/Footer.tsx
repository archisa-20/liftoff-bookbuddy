import { Sparkles, Heart, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-subtle border-t border-muted-gold/20">
      {/* Newsletter Section */}
      <div className="border-b border-border/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-muted-gold mr-3" />
              <h3 className="heading-secondary">Join Our Mystical Circle</h3>
            </div>
            <p className="body-elegant mb-6">
              Receive curated book recommendations, exclusive previews of rare collections, 
              and insights from the literary world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Your email address"
                className="flex-1 bg-card/50 border-border/50"
              />
              <Button className="bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy font-medium px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 border border-muted-gold/30">
                <Sparkles className="h-6 w-6 text-muted-gold" />
              </div>
              <div>
                <h2 className="font-playfair text-xl font-bold gradient-text-gold">
                  BookBuddy
                </h2>
                <p className="text-xs text-muted-foreground">
                  Gateway to Magical Worlds
                </p>
              </div>
            </div>
            <p className="body-elegant text-sm mb-4">
              Curating the finest collection of mystical literature, rare books, 
              and enchanting tales for discerning readers worldwide.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-muted-gold/10 hover:text-muted-gold">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-muted-gold/10 hover:text-muted-gold">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-muted-gold/10 hover:text-muted-gold">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-muted-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Best Sellers', 'Rare Collections', 'Author Spotlights', 'Book Reviews'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-muted-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-muted-gold mb-4">
              Genres
            </h4>
            <ul className="space-y-2">
              {['Dark Fantasy', 'Historical Fiction', 'Philosophy', 'Mystery', 'Epic Fantasy'].map((genre) => (
                <li key={genre}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-muted-gold transition-colors duration-200"
                  >
                    {genre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-muted-gold mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Shipping Info', 'Returns', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-muted-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="divider-flourish"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-sm text-muted-foreground">
          <p>
            © 2024 BookBuddy. Crafted with{' '}
            <Heart className="inline h-4 w-4 text-muted-gold fill-current mx-1" />
            for book lovers everywhere.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-muted-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-muted-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-muted-gold transition-colors flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};