<template>
  <div class="te_sidebar">
    <div class="content_center">
      <b-img id="tooltip-target-1" src="https://firebasestorage.googleapis.com/v0/b/sandrasoft-8fe2b.appspot.com/o/public%2Ffile%2Fstartup.png?alt=media&token=9b8785a7-1981-4672-a2a0-6cb203534fd8" rounded="circle" alt="Circle image" />
    </div>
    <div class="h85 content_center">
      <ul>
        <li @click="onSeenNotification()">
          <b-icon icon="bell-fill" font-scale="2" />
          <span v-if="number" class="text_nofification">{{ number }}</span>
          <br>
          Thông báo
        </li>
        <router-link v-for="(item, index) in items" :key="index" :to="item.to" tag="li">
          <b-icon :icon="item.icon" font-scale="2" />
          <br>
          {{ item.title }}
        </router-link>
        <li @click="onOpenConfirmLogout()">
          <b-icon icon="power" font-scale="2" />
          <br>
          Đăng xuất
        </li>
      </ul>
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
    <b-modal
      v-if="isModelLogoutOpen"
      id="modal-delete-interests"
      v-model="isModelLogoutOpen"
      title="Vui lòng xác nhận"
      size="sm"
      button-size="sm"
      ok-variant="danger"
      ok-title="Đồng ý"
      cancel-title="Huỷ bỏ"
      footer-class="p2"
      hide-header-close
      @cancel="onCancelLogout()"
      @ok="logout()"
    >Bạn có chắc chắn muốn đăng xuất không?</b-modal>
  </div>
</template>

<script>
import { getByTeacher, seenNotification } from '../../api/notification'
export default {
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          to: '/teachermanager/dashboard',
          icon: 'layout-wtf'
        },
        {
          title: 'Khoá học',
          to: '/teachermanager/course',
          icon: 'collection-play-fill'
        },
        {
          title: 'Học sinh',
          to: '/teachermanager/user',
          icon: 'people-fill'
        },
        {
          title: 'Người theo dõi',
          to: '/teachermanager/follower',
          icon: 'person-check-fill'
        },
        {
          title: 'Thông tin cá nhân',
          to: '/teachermanager/profile',
          icon: 'person-circle'
        }
      ],
      isModelLogoutOpen: false,
      numberPT: 0,
      isShowNoti: false,
      notifications: []
    }
  },
  computed: {
    number() {
      return this.numberPT
    }
  },
  async created() {
    await this.getDataNoti()
  },
  methods: {
    onOpenConfirmLogout() {
      this.isModelLogoutOpen = true
    },
    onCancelLogout() {
      this.isModelLogoutOpen = false
    },
    logout() {
      this.$store.dispatch('Teacher/logout')
      this.$router.push({ name: 'loginTeacher' })
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
    async getDataNoti() {
      this.numberPT = 0
      this.notifications = await getByTeacher(this.$store.state.Teacher.myInfo.id)
      console.log(this.notifications)
      var notificationsNew = this.notifications.filter(x => x.is_seen == null).map(x => x.id)
      this.numberPT = notificationsNew.length
    },
    redirectToObject(notification) {
      if (notification.type === 10) {
        this.redirectToFollower()
      } else if (notification.type === 2 || notification.type === 10) {
        this.redirectToTeacher(notification.action_id, notification.type)
      } else if (notification.type === 4) {
        this.redirectToCourseDetails(notification.action_id)
      } else if (notification.type > 4 || notification.type <= 9) {
        this.redirectToCourse(notification.action_id, notification.type)
      }
    },
    redirectToCourseDetails(courseId) {
      this.$router.push({
        path: `/teachermanager/course/${courseId}`
      })
      this.isShowNoti = !this.isShowNoti
    },
    redirectToCourse(courseId, type) {
      let name = ''
      switch (type) {
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
          name = 'User'
          break
        default:
          name = 'User'
          break
      }
      this.$router.push({
        path: `/teachermanager/course?id=${courseId}&name=InfoCourse&itemName=${name}`
      })
      this.isShowNoti = !this.isShowNoti
    },
    redirectToFollower() {
      this.$router.push({
        path: `/teachermanager/follower`
      })
      this.isShowNoti = !this.isShowNoti
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
          res = 'bell'
          break
        case 4:
          res = 'play-btn'
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

<style lang="scss">
.te_sidebar {
  background-color: #6166F5;
  height: 100vh;
  width: 10vh;
  border-radius: 2em;
  color: white;
  font-weight: bold;
  padding: 1em 1em;
  text-align: center;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    border-radius: 1em;
    padding: 1em 0.5em;
    font-size: 13px;
    margin: 1em 0;
  }
  li:hover {
    background-color: #a1a3f8;
    cursor: pointer;
  }
}
.te_active_sidebar {
  background-color: #a1a3f8;
}
.te_tooltip {
  margin: 0 auto;
  list-style-type: none;
  padding-inline-start: 0;
  li {
    color: black;
    font-weight: bold;
    padding: 0.3em;
    width: 100%;
    cursor: pointer;
    background-color: white;
    border-radius: 0.3em;
    margin: 0.3em 0;
    font-size: 15px;
  }
}
.text_nofification {
  position: absolute;
  background-color: red;
  color: white;
  border-radius: 15px;
  font-size: 15px;
  text-align: center;
  padding: 3px 7px;
  font-weight: 700;
  margin-left: -0.8rem;
  margin-top: -15px;
}
.ad_noti {
  background: wheat;
  width: 400px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  right: 0;
  position: absolute;
  border-radius: 0.5em;
  max-height: 95vh;
  overflow-y: auto;
  top: 1em;
  left: 6em;
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
  div {
    text-align: left;
    color: black;
  }
}
</style>
