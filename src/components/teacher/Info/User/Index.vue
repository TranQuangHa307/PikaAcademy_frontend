<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Khoá học" active @click="changeCom('Course')" />
      <b-tab title="Đánh giá" @click="changeCom('Rating')" />
    </b-tabs>
    <div>
      <component :is="comNameComputed" :elmnt-id="comDataComputed" />
    </div>
  </div>
</template>

<script>
import Course from './Course'
import Rating from './Rating'
export default {
  components: {
    Course,
    Rating
  },
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      com: {
        comName: 'Course',
        comData: this.elmntId
      }
    }
  },
  computed: {
    comNameComputed() {
      return this.com.comName
    },
    comDataComputed() {
      return this.elmntId
    }
  },
  methods: {
    changeCom(comName) {
      this.com.comName = comName
    }
  }
}
</script>
