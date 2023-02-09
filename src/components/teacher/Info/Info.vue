<template>
  <div class="te_main_info">
    <component :is="comNameComputed" :elmnt-id="comDataComputed" />
  </div>
</template>
<script>
import InfoDefault from './InfoDefault'
import Chapter from '../Chapter/Index'
import InfoTopCourse from './InfoTopCourse'
import InfoFormTeacher from './InfoFormTeacher'
import InfoCourse from './Course/Index'
import InfoUser from './User/Index'
export default {
  components: {
    InfoDefault,
    Chapter,
    InfoTopCourse,
    InfoFormTeacher,
    InfoCourse,
    InfoUser
  },
  props: {
    data: {
      type: {
        comName: String,
        comData: Object
      },
      default: {
        comName: 'InfoDefault',
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
      const name = to.query.name
      const id = to.query.id
      if (name && id) {
        this.data.comName = name
        this.data.comData = parseInt(id)
      } else {
        this.data.comName = 'InfoDefault'
        this.data.comData = null
      }
    }
  }
}
</script>
<style lang="scss">
.te_main_info {
  height: 100vh;
  width: 100%;
  background-color: #dddddd;
  overflow: auto;
}
</style>
