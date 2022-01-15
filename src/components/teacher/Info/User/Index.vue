<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Course" @click="changeCom('Course')" active></b-tab>
      <b-tab title="Rating" @click="changeCom('Rating')"></b-tab>
    </b-tabs>
    <div>
      <component :is="comNameComputed" :elmntId="comDataComputed" />
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
