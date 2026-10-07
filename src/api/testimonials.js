/**
 * src/api/testimonials.js
 * ─────────────────────────────────────────────────────────────
 * Public + Admin Testimonials API methods.
 *
 * Public endpoint  (no auth):
 *   GET  /testimonials           → { data: [ { id, name, role, company, avatar, quote }, … ] }
 *
 * Admin endpoints  (Bearer token required):
 *   GET    /admin/testimonials          → array of all testimonials (including inactive)
 *   POST   /admin/testimonials          → create → 201 + testimonial
 *   GET    /admin/testimonials/:id      → single testimonial
 *   PUT    /admin/testimonials/:id      → full update
 *   PATCH  /admin/testimonials/:id      → partial update
 *   DELETE /admin/testimonials/:id      → 204 No Content
 */

import { http } from './httpClient'

// ─── Public ───────────────────────────────────────────────────

/**
 * Fetch active, ordered testimonials for the public homepage.
 * @returns {Promise<{ data: Array }>}
 */
export function getTestimonials() {
  return http.get('/testimonials')
}

// ─── Admin ────────────────────────────────────────────────────

/**
 * List all testimonials (including inactive) – admin only.
 * @returns {Promise<Array>}
 */
export function adminGetTestimonials() {
  return http.get('/admin/testimonials')
}

/**
 * Get a single testimonial by id – admin only.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export function adminGetTestimonial(id) {
  return http.get(`/admin/testimonials/${id}`)
}

/**
 * Create a new testimonial – admin only.
 * Required fields: name, quote
 * Optional: role, company, avatar (storage path from /admin/uploads), sort_order, is_active
 * @param {Object} data
 * @returns {Promise<Object>}  201 + created testimonial
 */
export function adminCreateTestimonial(data) {
  return http.post('/admin/testimonials', data)
}

/**
 * Fully replace a testimonial (PUT) – admin only.
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export function adminUpdateTestimonial(id, data) {
  return http.put(`/admin/testimonials/${id}`, data)
}

/**
 * Partially update a testimonial (PATCH) – admin only.
 * Only send the fields you want to change.
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export function adminPatchTestimonial(id, data) {
  return http.patch(`/admin/testimonials/${id}`, data)
}

/**
 * Delete a testimonial – admin only.
 * @param {number} id
 * @returns {Promise<null>}  204 No Content
 */
export function adminDeleteTestimonial(id) {
  return http.delete(`/admin/testimonials/${id}`)
}

/**
 * Upload an image file for testimonial avatar / assets – admin only.
 * @param {File} file
 * @returns {Promise<{ path: string, url: string }>}
 */
export function adminUploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  return http.post('/admin/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
