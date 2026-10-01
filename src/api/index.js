/**
 * src/api/index.js
 * ─────────────────────────────────────────────────────────────
 * Public barrel export for the entire API layer.
 *
 * Usage in any component:
 *   import { login, logout, getMe }      from '../api'
 *   import { isAuthenticated, getUser }  from '../api'
 *   import { ApiError }                  from '../api'
 *   import axiosInstance                 from '../api/httpClient'  // raw instance if needed
 */

// Config
export { API_BASE_URL }                         from './config'

// Token helpers
export {
  saveAuthData,
  getToken,
  getUser,
  clearAuthData,
  isAuthenticated,
}                                               from './tokenStorage'

// Axios client + error class
export { http, ApiError }                       from './httpClient'
export { default as axiosInstance }             from './httpClient'

// Auth endpoints
export { login, logout, getMe }                 from './auth'

// Contacts endpoints
export {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
}                                               from './contacts'
