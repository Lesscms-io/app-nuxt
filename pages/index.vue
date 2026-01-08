<script setup lang="ts">
/**
 * Home Page - renders 'home' page from CMS
 */

import SectionRenderer from '~/components/renderers/SectionRenderer.vue'

const { sections, seo, loading, error } = await usePage('home')

// SEO
const currentSeo = computed(() => {
  if (!seo.value) return null
  return seo.value['pl'] || Object.values(seo.value)[0]
})

useSeoMeta({
  title: () => currentSeo.value?.title || 'Home',
  description: () => currentSeo.value?.meta_description || '',
})
</script>

<template>
  <div class="page">
    <div v-if="loading" class="page-loading">Loading...</div>

    <div v-else-if="error" class="page-error">
      <h1>Error</h1>
      <p>{{ error.message }}</p>
    </div>

    <template v-else>
      <SectionRenderer
        v-for="(section, index) in sections"
        :key="section.id || index"
        :section="section"
      />
    </template>
  </div>
</template>

<style scoped>
.page-loading,
.page-error {
  padding: 4rem 2rem;
  text-align: center;
}
</style>
