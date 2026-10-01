/**
 * API Configuration
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for the Laravel backend base URL.
 * Override in .env.local:  VITE_API_BASE_URL=http://your-host/api
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
