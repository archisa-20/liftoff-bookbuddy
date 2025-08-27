import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  // touch the hook to ensure provider is included and to allow future personalization
  const _auth = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BookGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;