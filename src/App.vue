<template>
  <div id="app">
    <loader
      v-if="isLoading"
      object="#ff9633"
      color1="#ffffff"
      color2="#17fd3d"
      size="5"
      speed="2"
      bg="#343a40"
      objectbg="#999793"
      opacity="80"
      disable-scrolling="false"
      name="circular"
      class="loader_page"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoading: function() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>
.loader_page {
  top: 0;
  z-index: 100000;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
</style>
