// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // SSR enabled by default
  ssr: true,

  // Import widget styles
  css: [
    '~/assets/css/variables.css',
    '~/assets/css/widgets.css',
  ],

  // Runtime config - values from .env
  runtimeConfig: {
    // Server-only (not exposed to client)
    lesscmsApiKey: process.env.LESSCMS_API_KEY || '',
    lesscmsBaseUrl: process.env.LESSCMS_BASE_URL || 'https://api.lesscms.io',
    lesscmsWorkspace: process.env.LESSCMS_WORKSPACE || '',
    lesscmsProject: process.env.LESSCMS_PROJECT || '',

    // Public (exposed to client)
    public: {
      lesscmsDefaultLanguage: process.env.LESSCMS_DEFAULT_LANGUAGE || 'pl',
    },
  },

  // App config
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Nitro server config
  nitro: {
    // Enable prerendering for static pages
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
