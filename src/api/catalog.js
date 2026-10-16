import { http } from './httpClient'

export const getCategories = async ({ nav = false } = {}) => {
  const url = nav ? '/categories?nav=1' : '/categories'
  const res = await http.get(url)
  return res.data || []
}

export const getCategory = async (slug) => {
  const res = await http.get(`/categories/${slug}`)
  return res.data
}

export const getCategoryProducts = async (categorySlug, params = {}) => {
  const res = await http.get(`/categories/${categorySlug}/products`, { params })
  return res.data || []
}

export const getProduct = async (categorySlug, productSlug) => {
  const res = await http.get(`/categories/${categorySlug}/products/${productSlug}`)
  return res.data
}

export const getProducts = async (params = {}) => {
  const res = await http.get('/products', { params })
  return res.data || []
}

// ─── Admin Endpoints ──────────────────────────────────────────
export const adminGetCategories = async () => {
  return http.get('/admin/categories')
}

export const adminGetCategory = async (slug) => {
  return http.get(`/admin/categories/${slug}`)
}

export const adminCreateCategory = async (data) => {
  return http.post('/admin/categories', data)
}

export const adminUpdateCategory = async (slug, data) => {
  return http.put(`/admin/categories/${slug}`, data)
}

export const adminDeleteCategory = async (slug) => {
  return http.delete(`/admin/categories/${slug}`)
}

export const adminGetProducts = async (params = {}) => {
  return http.get('/admin/products', { params })
}

export const adminGetProduct = async (id) => {
  return http.get(`/admin/products/${id}`)
}

export const adminCreateProduct = async (data) => {
  return http.post('/admin/products', data)
}

export const adminUpdateProduct = async (id, data) => {
  return http.put(`/admin/products/${id}`, data)
}

export const adminDeleteProduct = async (id) => {
  return http.delete(`/admin/products/${id}`)
}

export const adminGetAttributes = async () => {
  return http.get('/admin/attributes')
}

export const adminGetAttributeValues = async (attrId) => {
  return http.get(`/admin/attributes/${attrId}/values`)
}

export const adminUpdateProductOptions = async (productId, data) => {
  return http.put(`/admin/products/${productId}/options`, data)
}

export const adminGenerateVariants = async (productId) => {
  return http.post(`/admin/products/${productId}/variants/generate`)
}

export const adminGetProductVariants = async (productId) => {
  return http.get(`/admin/products/${productId}/variants`)
}

export const adminUpdateVariant = async (variantId, data) => {
  return http.put(`/admin/variants/${variantId}`, data)
}

export const adminDeleteVariant = async (variantId) => {
  return http.delete(`/admin/variants/${variantId}`)
}

export const adminGetFields = async () => {
  return http.get('/admin/fields')
}

export const adminUpdateProductFields = async (productId, data) => {
  return http.put(`/admin/products/${productId}/fields`, data)
}
