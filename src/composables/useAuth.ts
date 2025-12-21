export type LoginResponse = { user: any; token: string }
export type SignupResponse = { user: any; token: string }

export function useAuth() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5142/api/auth'

  async function login(payload: { email: string; password: string }): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Login failed')
    }
    return res.json()
  }

  async function signup(payload: {
    name: string
    email: string
    password: string
  }): Promise<SignupResponse> {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Signup failed')
    }
    return res.json()
  }

  return { login, signup }
}
