/**
 * LessCMS Server Utilities
 */

/**
 * Get LessCMS API configuration from runtime config
 */
export function getLessCMSConfig() {
  const config = useRuntimeConfig()

  return {
    baseUrl: config.lesscmsBaseUrl as string,
    apiKey: config.lesscmsApiKey as string,
    workspace: config.lesscmsWorkspace as string,
    project: config.lesscmsProject as string,
  }
}

/**
 * Build full API URL for LessCMS
 */
export function buildApiUrl(path: string): string {
  const config = getLessCMSConfig()
  return `${config.baseUrl}/v1/${config.workspace}/${config.project}${path}`
}

/**
 * Make authenticated request to LessCMS API
 */
export async function fetchFromLessCMS<T>(path: string, options: RequestInit = {}): Promise<T> {
  const config = getLessCMSConfig()
  const url = buildApiUrl(path)

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': config.apiKey,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
      message: error,
    })
  }

  return response.json()
}
