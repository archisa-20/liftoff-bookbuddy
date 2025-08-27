import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, isMockAuthEnabled, getStoredMockUser, setStoredMockUser, getStoredMockProfile, setStoredMockProfile } from "@/lib/utils";

type Profile = {
  id: string
  is_pro: boolean
  email?: string | null
}

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  profile: Profile | null
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = getSupabaseClient()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let isMounted = true
    const init = async () => {
      try {
        if (isMockAuthEnabled()) {
          const mockUser = getStoredMockUser()
          const mockProfile = getStoredMockProfile()
          if (!isMounted) return
          // @ts-expect-error allow minimal mock user shape
          setUser(mockUser as unknown as User | null)
          setSession(null)
          setProfile(mockProfile)
          setLoading(false)
          return
        }

        const { data } = await supabase.auth.getSession()
        if (!isMounted) return
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.warn('Auth initialization failed, using mock mode:', error)
        const mockUser = getStoredMockUser()
        const mockProfile = getStoredMockProfile()
        // @ts-expect-error allow minimal mock user shape
        setUser(mockUser as unknown as User | null)
        setProfile(mockProfile)
        setLoading(false)
      }
    }
    init()

    try {
      if (isMockAuthEnabled()) {
        return () => {
          isMounted = false
        }
      }
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
      })

      return () => {
        isMounted = false
        authListener.subscription.unsubscribe()
      }
    } catch (error) {
      console.warn('Auth listener setup failed:', error)
      return () => {
        isMounted = false
      }
    }
  }, [supabase])

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null)
      return
    }
    if (isMockAuthEnabled()) {
      const stored = getStoredMockProfile()
      setProfile(stored)
      return
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, is_pro, email")
        .eq("id", user.id)
        .maybeSingle()
      if (error) {
        console.warn("Failed to load profile (mock mode):", error)
        return
      }
      setProfile(data as Profile)
    } catch (error) {
      console.warn("Profile refresh failed (mock mode):", error)
    }
  }

  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }
    refreshProfile()
  }, [user])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    profile,
    refreshProfile,
    signOut: async () => {
      try {
        if (isMockAuthEnabled()) {
          setStoredMockUser(null)
          setStoredMockProfile(null)
        } else {
          await supabase.auth.signOut()
        }
      } catch (error) {
        console.warn("Sign out failed (mock mode):", error)
      }
      setProfile(null)
    },
  }), [user, session, loading, profile, supabase])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}


