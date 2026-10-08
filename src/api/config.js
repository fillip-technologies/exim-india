/**
 * API Configuration
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for the Laravel backend base URL.
 * Set via environment variable VITE_API_BASE_URL in .env:
 * VITE_API_BASE_URL=https://eximbackend.fillipsoftware.com/api
 */

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'https://eximbackend.fillipsoftware.com/api'

// Normalize URL: remove any trailing slashes and ensure /api path suffix
const normalizeBaseUrl = (url) => {
  if (!url) return 'https://eximbackend.fillipsoftware.com/api'
  let cleaned = url.trim().replace(/\/+$/, '')
  if (!cleaned.endsWith('/api')) {
    cleaned = `${cleaned}/api`
  }
  return cleaned
}

export const API_BASE_URL = normalizeBaseUrl(rawBaseUrl)
