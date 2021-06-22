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


const app = createApp(App)

app.use(Toast)

app.mixin(mixins)

app.use(router)

app.use(store)

app.mount('#app')