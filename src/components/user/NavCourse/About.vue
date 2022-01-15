<template>
  <div class="mt-3 mb-3">
    <div v-html="dataComputed">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: null
    }
  },
  computed: {
    dataComputed() {
      return this.data
    }
  }
}
</script>

