/**
 * LessCMS API Proxy
 *
 * Proxies all /api/* requests to LessCMS API.
 * This keeps the API key server-side only.
 */

import { fetchFromLessCMS } from '../utils/lesscms'

export default defineEventHandler(async (event) => {
  // Get the path after /api/
  const path = '/' + (getRouterParam(event, 'path') || '')

  // Get query params
  const query = getQuery(event)
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const fullPath = queryString ? `${path}?${queryString}` : path

  // Proxy the request
  return fetchFromLessCMS(fullPath)
})
