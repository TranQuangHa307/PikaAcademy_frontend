<template>
  <div style="background-color: #1D1E22">
    <app-header />
    <div class="mt-5" style="background-color: #1D1E22">
      <router-view />
    </div>
    <footer class="pb-2" style="border-top:1px solid #393f4d background-color: #1D1E22 color: white">
      <app-footer />
    </footer>
  </div>
</template>

<script>
import Header from '../../../components/user/Header.vue'
import Footer from '../../../components/user/Footer.vue'
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>
