<template>
  <div class="header_nb">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="white">
        <b-navbar-brand style="color: #97a8be;" href="#">{{ navComputed.text }}</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form class="mr-3">
              <div
                style="font-size: 2rem; display: flex; cursor: pointer;"
                title="Notification"
                @click="onSeenNotification()"
              >
                <b-icon icon="bell-fill" variant="info" />
                <span v-if="number" class="text_nofification">{{ number }}</span>
              </div>
            </b-nav-form>

            <b-nav-item-dropdown right no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-img style="margin: -10px; height: 50px; width: 50px;" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="Circle image" />
              </template>
              <b-dropdown-item @click="logout()">Đăng xuất</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div v-if="isShowNoti" class="ad_noti">
      <ul>
        <li v-for="(notification, index) in notifications" :key="index+100" @click="redirectToObject(notification)">
          <div class="mr-2">
            <b-icon :icon="getIconNotification(notification.type)" font-scale="3" />
          </div>
          <div>
            <div>
              {{ notification.content }}
              <p>{{ dateConvert(notification.created_at) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getByAdmin, seenNotification } from '../../api/notification'
import eventBus from '../../utils/eventBus'
export default {
  data() {
    return {
      numberPT: 0,
      nav: {},
      isShowNoti: false,
      teachers: [],
      courses: [],
      notifications: [],
      arrNav: [
        {
          name: 'dashBoardManeger',
          text: 'Dashboard',
          isSearch: false
        },
        {
          name: 'courseManeger',
          text: 'Khoá học',
          isSearch: true
        },
        {
          name: 'addCourse',
          text: 'Tạo khoá học',
          isSearch: false
        },
        {
          name: 'courseDetail',
          text: 'Chỉnh sửa khoá học',
          isSearch: false
        },
        {
          name: 'intersets',
          text: 'Khối lớp',
          isSearch: true
        },
        {
          name: 'category',
          text: 'Môn học',
          isSearch: true
        },
        {
          name: 'teacher',
          text: 'Giáo viên',
          isSearch: true
        },
        {
          name: 'addTeacher',
          text: 'Tạo giáo viên',
          isSearch: false
        },
        {
          name: 'teacherDetail',
          text: 'Chỉnh sửa giáo viên',
          isSearch: false
        },
        {
          name: 'user',
          text: 'Thành viên',
          isSearch: true
        },
        {
          name: 'addUser',
          text: 'Tạo thành viên',
          isSearch: false
        },
        {
          name: 'userInformation',
          text: 'Chỉnh sửa thành viên',
          isSearch: false
        }
      ]
    }
  },
  computed: {
    navComputed() {
      return this.nav
    },
    number() {
      return this.numberPT
    }
  },
  watch: {
    $route(to, from) {
      this.getNav(to.name)
      this.isShowNoti = false
    }
  },
  async created() {
    await this.getDataNoti()
    this.getNav(this.$route.name)
    eventBus.$on('updateNoti', async() => {
      await this.getDataNoti()
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('Admin/logout')
      this.$router.push({ name: 'loginAdmin' })
    },
    async onSeenNotification() {
      this.isShowNoti = !this.isShowNoti
      if (this.numberPT > 0) {
        var notificationsNew = this.notifications.filter(x => x.is_seen == null).map(x => x.id)
        if (notificationsNew.length > 0) {
          const body = {
            'ids': notificationsNew
          }
          await seenNotification(body)
          this.getDataNoti()
        }
      }
    },
    dateConvert(time) {
      const date = new Date(time * 1000)
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    redirectToObject(notification) {
      if (notification.type === 1) {
        this.redirectToUser(notification.action_id)
      } else if (notification.type === 2 || notification.type === 10) {
        this.redirectToTeacher(notification.action_id, notification.type)
      } else if (notification.type >= 3 || notification.type <= 9) {
        this.redirectToCourse(notification.action_id, notification.type)
      }
    },
    redirectToUser(userId) {
      this.$router.push({
        path: `/admin/user/${userId}`
      })
    },
    redirectToTeacher(teacherId, type) {
      let name = ''
      switch (type) {
        case 10:
          name = 'Follower'
          break
        default:
          name = 'Details'
          break
      }
      this.$router.push({
        path: `/admin/teacher/${teacherId}?name=${name}`
      })
    },
    redirectToCourse(courseId, type) {
      let name = ''
      switch (type) {
        case 3:
          name = 'Details'
          break
        case 5:
          name = 'Comment'
          break
        case 6:
          name = 'Comment'
          break
        case 7:
          name = 'Rating'
          break
        case 8:
          name = 'Like'
          break
        case 9:
          name = 'Student'
          break
        default:
          name = 'Details'
          break
      }
      this.$router.push({
        path: `/admin/course/${courseId}?name=${name}`
      })
    },
    getNav(name) {
      this.nav = this.arrNav.find(item => item.name === name)
    },
    async getDataNoti() {
      this.numberPT = 0
      this.notifications = await getByAdmin()
      var notificationsNew = this.notifications.filter(x => x.is_seen == null).map(x => x.id)
      this.numberPT = notificationsNew.length
    },
    getIconNotification(role) {
      var res = null
      switch (role) {
        case 1:
          res = 'person'
          break
        case 2:
          res = 'person-plus'
          break
        case 3:
          res = 'play-circle'
          break
        case 4:
          res = 'bell'
          break
        case 5:
          res = 'chat-dots'
          break
        case 6:
          res = 'chat-left-dots'
          break
        case 7:
          res = 'star'
          break
        case 8:
          res = 'hand-thumbs-up'
          break
        case 9:
          res = 'bag-check'
          break
        case 10:
          res = 'eye'
          break
        default:
          res = 'bell'
          break
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.header_nb {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  position: sticky;
  top: 0;
  z-index: 1;
}
.text_nofification {
  background-color: red;
  color: white;
  border-radius: 15px;
  font-size: 15px;
  text-align: center;
  width: 1.5em;
  font-weight: 700;
  height: 1.5em;
  margin-left: -0.8rem;
  margin-top: -0.8em;
}
.ad_noti {
  background: wheat;
  width: 400px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  right: 0;
  position: absolute;
  border-radius: 0.5em;
  max-height: 90vh;
  overflow-y: auto;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    padding: 0.5em;
    display: flex;
    align-items: center;
  }
  li:hover {
    background: #F0F2F5;
    border-radius: 0.5em;
    cursor: pointer;
  }
}
</style>
