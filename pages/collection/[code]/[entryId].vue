<script setup lang="ts">
/**
 * Collection Entry Page
 */

import SectionRenderer from '~/components/renderers/SectionRenderer.vue'

const route = useRoute()
const collectionCode = computed(() => route.params.code as string)
const entryId = computed(() => route.params.entryId as string)

const { entry, loading, error } = await useCollectionEntry(collectionCode, entryId)

if (!loading.value && error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Entry Not Found',
  })
}

// SEO
useSeoMeta({
  title: () => entry.value?.content?.title || entryId.value,
})
</script>

<template>
  <div class="entry-page">
    <div v-if="loading">Loading...</div>

    <template v-else-if="entry">
      <!-- If entry has template sections, render them -->
      <template v-if="entry.template_content?.length">
        <SectionRenderer
          v-for="(section, index) in entry.template_content"
          :key="section.id || index"
          :section="section"
        />
      </template>

      <!-- Default entry display -->
      <div v-else class="entry-default">
        <div class="container">
          <NuxtLink :to="`/collection/${collectionCode}`" class="back-link">
            &larr; Back
          </NuxtLink>

          <article>
            <h1>{{ entry.content?.title || entryId }}</h1>

            <div class="entry-content">
              <div v-for="(value, key) in entry.content" :key="key">
                <template v-if="key !== 'title'">
                  <h3>{{ key }}</h3>
                  <div v-if="typeof value === 'string' && value.includes('<')" v-html="value" />
                  <div v-else>{{ value }}</div>
                </template>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.entry-default {
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #666;
  text-decoration: none;
}

.entry-content {
  margin-top: 2rem;
}

.entry-content h3 {
  font-size: 0.85rem;
  color: #666;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
}
</style>
