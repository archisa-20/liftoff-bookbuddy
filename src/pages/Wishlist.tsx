import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Star, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Sample wishlist data
const wishlistBooks = [
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
    addedDate: "2024-01-15",
    inStock: true,
    tags: ["Bestseller", "New Release"]
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
    addedDate: "2024-01-10",
    inStock: false,
    tags: ["Series", "Fantasy Epic"]
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
    addedDate: "2024-01-12",
    inStock: true,
    tags: ["New Release", "Young Adult"]
  }
];

export default function Wishlist() {
  const [books, setBooks] = useState(wishlistBooks);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const removeFromWishlist = (bookId: number) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
      case 'price-high':
        return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
      case 'name':
        return a.title.localeCompare(b.title);
      case 'oldest':
        return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
      default: // newest
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const totalValue = books.reduce((sum, book) => sum + parseInt(book.price.replace('₹', '')), 0);
  const inStockCount = books.filter(book => book.inStock).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-midnight-navy/20 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="heading-hero mb-4">
                Your Personal
                <br />
                <span className="gradient-text-mystical">Digital Library</span>
              </h1>
              <p className="body-elegant text-lg max-w-2xl mx-auto">
                Your collection of purchased and downloaded books, ready to read anytime, anywhere. 
                {books.length > 0 ? `${books.length} books in your library.` : 'Start building your digital library today.'}
              </p>
            </div>

            {/* Wishlist Stats */}
            {books.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="heading-secondary mb-1">{books.length}</div>
                  <p className="text-sm text-muted-foreground">Books Owned</p>
                </div>
                <div className="text-center">
                  <div className="heading-secondary mb-1">₹{totalValue}</div>
                  <p className="text-sm text-muted-foreground">Library Value</p>
                </div>
                <div className="text-center">
                  <div className="heading-secondary mb-1">{inStockCount}</div>
                  <p className="text-sm text-muted-foreground">Ready to Read</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {books.length > 0 ? (
          <>
            {/* Controls */}
            <section className="py-8">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/30">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-muted-foreground">
                        {books.length} book{books.length !== 1 ? 's' : ''} in your wishlist
                      </p>
                      {inStockCount < books.length && (
                        <Badge variant="outline" className="text-xs">
                          {books.length - inStockCount} out of stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Sort By */}
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-36 bg-background/50 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
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

            {/* Wishlist Items */}
            <section className="py-8">
              <div className="container mx-auto px-4 lg:px-8">
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
                              onClick={() => removeFromWishlist(book.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
                            </Button>
                          </div>

                          {!book.inStock && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <Badge variant="destructive">Out of Stock</Badge>
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

                          <div className="flex items-center justify-between mb-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-muted-gold">{book.price}</span>
                                <span className="text-xs text-muted-foreground line-through">
                                  {book.originalPrice}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground mb-3">
                            Added on {new Date(book.addedDate).toLocaleDateString()}
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              disabled={!book.inStock}
                              className="flex-1 bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              {book.inStock ? 'Add to Cart' : 'Unavailable'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Empty State */
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-muted-gold" />
                </div>
                <h3 className="heading-secondary mb-4">Your library is empty</h3>
                <p className="body-elegant mb-6">
                  Start building your digital library by exploring our vast collection of eBooks and audiobooks. 
                  Get instant access with our subscription plans.
                </p>
                <Button 
                  className="bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy"
                  onClick={() => window.location.href = '/explore'}
                >
                  Explore Books
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}