import { Heart, Star, BookOpen, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  rating: number;
  price: string;
  genre: string;
  isWishlisted?: boolean;
  isAvailable?: boolean;
  hasAudio?: boolean;
}

export const BookCard = ({ 
  title, 
  author, 
  cover, 
  rating, 
  price, 
  genre, 
  isWishlisted = false,
  isAvailable = true,
  hasAudio = false
}: BookCardProps) => {
  return (
    <div className="group card-royal bg-card/60 backdrop-blur-sm p-4 hover:bg-card/80 transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={cover}
          alt={`${title} book cover`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-midnight-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Button 
              size="sm"
              className="bg-muted-gold/90 hover:bg-muted-gold text-midnight-navy font-medium"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Preview
            </Button>
            {hasAudio && (
              <Button 
                size="sm"
                variant="outline"
                className="border-muted-gold/50 text-muted-gold bg-background/20 backdrop-blur-sm"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
            isWishlisted 
              ? 'bg-muted-gold/20 text-muted-gold' 
              : 'bg-background/20 text-muted-foreground hover:text-muted-gold hover:bg-muted-gold/20'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>

        {/* Genre Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-aubergine/80 text-warm-cream rounded-full backdrop-blur-sm">
            {genre}
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="space-y-2">
        <h3 className="font-playfair text-lg font-semibold text-foreground line-clamp-1 group-hover:text-muted-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground">by {author}</p>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? 'text-muted-gold fill-current'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-semibold text-muted-gold text-lg">
              {price}
            </span>
            {!isAvailable && (
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            )}
          </div>
          <div className="flex gap-1">
            <Button 
              size="sm"
              disabled={!isAvailable}
              className="bg-gradient-to-r from-muted-gold to-rich-gold hover:from-rich-gold hover:to-warm-gold text-midnight-navy text-xs px-3 disabled:opacity-50"
            >
              <Download className="mr-1 h-3 w-3" />
              {isAvailable ? 'Read Now' : 'Soon'}
            </Button>
            {hasAudio && isAvailable && (
              <Button 
                size="sm"
                variant="outline"
                className="border-muted-gold/30 text-muted-gold hover:bg-muted-gold hover:text-midnight-navy text-xs px-2"
              >
                <Play className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};