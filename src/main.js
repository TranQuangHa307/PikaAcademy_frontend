import Vue from 'vue'
import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons, FormCheckboxPlugin } from 'bootstrap-vue'
import loader from 'vue-ui-preloader'
import App from './App.vue'
import { store } from './store/index'
import { router } from './router/index'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import '../src/assets/css/style.scss'
import '../src/assets/css/app.scss'
import '../src/assets/css/teacherManager.scss'
import Vuelidate from 'vuelidate'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue2-datepicker/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import underscore from 'vue-underscore'
import mixin from './utils/mixin'
import { Chart } from 'chart.js'
import Chartkick from 'vue-chartkick'
import Tawk from 'vue-tawk'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '684358347602-9e5kiu1cg8ctram5jpbj620hlo40skfk.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)
Vue.use(Tawk, {
  tawkSrc: 'https://embed.tawk.to/61d72608b84f7301d329b48d/1foo6p51e'
})
Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false
Vue.use(underscore)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(FormCheckboxPlugin)
Vue.use(loader)
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(CKEditor)
Vue.mixin(mixin)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
