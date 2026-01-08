<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <h2 class="error-message">
        {{ error.statusCode === 404 ? 'Page Not Found' : error.statusMessage }}
      </h2>
      <button class="error-button" @click="handleClearError">
        Go Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #dee2e6;
  margin: 0;
}

.error-message {
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0 2rem;
}

.error-button {
  background: #333;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.error-button:hover {
  background: #000;
}
</style>
