<template>
  <div>
    <div class="te_navbar content_center mt-2">
      <div class="w40">
        <h1 class="title">{{ navComputed.text }}</h1>
      </div>
      <div class="te_header_right txt_right flex1 d_flex">
        <b-button v-if="navComputed.isCreate" class="content_center" variant="primary" @click="toCreate">+ {{ navComputed.text }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrNav: [
        {
          name: 'courseTeacherManeger',
          text: 'Khoá học',
          isSearch: true,
          isCreate: true,
          pathCreate: 'addCourseTeacherManeger'
        },
        {
          name: 'addCourseTeacherManeger',
          text: 'Tạo khoá học',
          isSearch: false,
          isCreate: false,
          pathCreate: ''
        },
        {
          name: 'courseDetailTeacherManeger',
          text: 'Chỉnh sửa khoá học',
          isSearch: false,
          isCreate: false,
          pathCreate: ''
        },
        {
          name: 'userTeacherManeger',
          text: 'Học sinh',
          isSearch: true,
          isCreate: false,
          pathCreate: ''
        },
        {
          name: 'dashBoardTeacherManeger',
          text: 'Dashborad',
          isSearch: false,
          isCreate: false,
          pathCreate: ''
        },
        {
          name: 'followerTeacherManeger',
          text: 'Người theo dõi',
          isSearch: true,
          isCreate: false,
          pathCreate: ''
        },
        {
          name: 'profileTeacherManeger',
          text: 'Thông tin cá nhân',
          isSearch: false,
          isCreate: false,
          pathCreate: ''
        }
      ],
      nav: {}
    }
  },
  computed: {
    navComputed() {
      return this.nav
    }
  },
  watch: {
    $route(to, from) {
      this.getNav(to.name)
    }
  },
  created() {
    this.getNav(this.$route.name)
  },
  methods: {
    getNav(name) {
      this.nav = this.arrNav.find(item => item.name === name)
    },
    toCreate() {
      this.$router.push({
        name: this.nav.pathCreate
      })
      this.getNav(this.nav.pathCreate)
    }
  }
}
</script>

<style lang="scss">
.te_navbar {
  width: 100%;
  .title {
    color: white;
  }
  height: 5vh;
}
.te_form_search {
  width: 250px;
  text-align: left;
  background-color: white;
  border-radius: 0.5em;
  height: 40px;

  input {
    height: 100%;
    background-color: transparent;
    border: none;
    width: 80%;
  }

  input:focus {
    outline: none;
  }
}

.te_header_right {
  justify-content: end;

  button {
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    display: flex;
  }
}
</style>
