import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);


app.use(
    createAuth0({
      domain: "animus-platformma.eu.auth0.com",
      clientId: "rmTo31MtD9om7YjgaTzjHD15k4blsTAr",
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  )
.use(router).mount('#app')
