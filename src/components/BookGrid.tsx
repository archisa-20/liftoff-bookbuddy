import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookCard } from './BookCard';

// Sample book data - in a real app, this would come from an API
const sampleBooks = [
  {
    id: 1,
    title: "The Midnight Grimoire",
    author: "Evangeline Thornfield",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    rating: 4.8,
    price: "₹199/month",
    genre: "Dark Fantasy",
    isWishlisted: true,
    isAvailable: true,
    hasAudio: true
  },
  {
    id: 2,
    title: "Secrets of the Velvet Library",
    author: "Cornelius Blackwood",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    rating: 4.6,
    price: "₹149/month",
    genre: "Mystery",
    isWishlisted: false,
    isAvailable: true,
    hasAudio: false
  },
  {
    id: 3,
    title: "The Alchemist's Daughter",
    author: "Seraphina Vale",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    rating: 4.9,
    price: "₹249/month",
    genre: "Historical Fiction",
    isWishlisted: false,
    isAvailable: true,
    hasAudio: true
  },
  {
    id: 4,
    title: "Chronicles of the Ember Court",
    author: "Magnus Drakewood",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    rating: 4.7,
    price: "₹299/month",
    genre: "Epic Fantasy",
    isWishlisted: true,
    isAvailable: false,
    hasAudio: true
  },
  {
    id: 5,
    title: "The Philosopher's Stone Codex",
    author: "Arabella Mystique",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    rating: 4.5,
    price: "₹179/month",
    genre: "Philosophy",
    isWishlisted: false,
    isAvailable: true,
    hasAudio: false
  },
  {
    id: 6,
    title: "Whispers from the Shadow Realm",
    author: "Damien Ashcroft",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    rating: 4.4,
    price: "₹189/month",
    genre: "Horror",
    isWishlisted: false,
    isAvailable: true,
    hasAudio: true
  }
];

export const BookGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const genres = [...new Set(sampleBooks.map(book => book.genre))];

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-primary mb-4">
            Featured in Your Digital Library
          </h2>
          <p className="body-elegant max-w-2xl mx-auto">
            Start reading instantly with our curated collection of premium eBooks and audiobooks. 
            New titles added every week with unlimited access.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
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
                  <SelectItem value="newest">Newest</SelectItem>
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Books Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredBooks.map((book) => (
            <div key={book.id} className="animate-fade-in">
              <BookCard {...book} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="heading-secondary mb-2">No books found</h3>
            <p className="body-elegant">
              Try adjusting your search terms or filters to discover more amazing digital books.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};