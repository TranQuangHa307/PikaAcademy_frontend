<template>
  <div style="background-color: #304156;">
    <div class="scrollbar">
      <b-list-group>
        <b-list-group-item v-for="(item, index) in items" :key="index" class="item_sidebar" :to="item.to" @click="setTitlePage(item.title)"><b-icon class="mr-3" :icon="item.icon" scale="1.25" /> {{ item.title }}</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          to: '/admin/dashboard',
          icon: 'layout-wtf'
        },
        {
          title: 'Khoá học',
          to: '/admin/course',
          icon: 'collection-play-fill'
        },
        {
          title: 'Khối lớp',
          to: '/admin/interests',
          icon: 'x-diamond-fill'
        },
        {
          title: 'Môn học',
          to: '/admin/category',
          icon: 'journals'
        },
        {
          title: 'Giáo viên',
          to: '/admin/teacher',
          icon: 'person-lines-fill'
        },
        {
          title: 'Thành viên',
          to: '/admin/user',
          icon: 'people-fill'
        }
      ]
    }
  },
  methods: {
    isRouteActive(id) {
      return (this.$route.path.includes(id))
    },
    setTitlePage(title) {
      this.$store.state.Admin.titlePage = title
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar {
  top: 0;
  max-height: 100vh;
  width: 250px;
  position: sticky;
  a:hover {
    background-color: #263445;
  }
}
.item_sidebar {
  display: flex;
  height: 56px;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  border-radius: 0;
  color: #89BFD9;
}
.b-sidebar {
    width: 250px;
    display: block !important;
}
.is-active {
  background-color: white !important;
  color: greenyellow !important;
}
</style>
