import '@assets/style/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vPhoneMask from '@/directives/phone-mask'

// Vuetify
import 'vuetify/styles/main.sass'
import { createVuetify } from 'vuetify'
import { VSlider }from 'vuetify/components'

const vuetify = createVuetify({
  components:{
    VSlider
  },
})


const modules = import.meta.glob('./assets/icons/*.svg');
Object.values(modules).forEach(async (el: any) => await el());

const app = createApp(App);
const pinia = createPinia()

app.directive('phone-mask', vPhoneMask);
app.use(pinia);
app.use(vuetify)
app.mount('#app');
