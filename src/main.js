import Vue from 'vue'
import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons, FormCheckboxPlugin } from 'bootstrap-vue'
import loader from 'vue-ui-preloader'
import App from './App.vue'
import { store } from './store/index'
import { router } from './router/index'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import '../src/assets/css/style.scss'
import Vuelidate from 'vuelidate'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'chart.js'
import VueCharts from 'vue-chartjs'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue2-datepicker/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import underscore from 'vue-underscore'
Vue.config.productionTip = false
Vue.use(underscore)
Vue.use(VueCharts)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(FormCheckboxPlugin)
Vue.use(loader)
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(CKEditor)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
