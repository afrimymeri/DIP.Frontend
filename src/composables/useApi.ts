export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5142'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  headers?: Record<string, string>
  token?: string
}

async function handleResponse<T>(res: Response, errorMessage: string): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.message || errorMessage)
  }
  return res.json()
}

export function useApi() {
  async function request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`
    }

    const config: RequestInit = { method, headers }
    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    const res = await fetch(`${API_URL}${endpoint}`, config)
    return handleResponse<T>(res, `${method} ${endpoint} failed`)
  }

  return {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('GET', endpoint, undefined, options),

    post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('POST', endpoint, body, options),

    put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('PUT', endpoint, body, options),

    patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('PATCH', endpoint, body, options),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('DELETE', endpoint, undefined, options),
  }
}
