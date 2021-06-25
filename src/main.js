import { createApp } from 'vue'
import App from './App.vue'

/**
 * import Toastr
 */

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/**
 * Tailwind CSS
*/
import './index.css';
/**
 * Mixins
 */
import mixins from './mixins'

/**
 * Vue Router
 */
import router from './router'
/**
 * Vuex  
 */
import store from './store'

import GAuth from 'vue3-google-oauth2'

import VueSocialSharing from 'vue-social-sharing'

const app = createApp(App)

const gAuthOptions = { clientId: '424172903579-k11kbpppet5thol7l8r498j95f62c17g.apps.googleusercontent.com', scope: 'profile email', prompt: 'consent' }

app.use(VueSocialSharing);

app.use(GAuth, gAuthOptions)

app.use(Toast)

app.mixin(mixins)

app.use(router)

app.use(store)

app.mount('#app')