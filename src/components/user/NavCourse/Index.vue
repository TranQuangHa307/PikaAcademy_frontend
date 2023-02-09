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
import Exercise from './Exercise'
import Comment from './Comment'
export default {
  components: {
    About,
    Material,
    CourseRatings,
    Lock,
    Lessons,
    Exercise,
    Comment
  },
  props: {
    data: {
      type: {
        comName: String,
        comData: Object
      },
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
      debugger
      var name = to.query.name
      if (name) {
        this.data.comName = name
        this.data.comData = to.params.id
      } else {
        this.data.comName = 'About'
        this.data.comData = null
      }
    }
  }
}
</script>
