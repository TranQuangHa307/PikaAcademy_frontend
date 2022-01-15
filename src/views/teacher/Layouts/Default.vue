<template>
  <div class="bg_teacher_manager d_flex">
    <sidebar />
    <div class="te_body">
      <div class="w60 mr-5">
        <nav-bar />
        <router-view />
      </div>
      <div class="w40">
        <info :data="com" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../../components/teacher/Sidebar'
import NavBar from '../../../components/teacher/NavBar'
import Info from '../../../components/teacher/Info/Info'
import eventBus from '../../../utils/eventBus.js'
export default {
  components: {
    Sidebar,
    NavBar,
    Info
  },
  data() {
    return {
      com: {
        comName: 'InfoDefault',
        comData: null
      }
    }
  },
  created() {
    eventBus.$on('com', com => {
      this.com = com
    })
  }
}
</script>

<style lang="scss">
.te_body {
  width:90%;
  margin: 0 auto;
  display: flex;
}
</style>
