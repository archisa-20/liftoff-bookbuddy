import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Supabase client singleton
import { createClient } from '@supabase/supabase-js'

let supabaseClientSingleton: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (supabaseClientSingleton) return supabaseClientSingleton
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  if (!supabaseUrl || !supabaseAnonKey) {
    // Create a mock client for development when env vars are missing
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY - using mock client')
    supabaseClientSingleton = createClient('https://mock.supabase.co', 'mock-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
    return supabaseClientSingleton
  }
  supabaseClientSingleton = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
  return supabaseClientSingleton
}

// Mock auth helpers for prototyping when Supabase env vars are missing
export const isMockAuthEnabled = (): boolean => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  return !supabaseUrl || !supabaseAnonKey
}

const MOCK_AUTH_KEY = 'mock_auth_user'
const MOCK_PROFILE_KEY = 'mock_auth_profile'

export type MockUser = { id: string; email: string }
export type MockProfile = { id: string; email: string; is_pro: boolean }

export const getStoredMockUser = (): MockUser | null => {
  try {
    const raw = localStorage.getItem(MOCK_AUTH_KEY)
    return raw ? JSON.parse(raw) as MockUser : null
  } catch {
    return null
  }
}

export const setStoredMockUser = (user: MockUser | null) => {
  if (!user) {
    localStorage.removeItem(MOCK_AUTH_KEY)
    return
  }
  localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(user))
}

export const getStoredMockProfile = (): MockProfile | null => {
  try {
    const raw = localStorage.getItem(MOCK_PROFILE_KEY)
    return raw ? JSON.parse(raw) as MockProfile : null
  } catch {
    return null
  }
}

export const setStoredMockProfile = (profile: MockProfile | null) => {
  if (!profile) {
    localStorage.removeItem(MOCK_PROFILE_KEY)
    return
  }
  localStorage.setItem(MOCK_PROFILE_KEY, JSON.stringify(profile))
}

// Default demo credentials for quick testing in mock mode
export const DEMO_EMAIL = 'demo@bookbuddy.test'
export const DEMO_PASSWORD = 'demo1234'
