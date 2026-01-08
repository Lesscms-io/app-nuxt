/**
 * LessCMS Composables for Nuxt
 *
 * SSR-compatible composables for fetching CMS content.
 * Data is fetched on server, serialized, and hydrated on client.
 */

import type {
  PageResponse,
  PagesListResponse,
  CollectionResponse,
  CollectionParams,
  MenuResponse,
  BlockResponse,
  ElementResponse,
  RoutesResponse,
  CollectionEntry,
  CollectionTemplateResponse,
} from '~/types/api'

/**
 * Get API client for direct API calls
 * Returns an object with methods to call the API
 */
export function useApi() {
  return {
    async get<T>(path: string, params?: Record<string, any>): Promise<T> {
      return $fetch<T>(`/api${path}`, { params })
    },

    async getPage(code: string): Promise<PageResponse> {
      return $fetch<PageResponse>(`/api/pages/${code}`)
    },

    async getPages(): Promise<PagesListResponse> {
      return $fetch<PagesListResponse>('/api/pages')
    },

    async getCollection(code: string, params?: CollectionParams): Promise<CollectionResponse> {
      return $fetch<CollectionResponse>(`/api/collections/${code}`, { params })
    },

    async getCollectionEntry(collectionCode: string, entryId: string): Promise<{ data: CollectionEntry }> {
      return $fetch<{ data: CollectionEntry }>(`/api/collections/${collectionCode}/${entryId}`)
    },

    async getCollectionTemplate(collectionCode: string, templateId: string): Promise<CollectionTemplateResponse> {
      return $fetch<CollectionTemplateResponse>(`/api/collections/${collectionCode}/templates/${templateId}`)
    },

    async getMenu(code: string): Promise<MenuResponse> {
      return $fetch<MenuResponse>(`/api/menus/${code}`)
    },

    async getBlock(code: string): Promise<BlockResponse> {
      return $fetch<BlockResponse>(`/api/blocks/${code}`)
    },

    async getElement(code: string): Promise<ElementResponse> {
      return $fetch<ElementResponse>(`/api/elements/${code}`)
    },

    async getRoutes(): Promise<RoutesResponse> {
      return $fetch<RoutesResponse>('/api/routes')
    },
  }
}

/**
 * Fetch a page by code with SSR support
 */
export async function usePage(code: string | Ref<string>) {
  const codeValue = unref(code)

  const { data, error, refresh, status } = await useAsyncData(
    `page-${codeValue}`,
    async () => {
      const response = await $fetch<PageResponse>(`/api/pages/${codeValue}`)
      return {
        sections: response.data.content || [],
        metadata: response.data.metadata || null,
        seo: response.data.seo || null,
      }
    },
    {
      watch: isRef(code) ? [code] : undefined,
    }
  )

  return {
    page: data,
    sections: computed(() => data.value?.sections || []),
    metadata: computed(() => data.value?.metadata || null),
    seo: computed(() => data.value?.seo || null),
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch all pages with SSR support
 */
export async function usePages() {
  const { data, error, refresh, status } = await useAsyncData(
    'pages-list',
    async () => {
      const response = await $fetch<PagesListResponse>('/api/pages')
      return response.data || []
    }
  )

  return {
    pages: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch a collection with SSR support
 */
export async function useCollection(
  code: string | Ref<string>,
  params?: CollectionParams
) {
  const codeValue = unref(code)

  const { data, error, refresh, status } = await useAsyncData(
    `collection-${codeValue}-${JSON.stringify(params || {})}`,
    async () => {
      const response = await $fetch<CollectionResponse>(`/api/collections/${codeValue}`, {
        params,
      })
      return {
        entries: response.data || [],
        meta: response.meta || null,
      }
    },
    {
      watch: isRef(code) ? [code] : undefined,
    }
  )

  return {
    collection: data,
    entries: computed(() => data.value?.entries || []),
    meta: computed(() => data.value?.meta || null),
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch a single collection entry with SSR support
 */
export async function useCollectionEntry(
  collectionCode: string | Ref<string>,
  entryId: string | Ref<string>
) {
  const collectionValue = unref(collectionCode)
  const entryValue = unref(entryId)

  const { data, error, refresh, status } = await useAsyncData(
    `collection-entry-${collectionValue}-${entryValue}`,
    async () => {
      const response = await $fetch<{ data: CollectionEntry }>(`/api/collections/${collectionValue}/${entryValue}`)
      return response.data
    },
    {
      watch: [
        ...(isRef(collectionCode) ? [collectionCode] : []),
        ...(isRef(entryId) ? [entryId] : []),
      ],
    }
  )

  return {
    entry: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch a menu by code with SSR support
 */
export async function useMenu(code: string | Ref<string>) {
  const codeValue = unref(code)

  const { data, error, refresh, status } = await useAsyncData(
    `menu-${codeValue}`,
    async () => {
      const response = await $fetch<MenuResponse>(`/api/menus/${codeValue}`)
      return response.data || null
    },
    {
      watch: isRef(code) ? [code] : undefined,
    }
  )

  return {
    menu: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch a block by code with SSR support
 */
export async function useBlock(code: string | Ref<string>) {
  const codeValue = unref(code)

  const { data, error, refresh, status } = await useAsyncData(
    `block-${codeValue}`,
    async () => {
      const response = await $fetch<BlockResponse>(`/api/blocks/${codeValue}`)
      return response.data || null
    },
    {
      watch: isRef(code) ? [code] : undefined,
    }
  )

  return {
    block: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch an element by code with SSR support
 */
export async function useElement(code: string | Ref<string>) {
  const codeValue = unref(code)

  const { data, error, refresh, status } = await useAsyncData(
    `element-${codeValue}`,
    async () => {
      const response = await $fetch<ElementResponse>(`/api/elements/${codeValue}`)
      return response.data || null
    },
    {
      watch: isRef(code) ? [code] : undefined,
    }
  )

  return {
    element: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch routes configuration with SSR support
 */
export async function useRoutes() {
  const { data, error, refresh, status } = await useAsyncData(
    'routes',
    async () => {
      const response = await $fetch<RoutesResponse>('/api/routes')
      return response.data || []
    }
  )

  return {
    routes: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}

/**
 * Fetch project config with SSR support
 */
export async function useProjectConfig() {
  const { data, error, refresh, status } = await useAsyncData(
    'project-config',
    async () => {
      const response = await $fetch<{ data: any }>('/api/config')
      return response.data || null
    }
  )

  return {
    projectConfig: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}
