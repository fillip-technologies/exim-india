/**
 * src/api/contacts.js
 * Admin Contacts API methods.
 */

import { http } from './httpClient'

export function submitContact(data) {
  return http.post('/contact', data)
}

export function getContacts({ type = '', status = '', page = 1 } = {}) {
  const params = { page }
  if (type)   params.type   = type
  if (status) params.status = status
  return http.get('/admin/contacts', { params })
}

export function getContact(id) {
  return http.get(`/admin/contacts/${id}`)
}

export function updateContactStatus(id, status) {
  return http.patch(`/admin/contacts/${id}`, { status })
}

export function deleteContact(id) {
  return http.delete(`/admin/contacts/${id}`)
}
