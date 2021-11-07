<template>
  <div class="flex">
    <app-sidebar />
    <div class="w100 mh100v" style="background-color: #f0f2f5;">
      <app-nav-bar />
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '../../../components/admin/Sidebar.vue'
import NavBar from '../../../components/admin/NavBar.vue'
export default {
  components: {
    appSidebar: Sidebar,
    appNavBar: NavBar
  },
  data() {
    return {
      opSidebar: false
    }
  },
  computed: {
    ...mapGetters({
      username: 'Admin/getUsername',
      titlePage: 'Admin/getTitlePage'
    }),
    isLoading: function() {
      return this.$store.state.Admin.isLoading
    }
  }
}
</script>

<style scoped>
.border__n {
  border: 0;
}
.form__search {
  border-radius: 2rem;
  border: 2px solid;
  background-color: transparent;
  border-color: hsla(0,0%,100%,.6)
}
.bg-t {
  background-color: transparent !important;
}
.main-content .navbar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: transparent !important;
    padding-left: 0!important;
    padding-right: 0!important;
}
.pb-8 {
  padding-bottom: 8rem!important;
}
.mt--7 {
    margin-top: -6rem!important;
}
.bg-gradient-success {
  background: linear-gradient(
87deg
,#2dce89,#2dcecc)!important;
}
.header {
  position: relative;
  z-index: -1;
}
.test {
  margin-left: 250px;
}
.main-content {
  position: relative;
}
</style>

