/**
 * src/api/orders.js
 * ─────────────────────────────────────────────────────────────
 * Order-specific API helpers.
 * Orders live in their own table (GET/PATCH/DELETE /admin/orders).
 */

import { http } from './httpClient'

/**
 * Public: submit an export order inquiry.
 * Sends to POST /orders.
 *
 * @param {object} data  { product_id, name, email, phone, quantity, address, message }
 */
export function submitOrder(data) {
  return http.post('/orders', data)
}

/**
 * Admin: list orders.
 * @param {{ status?: string, page?: number }} opts
 */
export function getOrders({ status = '', page = 1 } = {}) {
  const params = { page }
  if (status) params.status = status
  return http.get('/admin/orders', { params })
}

/**
 * Admin: get a single order by ID.
 * @param {string|number} id
 */
export function getOrder(id) {
  return http.get(`/admin/orders/${id}`)
}

/**
 * Admin: update order status.
 * @param {string|number} id
 * @param {string} status  one of: new | read | replied | archived
 */
export function updateOrderStatus(id, status) {
  return http.patch(`/admin/orders/${id}`, { status })
}

/**
 * Admin: delete an order.
 * @param {string|number} id
 */
export function deleteOrder(id) {
  return http.delete(`/admin/orders/${id}`)
}
