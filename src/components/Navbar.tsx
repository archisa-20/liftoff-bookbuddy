import { useState } from 'react';
import { Search, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = user ? [
    { label: 'Home', href: '/' },
    { label: 'Explore Books', href: '/explore' },
    { label: 'My Library', href: '/wishlist' },
    { label: 'Dashboard', href: '/dashboard' },
  ] : [
    { label: 'Home', href: '/' },
    { label: 'Explore Books', href: '/explore' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 border border-muted-gold/30">
              <Sparkles className="h-6 w-6 text-muted-gold" />
            </div>
            <div>
              <h1 className="font-playfair text-xl md:text-2xl font-bold gradient-text-gold">
                BookBuddy
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                Digital Reading Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-muted-gold transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-muted-gold to-rich-gold group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3">
            {/* Search - Hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:flex relative">
              <Input
                placeholder="Search magical books..."
                className="w-32 md:w-40 lg:w-48 pl-10 bg-card/50 border-border/50 focus:border-muted-gold/50 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Action Buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-card/50">
                  <Heart className="h-5 w-5 text-muted-foreground hover:text-muted-gold transition-colors" />
                </Button>
                <a href="/dashboard" className="hidden md:inline text-sm text-muted-foreground hover:text-muted-gold">Dashboard</a>
                <Button variant="secondary" size="sm" onClick={signOut}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a href="/login" className="text-sm text-muted-foreground hover:text-muted-gold">Login</a>
                <Button asChild size="sm">
                  <a href="/signup">Sign up</a>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 hover:bg-card/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  placeholder="Search magical books..."
                  className="pl-10 bg-card/50 border-border/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-muted-gold hover:bg-card/30 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 border-t border-border/20">
                  {user ? (
                    <button
                      className="w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-muted-gold hover:bg-card/30 rounded-lg transition-all duration-200"
                      onClick={() => { setIsMenuOpen(false); signOut(); }}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-muted-gold hover:bg-card/30 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-muted-gold hover:bg-card/30 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};