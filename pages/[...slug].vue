<script setup lang="ts">
/**
 * Dynamic Catch-All Page
 */

import SectionRenderer from '~/components/renderers/SectionRenderer.vue'

const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) {
    return params.join('/')
  }
  return params || ''
})

const pageCode = computed(() => {
  return slug.value.replace(/\//g, '-') || 'home'
})

const { sections, seo, loading, error } = await usePage(pageCode)

// 404 handling
if (!loading.value && error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

// SEO
const currentSeo = computed(() => {
  if (!seo.value) return null
  return seo.value['pl'] || Object.values(seo.value)[0]
})

useSeoMeta({
  title: () => currentSeo.value?.title || pageCode.value,
  description: () => currentSeo.value?.meta_description || '',
})
</script>

<template>
  <div class="page">
    <div v-if="loading" class="page-loading">Loading...</div>

    <template v-else-if="sections?.length">
      <SectionRenderer
        v-for="(section, index) in sections"
        :key="section.id || index"
        :section="section"
      />
    </template>

    <div v-else class="page-empty">
      <p>This page has no content.</p>
    </div>
  </div>
</template>

<style scoped>
.page-loading,
.page-empty {
  padding: 4rem 2rem;
  text-align: center;
  color: #666;
}
</style>
