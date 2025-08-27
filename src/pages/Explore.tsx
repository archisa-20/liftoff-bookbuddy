import { useState } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Extended book data for exploration
const exploreBooks = [
  {
    id: 1,
    title: "The Midnight Grimoire",
    author: "Evangeline Thornfield",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    rating: 4.8,
    price: "₹399",
    originalPrice: "₹499",
    genre: "Dark Fantasy",
    description: "A mesmerizing tale of ancient magic and forbidden knowledge that will keep you spellbound.",
    tags: ["Bestseller", "New Release"],
    inStock: true
  },
  {
    id: 2,
    title: "Secrets of the Velvet Library",
    author: "Cornelius Blackwood",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    rating: 4.6,
    price: "₹299",
    originalPrice: "₹399",
    genre: "Mystery",
    description: "Uncover the mysteries hidden within the walls of an ancient library.",
    tags: ["Editor's Choice"],
    inStock: true
  },
  {
    id: 3,
    title: "The Alchemist's Daughter",
    author: "Seraphina Vale",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    rating: 4.9,
    price: "₹349",
    originalPrice: "₹449",
    genre: "Historical Fiction",
    description: "A captivating story of love, loss, and the pursuit of forbidden knowledge.",
    tags: ["Award Winner"],
    inStock: true
  },
  {
    id: 4,
    title: "Chronicles of the Ember Court",
    author: "Magnus Drakewood",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    rating: 4.7,
    price: "₹449",
    originalPrice: "₹549",
    genre: "Epic Fantasy",
    description: "An epic journey through realms of fire and shadow in this fantasy masterpiece.",
    tags: ["Series", "Fantasy Epic"],
    inStock: false
  },
  {
    id: 5,
    title: "The Philosopher's Stone Codex",
    author: "Arabella Mystique",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    rating: 4.5,
    price: "₹329",
    originalPrice: "₹429",
    genre: "Philosophy",
    description: "Explore the deepest questions of existence through this philosophical journey.",
    tags: ["Philosophy", "Wisdom"],
    inStock: true
  },
  {
    id: 6,
    title: "Whispers from the Shadow Realm",
    author: "Damien Ashcroft",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    rating: 4.4,
    price: "₹379",
    originalPrice: "₹479",
    genre: "Horror",
    description: "A spine-chilling tale that blurs the line between reality and nightmare.",
    tags: ["Horror", "Thriller"],
    inStock: true
  },
  {
    id: 7,
    title: "The Crystal Prophecy",
    author: "Lyra Moonwhisper",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    rating: 4.8,
    price: "₹389",
    originalPrice: "₹489",
    genre: "Fantasy",
    description: "A young mage must fulfill an ancient prophecy to save her world from darkness.",
    tags: ["New Release", "Young Adult"],
    inStock: true
  },
  {
    id: 8,
    title: "The Timekeeper's Journal",
    author: "Benedict Clocksworth",
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop",
    rating: 4.6,
    price: "₹359",
    originalPrice: "₹459",
    genre: "Science Fiction",
    description: "Journey through time itself in this mind-bending sci-fi adventure.",
    tags: ["Time Travel", "Sci-Fi"],
    inStock: true
  }
];

const genres = [...new Set(exploreBooks.map(book => book.genre))];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlistedBooks, setWishlistedBooks] = useState<number[]>([]);

  const toggleWishlist = (bookId: number) => {
    setWishlistedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const filteredBooks = exploreBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
      case 'price-high':
        return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-midnight-navy/20 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="heading-hero mb-4">
                Explore Our
                <br />
                <span className="gradient-text-mystical">Digital Library</span>
              </h1>
              <p className="body-elegant text-lg max-w-3xl mx-auto">
                Instant access to thousands of eBooks and audiobooks. Start reading 
                immediately with our premium subscription plans.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Enhanced Search */}
                <div className="relative flex-1 max-w-2xl">
                  <Input
                    placeholder="Search by title, author, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 h-12"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Genre Filter */}
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-40 bg-background/50 border-border/50">
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36 bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popular</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="price-low">Price: Low</SelectItem>
                      <SelectItem value="price-high">Price: High</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-background/50 rounded-lg p-1 border border-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-muted-gold/20 text-muted-gold' : 'text-muted-foreground'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-muted-gold/20 text-muted-gold' : 'text-muted-foreground'}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {sortedBooks.length} book{sortedBooks.length !== 1 ? 's' : ''} found
                {selectedGenre !== 'all' && ` in ${selectedGenre}`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Books Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {sortedBooks.map((book) => (
                <div key={book.id} className="animate-fade-in">
                  <div className="card-royal group overflow-hidden hover:shadow-mystical transition-all duration-300">
                    <div className="relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Overlays */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {book.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-midnight-navy/80 text-muted-gold">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={() => toggleWishlist(book.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 transition-colors ${
                              wishlistedBooks.includes(book.id) 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-muted-foreground hover:text-muted-gold'
                            }`} 
                          />
                        </Button>
                      </div>

                      {!book.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-muted-gold/20 text-muted-gold">Coming Soon</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-playfair text-lg font-semibold text-foreground mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {book.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-muted-gold fill-muted-gold" />
                          <span className="ml-1 text-sm font-medium">{book.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {book.genre}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-muted-gold">{book.price}</span>
                            <span className="text-xs text-muted-foreground line-through">
                              {book.originalPrice}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          disabled={!book.inStock}
                          className="bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {book.inStock ? 'Read Now' : 'Coming Soon'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedBooks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="heading-secondary mb-2">No books found</h3>
                <p className="body-elegant">
                  Try adjusting your search terms or filters to discover more amazing digital books.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}