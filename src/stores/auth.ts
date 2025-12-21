import { defineStore } from 'pinia'
import { useAuth } from '../composables/useAuth'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { login: apiLogin, signup: apiSignup } = useAuth()

  async function login(credentials: { email: string; password: string }) {
    loading.value = true
    error.value = null

    try {
      const res = await apiLogin(credentials)
      user.value = res.user
      token.value = res.token
      localStorage.setItem('token', res.token)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Login failed'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signup(payload: { name: string; email: string; password: string }) {
    loading.value = true
    error.value = null
    try {
      const res = await apiSignup(payload)
      user.value = res.user
      token.value = res.token
      localStorage.setItem('token', res.token)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Signup failed'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, loading, error, login, signup, logout }
})
