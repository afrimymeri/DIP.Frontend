import { defineStore } from 'pinia'
import { useAuth, type UserInfo } from '../composables/useAuth'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  const { login: apiLogin, register: apiRegister, getMe, refresh, revoke } = useAuth()

  function saveTokens(access: string, refreshTkn: string) {
    accessToken.value = access
    refreshToken.value = refreshTkn
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refreshTkn)
  }

  function clearAuth() {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  async function initialize() {
    const storedAccess = localStorage.getItem('accessToken')
    const storedRefresh = localStorage.getItem('refreshToken')

    if (!storedAccess || !storedRefresh) {
      clearAuth()
      return
    }

    accessToken.value = storedAccess
    refreshToken.value = storedRefresh

    try {
      user.value = await getMe(storedAccess)
    } catch {
      try {
        const res = await refresh(storedRefresh)
        saveTokens(res.accessToken, res.refreshToken)
        user.value = await getMe(res.accessToken)
      } catch {
        clearAuth()
      }
    }
  }

  async function login(credentials: { email: string; password: string }) {
    loading.value = true
    error.value = null

    try {
      const res = await apiLogin(credentials)
      saveTokens(res.accessToken, res.refreshToken)
      user.value = await getMe(res.accessToken)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signup(payload: { name: string; email: string; password: string }) {
    loading.value = true
    error.value = null
    try {
      const res = await apiRegister(payload)
      saveTokens(res.accessToken, res.refreshToken)
      user.value = await getMe(res.accessToken)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Signup failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    if (accessToken.value && refreshToken.value) {
      try {
        await revoke(accessToken.value, refreshToken.value)
      } catch {
        // Ignore revoke errors, clear local state anyway
      }
    }
    clearAuth()
  }

  return {
    user,
    accessToken,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout,
  }
})
