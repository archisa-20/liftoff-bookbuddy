import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Crown, Sparkles, Zap, CreditCard, Lock, Shield, Star, BookOpen, Headphones, Download, Clock } from 'lucide-react';
import { isMockAuthEnabled, getStoredMockUser, getStoredMockProfile, setStoredMockProfile } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "Free Reader",
    price: "₹0",
    period: "forever",
    description: "Perfect for casual readers",
    features: [
      "Access to 100+ public books",
      "Basic reading progress tracking",
      "Create personal wishlist",
      "Standard customer support"
    ],
    limitations: [
      "Limited to public domain books",
      "Basic reading analytics",
      "No offline access"
    ],
    popular: false,
    icon: BookOpen,
    color: "from-gray-500/20 to-gray-600/20",
    borderColor: "border-gray-500/30"
  },
  {
    name: "Premium Reader",
    price: "₹799",
    period: "per month",
    description: "For serious book lovers",
    features: [
      "Unlimited access to entire library",
      "Premium audiobook collection",
      "Offline reading on all devices",
      "Advanced reading analytics",
      "Priority customer support",
      "Ad-free reading experience",
      "Early access to new releases"
    ],
    limitations: [],
    popular: true,
    icon: Crown,
    color: "from-muted-gold/20 to-rich-gold/20",
    borderColor: "border-muted-gold/30"
  },
  {
    name: "Family Plan",
    price: "₹1,499",
    period: "per month",
    description: "Share the magic with your family",
    features: [
      "Everything in Premium",
      "Up to 6 family members",
      "Individual reading profiles",
      "Family reading challenges",
      "Parental controls",
      "Shared family library",
      "Family reading statistics"
    ],
    limitations: [],
    popular: false,
    icon: Sparkles,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30"
  }
];

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: CreditCard },
  { id: 'apple', label: 'Apple Pay', icon: CreditCard },
  { id: 'google', label: 'Google Pay', icon: CreditCard }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const navigate = useNavigate();

  const getLink = (envKey: string) => (import.meta.env[envKey as keyof ImportMetaEnv] as string) || "#"

  const handlePlanSelect = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Stripe or other payment processor
    if (isMockAuthEnabled()) {
      const user = getStoredMockUser()
      if (user) {
        const profile = getStoredMockProfile()
        const updated = { id: user.id, email: user.email, is_pro: true }
        setStoredMockProfile(updated)
        // also update map for persistence
        const profilesRaw = localStorage.getItem('mock_profiles')
        const profiles: Record<string, { id: string; email: string; is_pro: boolean }> = profilesRaw ? JSON.parse(profilesRaw) : {}
        profiles[user.id] = updated
        localStorage.setItem('mock_profiles', JSON.stringify(profiles))
      }
      setShowPaymentForm(false)
      navigate('/pricing/success')
      return
    }
    console.log('Processing payment for:', selectedPlan.name, cardDetails);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-midnight-navy/20 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="heading-hero mb-4">Choose Your Reading Journey</h1>
            <p className="body-elegant max-w-2xl mx-auto mb-8">
              Unlock unlimited access to magical worlds with our premium digital library. 
              Choose the plan that fits your reading lifestyle.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Secure Payment
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Lock className="h-3 w-3 mr-1" />
                SSL Encrypted
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                30-Day Money Back
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative bg-card/50 border-border/30 hover:border-border/50 transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-muted-gold/50 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-muted-gold to-rich-gold text-midnight-navy font-semibold">
                        <Crown className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="h-8 w-8 text-muted-gold" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-gold">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-4 h-4 mt-0.5 flex-shrink-0">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-muted-gold to-rich-gold text-midnight-navy hover:from-muted-gold/90 hover:to-rich-gold/90' 
                          : ''
                      }`}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {plan.price === "₹0" ? "Get Started Free" : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Gateway Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-gold" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  Complete your {selectedPlan.name} subscription
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Plan Summary */}
                <div className="p-4 bg-gradient-to-r from-muted-gold/10 to-rich-gold/10 rounded-lg border border-muted-gold/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{selectedPlan.name}</h4>
                    <span className="text-lg font-bold">{selectedPlan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedPlan.period}</p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <Tabs value={selectedPayment} onValueChange={setSelectedPayment}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                              className="bg-background/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              className="bg-background/50"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="text-center py-8">
                      <div className="space-y-4">
                        <CreditCard className="h-12 w-12 mx-auto text-muted-gold" />
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Security Notice */}
                <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-green-400">
                    <p className="font-medium">Secure Payment</p>
                    <p>Your payment information is encrypted and secure. We never store your card details.</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowPaymentForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-muted-gold to-rich-gold text-midnight-navy hover:from-muted-gold/90 hover:to-rich-gold/90"
                    onClick={handlePaymentSubmit}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Pay {selectedPlan.price}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Comparison */}
        <section className="py-16 bg-gradient-to-t from-midnight-navy/20 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="heading-primary text-center mb-12">Why Choose BookBuddy Premium?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 flex items-center justify-center">
                  <Headphones className="h-8 w-8 text-muted-gold" />
                </div>
                <h3 className="heading-secondary">Premium Audiobooks</h3>
                <p className="body-elegant">Access our exclusive collection of professionally narrated audiobooks.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 flex items-center justify-center">
                  <Download className="h-8 w-8 text-muted-gold" />
                </div>
                <h3 className="heading-secondary">Offline Reading</h3>
                <p className="body-elegant">Download books and read anywhere, even without internet connection.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-muted-gold/20 to-rich-gold/20 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-muted-gold" />
                </div>
                <h3 className="heading-secondary">Early Access</h3>
                <p className="body-elegant">Be the first to read new releases and exclusive content.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


