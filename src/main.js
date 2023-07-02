import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);


app.use(
    createAuth0({
      domain: "dev-4xqpl6n4zujaeapv.us.auth0.com",
      clientId: "9UneVDtCME6dTYhXzXenmPikB6Um2PrR",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  )
.use(router).mount('#app')
