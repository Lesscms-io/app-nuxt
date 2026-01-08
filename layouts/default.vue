<script setup lang="ts">
/**
 * Default Layout
 */
</script>

<template>
  <div class="layout">
    <header class="layout-header">
      <slot name="header">
        <nav class="nav">
          <NuxtLink to="/" class="nav-brand">LessCMS</NuxtLink>
        </nav>
      </slot>
    </header>

    <main class="layout-main">
      <slot />
    </main>

    <footer class="layout-footer">
      <slot name="footer">
        <p>&copy; {{ new Date().getFullYear() }} LessCMS</p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: #333;
  text-decoration: none;
}

.layout-main {
  flex: 1;
}

.layout-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 2rem;
  text-align: center;
  color: #666;
}
</style>
