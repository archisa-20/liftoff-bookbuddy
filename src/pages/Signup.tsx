import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseClient, isMockAuthEnabled, setStoredMockUser, setStoredMockProfile } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";

export default function Signup() {
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
      const stored = localStorage.getItem('mock_users')
      const users: Array<{ email: string; password: string; id: string }> = stored ? JSON.parse(stored) : []
      if (users.find(u => u.email === email)) {
        setLoading(false)
        setError('Email already registered')
        return
      }
      const id = `user_${Math.random().toString(36).slice(2)}`
      const newUsers = [...users, { email, password, id }]
      localStorage.setItem('mock_users', JSON.stringify(newUsers))
      // profile store for quick retrieval
      const profilesRaw = localStorage.getItem('mock_profiles')
      const profiles: Record<string, { id: string; email: string; is_pro: boolean }> = profilesRaw ? JSON.parse(profilesRaw) : {}
      profiles[id] = { id, email, is_pro: false }
      localStorage.setItem('mock_profiles', JSON.stringify(profiles))
      setStoredMockUser({ id, email })
      setStoredMockProfile({ id, email, is_pro: false })
      setLoading(false)
      navigate("/dashboard")
      return
    }
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    if (data.user) {
      // Create profile row
      await supabase.from("profiles").upsert({ id: data.user.id, email, is_pro: false })
    }
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
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
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">Have an account? <Link className="underline" to="/login">Log in</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


