/**
 * Axios HTTP Client
 * ─────────────────────────────────────────────────────────────
 * Creates a configured Axios instance that:
 *  1. Points to the Laravel backend base URL
 *  2. Always sends/accepts JSON
 *  3. Attaches the Sanctum Bearer token on every request via
 *     a request interceptor (reads from tokenStorage)
 *  4. Normalises every error into a typed ApiError via a
 *     response interceptor so callers get { message, status, errors }
 */

import axios from 'axios'
import { API_BASE_URL } from './config'
import { getToken } from './tokenStorage'

// ─── Structured error class ───────────────────────────────────
export class ApiError extends Error {
  /**
   * @param {string} message  Human-readable summary
   * @param {number} status   HTTP status code (0 = network failure)
   * @param {object} errors   Laravel validation errors map
   */
  constructor(message, status = 0, errors = {}) {
    super(message)
    this.name   = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

// ─── Axios instance ───────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
  timeout: 15000, // 15 s
})

// ─── Request interceptor: attach Bearer token ─────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response interceptor: normalise errors ───────────────────
axiosInstance.interceptors.response.use(
  // Success — just pass the response through
  (response) => response,

  // Error — convert Axios error → ApiError
  (error) => {
    if (error.response) {
      // Server replied with a non-2xx status
      const { status, data } = error.response
      const message =
        data?.errors?.email?.[0] || // 422 Laravel validation
        data?.message ||             // General Laravel message
        `Request failed (${status})`
      const errors = data?.errors || {}
      return Promise.reject(new ApiError(message, status, errors))
    }

    if (error.request) {
      // Request was made but no response received (server down / network issue)
      return Promise.reject(
        new ApiError(
          'Cannot reach the server. Make sure the Laravel backend is running.',
          0,
        ),
      )
    }

    // Something else went wrong building the request
    return Promise.reject(new ApiError(error.message || 'Unexpected error', 0))
  },
)

// ─── Convenience http object ──────────────────────────────────
export const http = {
  get:    (url, config = {})       => axiosInstance.get(url, config).then(r => r.data),
  post:   (url, data, config = {}) => axiosInstance.post(url, data, config).then(r => r.data),
  put:    (url, data, config = {}) => axiosInstance.put(url, data, config).then(r => r.data),
  patch:  (url, data, config = {}) => axiosInstance.patch(url, data, config).then(r => r.data),
  delete: (url, config = {})       => axiosInstance.delete(url, config).then(r => r.data),
}

export default axiosInstance
