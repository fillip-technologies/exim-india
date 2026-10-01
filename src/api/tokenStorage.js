/**
 * Token Storage Helpers
 * ─────────────────────────────────────────────────────────────
 * Centralize all localStorage read/write for the Sanctum token
 * and admin user so every part of the app reads from one place.
 */

const TOKEN_KEY = 'admin_token'
const USER_KEY  = 'admin_user'

/** Persist token + user after a successful login response */
export function saveAuthData(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/** Read the stored Bearer token (null if not logged in) */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/** Read the stored admin user object (null if not logged in) */
export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Clear everything — called on logout */
export function clearAuthData() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/** Quick check: is a token present? */
export function isAuthenticated() {
  return Boolean(getToken())
}
