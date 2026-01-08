<script setup lang="ts">
/**
 * Collection List Page
 */

const route = useRoute()
const collectionCode = computed(() => route.params.code as string)

const { entries, meta, loading, error } = await useCollection(collectionCode)

if (!loading.value && error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection Not Found',
  })
}

useSeoMeta({
  title: () => `${collectionCode.value} | Collection`,
})
</script>

<template>
  <div class="collection-page">
    <div class="container">
      <h1>{{ collectionCode }}</h1>

      <div v-if="loading">Loading...</div>

      <div v-else-if="entries?.length" class="collection-grid">
        <NuxtLink
          v-for="entry in entries"
          :key="entry.metadata?.entry_id"
          :to="`/collection/${collectionCode}/${entry.metadata?.entry_id}`"
          class="collection-card"
        >
          <h2>{{ entry.content?.title || entry.metadata?.entry_id }}</h2>
          <p v-if="entry.content?.description">{{ entry.content.description }}</p>
        </NuxtLink>
      </div>

      <div v-else>No entries found.</div>
    </div>
  </div>
</template>

<style scoped>
.collection-page {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.collection-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.collection-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.collection-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.collection-card p {
  margin: 0;
  color: #666;
}
</style>
