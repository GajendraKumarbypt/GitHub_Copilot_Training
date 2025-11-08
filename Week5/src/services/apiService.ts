import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { API } from '../constants'

export class ApiError extends Error {
  public status?: number
  public data?: any
  constructor(message: string, status?: number, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export class ApiService {
  client: AxiosInstance

  constructor(baseURL = API.BASE_URL, timeout = API.TIMEOUT_MS, client?: AxiosInstance) {
    this.client = client ?? axios.create({ baseURL, timeout })

    // request interceptor (example: add auth header if needed)
    if (this.client && this.client.interceptors && this.client.interceptors.request && typeof this.client.interceptors.request.use === 'function') {
      this.client.interceptors.request.use((cfg: AxiosRequestConfig) => cfg)
    }

    // response interceptor - normalize errors (guarded)
    if (this.client.interceptors && this.client.interceptors.response && typeof this.client.interceptors.response.use === 'function') {
      this.client.interceptors.response.use(
        (res) => res,
        (error: any) => {
          if (error && error.response) {
            const { status, data } = error.response
            return Promise.reject(new ApiError(data?.message || 'API Error', status, data))
          }
          return Promise.reject(new ApiError(error?.message || 'Network Error'))
        }
      )
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    try {
      const r = await this.client.get<T>(url, config)
      return r.data
    } catch (e) {
      const err: any = e
      if (err && err.response) {
        const { status, data } = err.response
        throw new ApiError(data?.message || 'API Error', status, data)
      }
      throw err instanceof Error ? err : new ApiError(err?.message || 'Unknown Error')
    }
  }

  async post<T = any>(url: string, body?: any, config?: AxiosRequestConfig) {
    try {
      const r = await this.client.post<T>(url, body, config)
      return r.data
    } catch (e) {
      const err: any = e
      if (err && err.response) {
        const { status, data } = err.response
        throw new ApiError(data?.message || 'API Error', status, data)
      }
      throw err instanceof Error ? err : new ApiError(err?.message || 'Unknown Error')
    }
  }

  // add put, delete as needed
}

export function createApiService(baseURL?: string, timeout?: number, client?: AxiosInstance) {
  return new ApiService(baseURL, timeout, client)
}

// Note: we do NOT create a global instance here to avoid side-effects during tests.
export default createApiService
