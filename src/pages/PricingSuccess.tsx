import { Navbar } from "@/components/Navbar";

export default function PricingSuccess() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <h1 className="text-3xl font-semibold mb-4">Thanks for upgrading!</h1>
        <p className="text-muted-foreground">Your payment succeeded. Your account will be marked as Pro within a minute after the webhook processes.</p>
      </div>
    </div>
  )
}


