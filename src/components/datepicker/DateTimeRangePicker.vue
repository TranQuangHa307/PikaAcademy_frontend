<template>
  <div>
    <date-picker
      v-model="range"
      lang="en"
      type="datetime"
      range
      format="YYYY-MM-DD HH:mm:ss"
      width="500"
      style="width: 100%"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { convertTimeStamptoDate } from '../../utils/index.js'
export default {
  components: {
    DatePicker
  },
  props: {
    beginDate: {
      type: Number,
      default: null
    },
    endDate: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      range: null
    }
  },
  watch: {
    range(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.range = (!newValue) ? null : this.range
        this.$emit('setDateRange', this.range)
      }
    }
  },
  created() {
    if (this.beginDate && this.endDate) this.range = [convertTimeStamptoDate(this.beginDate), convertTimeStamptoDate(this.endDate)]
  }
}
</script>
