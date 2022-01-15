<template>
  <div>
    <component :is="comNameComputed" :data="comDataComputed" />
  </div>
</template>

<script>
import About from './About'
import Material from './Material'
import CourseRatings from './CourseRatings'
import Lock from './Lock'
import Lessons from './Lessons'
export default {
  components: {
    About,
    Material,
    CourseRatings,
    Lock,
    Lessons
  },
  props: {
    data: {
      default: {
        comName: 'About',
        comData: null
      }
    }
  },
  computed: {
    comNameComputed() {
      return this.data.comName
    },
    comDataComputed() {
      return this.data.comData
    }
  },
  watch: {
    $route(to, from) {
      this.data.comName = 'About'
      this.data.comData = null
    }
  }
}
</script>
