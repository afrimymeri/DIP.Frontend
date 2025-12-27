export interface AuthResponse {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
  refreshTokenExpiresAt: string
}

export interface UserInfo {
  id: number
  name: string
  email: string
  role: string
  emailConfirmed: boolean
  lastLoginAt: string | null
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5142'

async function handleResponse<T>(res: Response, errorMessage: string): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.message || errorMessage)
  }
  return res.json()
}

export function useAuth() {
  async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResponse<AuthResponse>(res, 'Login failed')
  }

  async function register(payload: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResponse<AuthResponse>(res, 'Registration failed')
  }

  async function getMe(accessToken: string): Promise<UserInfo> {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return handleResponse<UserInfo>(res, 'Failed to get user info')
  }

  async function refresh(refreshToken: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    return handleResponse<AuthResponse>(res, 'Token refresh failed')
  }

  async function revoke(accessToken: string, refreshToken: string): Promise<void> {
    await fetch(`${API_URL}/api/auth/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    })
  }

  return { login, register, getMe, refresh, revoke }
}
