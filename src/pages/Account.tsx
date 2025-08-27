import { useState } from 'react';
import { User, Heart, ShoppingBag, Settings, Bell, CreditCard, BookOpen, Star, Gift, LogOut, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Sample user data
const userData = {
  name: "Arjun Sharma",
  email: "arjun.sharma@example.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  memberSince: "January 2024",
  totalBooks: 47,
  wishlistCount: 12,
  readingStreak: 15,
  favoriteGenre: "Dark Fantasy",
  bio: "Passionate reader exploring magical realms and dark academia. Always on the hunt for the next great story.",
  location: "Mumbai, India",
  website: "https://arjunsharma.dev",
  socialLinks: {
    twitter: "@arjunsharma",
    instagram: "@arjun.reads",
    goodreads: "arjun-sharma"
  },
  readingPreferences: {
    favoriteAuthors: ["Neil Gaiman", "V.E. Schwab", "Patrick Rothfuss"],
    preferredFormat: "E-book",
    readingGoal: 50,
    currentGoal: 47
  }
};

// Sample order history
const orderHistory = [
  {
    id: "ORD-2024-001",
    date: "2024-01-20",
    status: "Delivered",
    total: "₹1,247",
    items: 3,
    books: ["The Midnight Grimoire", "Crystal Prophecy", "Shadow Realm"]
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-15",
    status: "Processing",
    total: "₹899",
    items: 2,
    books: ["Alchemist's Daughter", "Ember Court Chronicles"]
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-10",
    status: "Delivered",
    total: "₹649",
    items: 2,
    books: ["Velvet Library Secrets", "Philosopher's Codex"]
  }
];

// Sample reading stats
const readingStats = [
  { label: "Books Read", value: userData.totalBooks, icon: BookOpen },
  { label: "Wishlist Items", value: userData.wishlistCount, icon: Heart },
  { label: "Day Streak", value: userData.readingStreak, icon: Star },
  { label: "Reviews Written", value: 23, icon: Edit3 }
];

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newReleases: true,
    orderUpdates: true,
    recommendations: false
  });

  const [userInfo, setUserInfo] = useState(userData);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Profile Header */}
        <section className="py-16 bg-gradient-to-b from-midnight-navy/20 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-muted-gold/30">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-muted-gold/20 to-rich-gold/20">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full border-background"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="heading-primary mb-2">{userInfo.name}</h1>
                <p className="text-muted-foreground mb-2">{userInfo.email}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Badge variant="outline" className="text-xs">
                    Member since {userInfo.memberSince}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-muted-gold/20 text-muted-gold">
                    Premium Reader
                  </Badge>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="border-red-400/50 text-red-400 hover:bg-red-400/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Reading Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {readingStats.map((stat, index) => (
                <Card key={index} className="bg-card/50 border-border/30">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="h-6 w-6 text-muted-gold mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Account Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8 bg-card/30 border border-border/30">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Subscription
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Premium
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your account details and preferences
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Reading Bio</Label>
                      <Input
                        id="bio"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                        disabled={!isEditing}
                        className="bg-background/50"
                        placeholder="Tell us about your reading preferences..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={userInfo.website}
                          onChange={(e) => setUserInfo({...userInfo, website: e.target.value})}
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genre">Favorite Genre</Label>
                      <Input
                        id="genre"
                        value={userInfo.favoriteGenre}
                        onChange={(e) => setUserInfo({...userInfo, favoriteGenre: e.target.value})}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>
                    
                    {/* Reading Preferences */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-gold">Reading Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="readingGoal">Annual Reading Goal</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="readingGoal"
                              type="number"
                              value={userInfo.readingPreferences.readingGoal}
                              onChange={(e) => setUserInfo({
                                ...userInfo, 
                                readingPreferences: {
                                  ...userInfo.readingPreferences,
                                  readingGoal: parseInt(e.target.value)
                                }
                              })}
                              disabled={!isEditing}
                              className="bg-background/50"
                            />
                            <span className="text-sm text-muted-foreground">books</span>
                          </div>
                          <div className="w-full bg-card/30 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-muted-gold to-rich-gold h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(userInfo.readingPreferences.currentGoal / userInfo.readingPreferences.readingGoal) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {userInfo.readingPreferences.currentGoal} of {userInfo.readingPreferences.readingGoal} completed
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferredFormat">Preferred Format</Label>
                          <Input
                            id="preferredFormat"
                            value={userInfo.readingPreferences.preferredFormat}
                            onChange={(e) => setUserInfo({
                              ...userInfo, 
                              readingPreferences: {
                                ...userInfo.readingPreferences,
                                preferredFormat: e.target.value
                              }
                            })}
                            disabled={!isEditing}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-gold">Social Links</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            value={userInfo.socialLinks.twitter}
                            onChange={(e) => setUserInfo({
                              ...userInfo, 
                              socialLinks: {
                                ...userInfo.socialLinks,
                                twitter: e.target.value
                              }
                            })}
                            disabled={!isEditing}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            value={userInfo.socialLinks.instagram}
                            onChange={(e) => setUserInfo({
                              ...userInfo, 
                              socialLinks: {
                                ...userInfo.socialLinks,
                                instagram: e.target.value
                              }
                            })}
                            disabled={!isEditing}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="goodreads">Goodreads</Label>
                          <Input
                            id="goodreads"
                            value={userInfo.socialLinks.goodreads}
                            onChange={(e) => setUserInfo({
                              ...userInfo, 
                              socialLinks: {
                                ...userInfo.socialLinks,
                                goodreads: e.target.value
                              }
                            })}
                            disabled={!isEditing}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription" className="space-y-6">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle>Subscription Status</CardTitle>
                    <CardDescription>
                      Manage your premium digital library subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div className="p-4 bg-gradient-to-r from-muted-gold/10 to-rich-gold/10 rounded-lg border border-muted-gold/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-muted-gold">Premium Monthly</h4>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Unlimited access to our entire digital library
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">₹499/month</span>
                          <span className="text-sm text-muted-foreground">Renews on Feb 15, 2024</span>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="p-4 bg-card/30 rounded-lg border border-border/30">
                        <h4 className="font-semibold mb-3">Payment Method</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>

                      {/* Reading Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-card/30 rounded-lg">
                          <div className="text-2xl font-bold text-muted-gold">47</div>
                          <p className="text-sm text-muted-foreground">Books Read</p>
                        </div>
                        <div className="text-center p-4 bg-card/30 rounded-lg">
                          <div className="text-2xl font-bold text-muted-gold">156</div>
                          <p className="text-sm text-muted-foreground">Hours Reading</p>
                        </div>
                        <div className="text-center p-4 bg-card/30 rounded-lg">
                          <div className="text-2xl font-bold text-muted-gold">12</div>
                          <p className="text-sm text-muted-foreground">This Month</p>
                        </div>
                      </div>

                      {/* Billing History */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Billing History</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                            <div>
                              <p className="font-medium">Premium Monthly</p>
                              <p className="text-sm text-muted-foreground">January 15, 2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹499</p>
                              <p className="text-sm text-green-500">Paid</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                            <div>
                              <p className="font-medium">Premium Monthly</p>
                              <p className="text-sm text-muted-foreground">December 15, 2023</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹499</p>
                              <p className="text-sm text-green-500">Paid</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subscription Actions */}
                      <div className="flex gap-3">
                        <Button variant="outline">
                          Change Plan
                        </Button>
                        <Button variant="outline">
                          Manage Payment
                        </Button>
                        <Button variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-400/10">
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current Payment Methods */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Saved Payment Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border/30">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/25 • Default</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-400/10">Remove</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border/30">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">MC</span>
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 8888</p>
                              <p className="text-sm text-muted-foreground">Expires 08/26</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-400/10">Remove</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add New Payment Method
                      </Button>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Billing Address</h4>
                      <div className="p-4 bg-card/30 rounded-lg border border-border/30">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Arjun Sharma</p>
                            <p className="text-sm text-muted-foreground">123 Bookworm Lane</p>
                            <p className="text-sm text-muted-foreground">Mumbai, Maharashtra 400001</p>
                            <p className="text-sm text-muted-foreground">India</p>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>

                    {/* Payment Security */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Payment Security</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-400">SSL Encryption</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-400">PCI DSS Compliant</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what updates you'd like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">
                            {key === 'emailUpdates' && 'Email Updates'}
                            {key === 'newReleases' && 'New Book Releases'}
                            {key === 'orderUpdates' && 'Order Status Updates'}
                            {key === 'recommendations' && 'Personalized Recommendations'}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {key === 'emailUpdates' && 'Receive important account updates via email'}
                            {key === 'newReleases' && 'Get notified about new books in your favorite genres'}
                            {key === 'orderUpdates' && 'Track your order status and delivery updates'}
                            {key === 'recommendations' && 'Receive book suggestions based on your reading history'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, [key]: checked})
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage Payment Methods
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="premium" className="space-y-6">
                <Card className="bg-gradient-to-br from-muted-gold/10 to-rich-gold/10 border-muted-gold/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-muted-gold" />
                      Premium Membership
                    </CardTitle>
                    <CardDescription>
                      You're currently on the Premium plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Current Plan</h4>
                        <p className="text-sm text-muted-foreground">Premium Reader</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Next Billing</h4>
                        <p className="text-sm text-muted-foreground">February 15, 2024</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Premium Benefits</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Unlimited access to entire digital library</li>
                        <li>• Premium audiobook collection included</li>
                        <li>• Offline reading on all devices</li>
                        <li>• Early access to new releases</li>
                        <li>• Priority customer support</li>
                        <li>• Ad-free reading experience</li>
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="outline">
                        Manage Subscription
                      </Button>
                      <Button variant="outline">
                        View Invoice History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}