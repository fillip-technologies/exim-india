import { useState, useEffect } from 'react'
import { getCategories, getCategory, getCategoryProducts, getProduct } from './catalog'

/**
 * Generic fetch hook. `fetcher` is re-run whenever `key` changes; results from
 * a superseded request are ignored. When `enabled` is false nothing is
 * fetched and `loading` stays false.
 */
function useFetch(fetcher, key, { enabled = true, initial = null } = {}) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!enabled) {
      setData(initial)
      setLoading(false)
      setError(null)
      return undefined
    }

    let active = true
    setLoading(true)
    setError(null)
    setData(initial)
    fetcher()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((err) => {
        if (active) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // `key` identifies the request; the fetcher closure is intentionally not a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  return { data, loading, error }
}

export function useCategories({ nav = false } = {}) {
  const { data, loading, error } = useFetch(() => getCategories({ nav }), `categories:${nav}`, {
    initial: [],
  })
  return { categories: data, loading, error }
}

export function useCategory(categorySlug) {
  const { data, loading, error } = useFetch(() => getCategory(categorySlug), `category:${categorySlug}`, {
    enabled: Boolean(categorySlug),
  })
  return { category: data, loading, error }
}

export function useCategoryProducts(categorySlug, params = {}) {
  const key = `products:${categorySlug}:${JSON.stringify(params)}`
  const { data, loading, error } = useFetch(() => getCategoryProducts(categorySlug, params), key, {
    enabled: Boolean(categorySlug),
    initial: [],
  })
  return { products: data, loading, error }
}

export function useProduct(categorySlug, productSlug) {
  const { data, loading, error } = useFetch(
    () => getProduct(categorySlug, productSlug),
    `product:${categorySlug}:${productSlug}`,
    { enabled: Boolean(categorySlug && productSlug) },
  )
  return { product: data, loading, error }
}
