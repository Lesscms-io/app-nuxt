<script setup lang="ts">
/**
 * Page Renderer
 *
 * Fetches and renders a complete page from the API.
 * Automatically sets SEO meta tags when page loads.
 */

import SectionRenderer from './SectionRenderer.vue'

interface Props {
  code: string
  language?: string
  /**
   * Enable automatic SEO meta tag management
   * @default true
   */
  autoSeo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoSeo: true,
  language: 'pl'
})

const emit = defineEmits<{
  (e: 'loaded', page: any): void
  (e: 'error', error: Error): void
}>()

// Fetch page using Nuxt composable
const { page, sections, seo, loading, error } = await usePage(props.code)

// Get language-specific SEO
const currentSeo = computed(() => {
  if (!seo.value) return null
  return seo.value[props.language] || seo.value['pl'] || Object.values(seo.value)[0]
})

// Auto SEO management using Nuxt's useSeoMeta
if (props.autoSeo) {
  useSeoMeta({
    title: () => currentSeo.value?.title || '',
    description: () => currentSeo.value?.meta_description || '',
    ogTitle: () => currentSeo.value?.og?.title || currentSeo.value?.title || '',
    ogDescription: () => currentSeo.value?.og?.description || currentSeo.value?.meta_description || '',
    ogImage: () => currentSeo.value?.og?.image?.url || '',
    twitterCard: () => currentSeo.value?.twitter?.card || 'summary',
    twitterTitle: () => currentSeo.value?.twitter?.title || currentSeo.value?.title || '',
    twitterDescription: () => currentSeo.value?.twitter?.description || currentSeo.value?.meta_description || '',
    twitterImage: () => currentSeo.value?.twitter?.image || currentSeo.value?.og?.image?.url || '',
  })
}

// Emit events when page loads or errors
watch(page, (newPage) => {
  if (newPage) {
    emit('loaded', newPage)
  }
})

watch(error, (newError) => {
  if (newError) {
    emit('error', newError)
  }
})
</script>

<template>
  <div
    class="lcms-page"
    :data-page-code="code"
  >
    <div
      v-if="loading"
      class="lcms-page__loading"
    >
      <span>Loading page...</span>
    </div>

    <div
      v-else-if="error"
      class="lcms-page__error"
    >
      <span>Failed to load page</span>
    </div>

    <div
      v-else-if="!page"
      class="lcms-page__not-found"
    >
      <span>Page not found</span>
    </div>

    <div
      v-else
      class="lcms-page__content"
    >
      <SectionRenderer
        v-for="section in sections"
        :key="section.id || section.uuid"
        :section="section"
        :language="language"
      />
    </div>
  </div>
</template>
