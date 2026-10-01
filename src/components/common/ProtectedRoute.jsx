/**
 * ProtectedRoute
 * ─────────────────────────────────────────────────────────────
 * Wraps any admin route. If no valid token is found in localStorage,
 * redirects to /login immediately.
 *
 * Usage in App.jsx:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 */

import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../../api'

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
