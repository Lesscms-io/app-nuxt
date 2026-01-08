<script setup lang="ts">
/**
 * Main App Component
 */

// Load project config on app init (fonts, etc.)
const { projectConfig } = await useProjectConfig()

// Inject Google Fonts if configured
useHead(() => {
  const links: any[] = []

  if (projectConfig.value?.google_fonts_url) {
    links.push({
      rel: 'stylesheet',
      href: projectConfig.value.google_fonts_url,
    })
  }

  if (projectConfig.value?.custom_css_url) {
    links.push({
      rel: 'stylesheet',
      href: projectConfig.value.custom_css_url,
    })
  }

  return { link: links }
})

// Set font CSS variable
const fontFamily = computed(() => {
  if (projectConfig.value?.fonts?.length) {
    return projectConfig.value.fonts.map((f: string) => `"${f}"`).join(', ') + ', sans-serif'
  }
  return 'Inter, Roboto, sans-serif'
})
</script>

<template>
  <div :style="{ '--lcms-font-family': fontFamily }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --lcms-font-family: 'Inter', 'Roboto', sans-serif;
}

body {
  font-family: var(--lcms-font-family);
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
