import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    baseUrlService: process.env.BASE_URLSERVICE || 'http://172.16.13.12:5050/selfservice_test',
    baseURL: process.env.BASE_URL || 'https://selfservice.zetdc.co.zw'
  },
  server: {
    host: '172.16.29.12',
    port: '3002'
  },
  head: {
    titleTemplate: 'ZETDC Self Service Portal',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
  },
  loading: '~/components/loading.vue',
  css: [
  ],
  plugins: [
    '~/plugins/axios.js',
    {
      src: '@/plugins/vuelayers',
      ssr: false
    },
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    ['nuxt-material-design-icons'],
    ['@nuxtjs/axios'],
    ['nuxt-vue-material', {
      theme: 'default-light',
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton', 'MdToolbar',]
    }],
    "nuxt-leaflet",
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }, { path: '/wsdl', handler: '~/api/soap.js' }, { path: '/chat', handler: '~/api/chat.js' }, { path: '/mobile', handler: '~/api/mobile.js' }],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          theme: {
            primary: "#ee44aa",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107"
          },
        }
      }
    },
    customProperties: true
  },
  build: {
    extractCSS: true,
    transpile: ['vue-echarts', 'resize-detector'],
    extend(config, ctx) {
    }
  }
}
