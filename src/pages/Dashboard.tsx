import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-semibold mb-6">Welcome, {user.email}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Access</CardTitle>
              <CardDescription>Everyone can use these features</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Basic dashboard content...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pro Features</CardTitle>
              <CardDescription>Restricted to Pro users</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.is_pro ? (
                <div className="space-y-2">
                  <p className="text-sm">Thanks for being Pro!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Unlock advanced features with Pro.</p>
                  <Button asChild>
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


