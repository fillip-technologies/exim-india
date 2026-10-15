/**
 * src/api/orders.js
 * ─────────────────────────────────────────────────────────────
 * Order-specific API helpers.
 * Orders are stored in the backend as contacts with type = "order".
 * No backend changes required.
 */

import { http } from './httpClient'

/**
 * Public: submit an export order inquiry.
 * Sends to POST /contact with type = 'order'.
 *
 * @param {object} data  { name, email, phone, product, quantity, address, message }
 */
export function submitOrder(data) {
  return http.post('/contact', {
    ...data,
    type: 'order',
  })
}

/**
 * Admin: list orders (contacts filtered by type=order).
 * @param {{ status?: string, page?: number }} opts
 */
export function getOrders({ status = '', page = 1 } = {}) {
  const params = { page, type: 'order' }
  if (status) params.status = status
  return http.get('/admin/contacts', { params })
}

/**
 * Admin: get a single order by ID.
 * @param {string|number} id
 */
export function getOrder(id) {
  return http.get(`/admin/contacts/${id}`)
}

/**
 * Admin: update order status.
 * @param {string|number} id
 * @param {string} status  one of: new | read | replied | archived
 */
export function updateOrderStatus(id, status) {
  return http.patch(`/admin/contacts/${id}`, { status })
}

/**
 * Admin: delete an order.
 * @param {string|number} id
 */
export function deleteOrder(id) {
  return http.delete(`/admin/contacts/${id}`)
}
