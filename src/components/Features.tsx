import { BookOpen, Download, Star, Headphones, RefreshCw, Shield } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-muted-gold" />,
      title: "Instant Reading",
      description: "Start reading immediately with our instant access technology. No downloads, no waiting."
    },
    {
      icon: <Download className="h-8 w-8 text-muted-gold" />,
      title: "Offline Library",
      description: "Download books to your personal library and read anywhere, even without internet."
    },
    {
      icon: <Headphones className="h-8 w-8 text-muted-gold" />,
      title: "Audiobooks Included",
      description: "Switch between reading and listening seamlessly with our premium audiobook collection."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-muted-gold" />,
      title: "Sync Across Devices",
      description: "Your reading progress, bookmarks, and library sync perfectly across all your devices."
    },
    {
      icon: <Star className="h-8 w-8 text-muted-gold" />,
      title: "Personalized Recommendations",
      description: "Discover your next favorite book with AI-powered recommendations based on your taste."
    },
    {
      icon: <Shield className="h-8 w-8 text-muted-gold" />,
      title: "Premium Subscription",
      description: "Unlimited access to our entire catalog with flexible monthly and yearly plans."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-hero mb-4">
            Why Choose Our
            <br />
            <span className="gradient-text-mystical">Digital Reading Platform</span>
          </h2>
          <p className="body-elegant text-lg max-w-2xl mx-auto">
            Experience the future of reading with instant access, seamless synchronization, 
            and a library that grows with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-royal p-6 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 group-hover:text-muted-gold transition-colors">
                {feature.title}
              </h3>
              <p className="body-elegant">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};