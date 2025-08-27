import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseClient, isMockAuthEnabled, DEMO_EMAIL, DEMO_PASSWORD, setStoredMockUser, setStoredMockProfile } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const supabase = getSupabaseClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (isMockAuthEnabled()) {
      // Simple mock check with demo credentials and any signup-created credentials saved in localStorage
      const isDemo = email === DEMO_EMAIL && password === DEMO_PASSWORD
      const stored = localStorage.getItem('mock_users')
      const users: Array<{ email: string; password: string; id: string }> = stored ? JSON.parse(stored) : []
      const existing = users.find(u => u.email === email && u.password === password)
      if (!isDemo && !existing) {
        setLoading(false)
        setError('Invalid email or password')
        return
      }
      const user = existing ?? { email: DEMO_EMAIL, password: DEMO_PASSWORD, id: 'demo-user-id' }
      setStoredMockUser({ id: user.id, email: user.email })
      const existingProfile = localStorage.getItem('mock_profiles')
      const profiles: Record<string, { id: string; email: string; is_pro: boolean }> = existingProfile ? JSON.parse(existingProfile) : {}
      const profile = profiles[user.id] ?? { id: user.id, email: user.email, is_pro: false }
      setStoredMockProfile(profile)
      setLoading(false)
      navigate("/dashboard")
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
              {isMockAuthEnabled() && (
                <p className="text-xs text-muted-foreground mt-2">Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}</p>
              )}
            </form>
            <p className="text-sm text-muted-foreground mt-4">No account? <Link className="underline" to="/signup">Sign up</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


