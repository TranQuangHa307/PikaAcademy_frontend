<template>
  <div class="txt_center">
    <b-img src="https://his.sandrasoft.app/icons/book.png" />
    <h1>Select an item to view</h1>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
