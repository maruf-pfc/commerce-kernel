import axios, { type AxiosRequestConfig } from "axios"
import { env } from "./env"
import type { ApiEnvelope } from "./types"

// Holds a function that returns the auth token (e.g., from Clerk)
let tokenGetter: (() => Promise<string | null>) | null = null

// Allows setting a token provider dynamically (used after auth initialization)
export function setApiTokenGetter(getter: () => Promise<string | null>) {
  tokenGetter = getter
}

// Create a centralized axios instance
const api = axios.create({
  baseURL: env.backendUrl, // backend base URL from env
  withCredentials: false, // no cookies, using token-based auth
})

// Attach auth token to every request if available
api.interceptors.request.use(async (config) => {
  if (!tokenGetter) return config

  const token = await tokenGetter()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Normalize error messages from different sources (Axios / JS / fallback)
function getErrorMsg(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "Request failed"
    )
  }

  if (error instanceof Error) return error.message

  return "Something went wrong!!! Please try again"
}

// Generic GET request handler
export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await api.get<ApiEnvelope<T>>(url, config)

    // Validate API envelope response
    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.[0]?.message || "Request failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

// Generic POST request handler
export async function apiPost<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.post<ApiEnvelope<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.[0]?.message || "Request failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

// Generic PUT request handler (full update)
export async function apiPut<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.put<ApiEnvelope<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.[0]?.message || "Request failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

// Generic PATCH request handler (partial update)
export async function apiPatch<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.patch<ApiEnvelope<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.[0]?.message || "Request failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

// Generic DELETE request handler
export async function apiDelete<TResponse>(
  url: string,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.delete<ApiEnvelope<TResponse>>(url, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.[0]?.message || "Request failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}
