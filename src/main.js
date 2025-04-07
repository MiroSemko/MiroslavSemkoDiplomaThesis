import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Set default theme to 'dark'
    // themes: {
    //   light: {
    //     dark: false, // Indicates this is the light theme
    //     colors: {
    //       primary: '#1976D2',
    //       secondary: '#424242',
    //       accent: '#82B1FF',
    //       error: '#FF5252',
    //       info: '#2196F3',
    //       success: '#4CAF50',
    //       warning: '#FFC107',
    //     },
    //   },
    //   dark: {
    //     dark: true, // Indicates this is the dark theme
    //     colors: {
    //       primary: '#BB86FC',
    //       secondary: '#03DAC6',
    //       accent: '#3700B3',
    //       error: '#CF6679',
    //       info: '#2196F3',
    //       success: '#4CAF50',
    //       warning: '#FFC107',
    //     },
    //   },
    // },
  },
})

const app = createApp(App).use(vuetify).mount('#app')

