<template>
  <div class="w100">
    <date-picker
      :value="dateComputed"
      lang="en"
      type="date"
      format="YYYY-MM-DD"
      placeholder="Select Date"
      @change="onChange"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: {
    DatePicker
  },
  props: {
    data: {
      type: Date,
      default: null
    }
  },
  computed: {
    dateComputed() {
      return this.data
    }
  },
  methods: {
    onChange(data) {
      this.$emit('setDate', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.mx-datepicker {
  width: 100%;
}
</style>
