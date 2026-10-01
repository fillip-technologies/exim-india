/**
 * Auth API — Axios version
 * ─────────────────────────────────────────────────────────────
 * Backend contract (AuthController + api.php):
 *
 *  POST /api/admin/login          (throttle: 10/min, public)
 *    Body    : { email: string, password: string }
 *    200 OK  : { token: string, user: { id, name, email } }
 *    422     : { message: string, errors: { email: string[] } }
 *    429     : { message: 'Too Many Attempts.' }
 *
 *  POST /api/admin/logout         (auth:sanctum + admin)
 *    Header  : Authorization: Bearer <token>
 *    204     : (no body)
 *
 *  GET  /api/admin/me             (auth:sanctum + admin)
 *    Header  : Authorization: Bearer <token>
 *    200 OK  : { id, name, email }
 *    401     : { message: 'Unauthenticated.' }
 */

import { http }                        from './httpClient'
import { saveAuthData, clearAuthData } from './tokenStorage'

// ─── login ───────────────────────────────────────────────────
/**
 * Authenticate an admin user via POST /api/admin/login.
 * Automatically persists token + user to localStorage on success.
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: { id: number, name: string, email: string } }}
 * @throws  {ApiError}
 */
export async function login(email, password) {
  const data = await http.post('/admin/login', { email, password })
  saveAuthData(data.token, data.user)
  return data
}

// ─── logout ──────────────────────────────────────────────────
/**
 * Revoke the Sanctum token on the server, then wipe localStorage.
 * Safe to call even if the token is already expired — always clears.
 */
export async function logout() {
  try {
    await http.post('/admin/logout')
  } catch {
    // Silently ignore — token may be expired; local clear still happens
  } finally {
    clearAuthData()
  }
}

// ─── me ──────────────────────────────────────────────────────
/**
 * Fetch the currently authenticated admin from GET /api/admin/me.
 * Use this to verify the stored token is still valid on app boot.
 *
 * @returns {{ id: number, name: string, email: string }}
 * @throws  {ApiError}  (401 when token is invalid / expired)
 */
export async function getMe() {
  return http.get('/admin/me')
}
