<template>
  <div class="locaton_header">
    <div>
      <b-navbar toggleable="lg" class="pr-5 pl-5 bg_header">
        <b-navbar-brand href="#" class="flex1">
          <router-link :to="{name: 'home'}" tag="div">
            <b-img src="https://i.pinimg.com/originals/9a/5f/ac/9a5faca1071eed2426e178838514caf2.jpg" class="mr-1 img_profile" />
            <!-- <b-icon icon="layers-fill" variant="success" class="mr-1" /> -->
            <span class="text_logo ">PIKAACADEMY</span>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-2">

          <b-navbar-nav id="nav-collapse" is-nav>
            <b-collapse id="nav-collapse" is-nav>
              <b-nav-form class="mr-2">
                <b-input-group class="form__search">
                  <template #append>
                    <b-input-group-text class="bg-t border__n"> <b-icon icon="search" variant="white" /></b-input-group-text>
                  </template>
                  <b-form-input v-model="searchKey" class="bg-t border__n text-white" placeholder="Tìm kiếm" @keydown.enter.prevent="onSearch" />
                </b-input-group>
              </b-nav-form>

              <b-navbar-nav>
                <b-nav-item class="btn_mb">
                  <router-link :to="{name: 'interestsUser'}" tag="div">
                    <b-icon icon="x-diamond-fill" variant="white" class="mr-1" /><span class="text-white">Khoá học</span>
                  </router-link>
                </b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-if="user">
                <b-nav-item class="flex">
                  <div class="flex" @click="onSeenNotification()">
                    <b-icon icon="bell-fill" variant="white" class="mr-1" />
                    <span v-if="number > 0" class="text_nofification">{{ number }}</span>
                    <span class="text-white" :class="{ text_cart: (number > 0) }">Thông báo</span>
                  </div>
                </b-nav-item>
              </b-navbar-nav>

              <b-navbar-nav v-if="user">
                <b-nav-item href="/wishlist"><b-icon icon="heart" variant="white" class="mr-1" /><span class="text-white">Khoá học yêu thích</span></b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-if="user">
                <b-nav-item href="/my-courses">
                  <b-icon icon="play" variant="white" scale="1.5" class="mr-1" /><span class="text-white">Khoá học đã đăng ký</span>
                </b-nav-item>
              </b-navbar-nav>

              <b-navbar-nav v-if="!user">
                <b-button :to="{ name: 'loginUser' }" class="mr-2 text-white btn_login btn_mb" variant="outline-dark">Đăng nhập</b-button>
                <b-button :to="{ name: 'signUpUser' }" class="btn_singup btn_mb" variant="outline-success">Đăng ký</b-button>
              </b-navbar-nav>
              <b-navbar-nav v-else class="ml-2 drop_info">
                <b-nav-item-dropdown toggle-class="text-decoration-none" style="background-color: #1D1E22;" right no-caret>
                  <template #button-content>
                    <b-img rounded="circle" :src="user.url_avatar" class="img_profile" />
                  </template>
                  <b-dropdown-item class="p-2 drop_profile " :to="{ name: 'profileUser' }">
                    <b-icon icon="person-circle" variant="white" class="mr-3" />
                    <span class="text-white">Thông tin cá nhân</span>
                  </b-dropdown-item>
                  <b-dropdown-item class="p-2 drop_profile " :to="{ name: 'teacherRegister' }">
                    <b-icon icon="people-fill" variant="white" class="mr-3" />
                    <span class="text-white">Đăng ký trờ thành giáo viên</span>
                  </b-dropdown-item>
                  <b-dropdown-item class="p-2 drop_item_logout" @click="logout()">
                    <b-icon icon="box-arrow-right" variant="danger" class="mr-3" />
                    <span class="text-white">Đăng xuất</span>
                  </b-dropdown-item>
                </b-nav-item-dropdown>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div v-if="isShowNoti" class="ad_noti">
      <ul>
        <li v-for="(notification, index) in notifications" :key="index+100" @click="redirectToCourse(notification.action_id, notification.type)">
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
import eventBus from '../../utils/eventBus'
import { getByUser, seenNotification } from '../../api/notification'
export default {
  data() {
    return {
      searchKey: null,
      numberPT: 0,
      isShowNoti: false,
      notifications: []
    }
  },
  computed: {
    user: function() {
      return this.$store.state.User.myInfo
    },
    number() {
      return this.numberPT
    }
  },
  async created() {
    await this.getDataNoti()
  },
  methods: {
    logout() {
      this.$store.dispatch('User/logout')
      this.$router.push('/login')
    },
    onSearch: function() {
      if (this.$route.name === 'search') {
        eventBus.$emit('search', this.searchKey)
      } else {
        this.$store.state.User.searchKey = this.searchKey
        this.$router.push({
          name: `search`
        })
      }
      this.searchKey = null
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
      this.notifications = await getByUser(this.$store.state.User.myInfo.id)
      var notificationsNew = this.notifications.filter(x => x.is_seen == null).map(x => x.id)
      this.numberPT = notificationsNew.length
    },
    redirectToCourse(courseId, type) {
      let path = `/course/${courseId}`
      if (type !== 4) {
        path = `${path}?name=Comment`
      }
      this.$router.push({
        path: path
      })
      this.isShowNoti = !this.isShowNoti
    },
    getIconNotification(role) {
      var res = null
      switch (role) {
        case 1:
          res = 'bell'
          break
        case 2:
          res = 'bell'
          break
        case 3:
          res = 'bell'
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
.text_nofification {
    position: relative;
    background-color: red;
    color: white;
    border-radius: 15px;
    font-size: 12px;
    text-align: center;
    width: 1.5em;
    font-weight: 700;
    height: 1.5em;
    top: -0.8em !important;
    margin-left: -0.8em;
}

.text_cart {
  margin-left: -0.5em;
}

.drop_profile {
  background-color: #1D1E22;
  margin-top: -0.6rem;
  border-bottom: 1px solid pink;
}

.drop_item_logout {
  background-color: #1D1E22;
  margin-bottom: -0.6rem;
}

.text_logo {
  font-style: italic;
  font-weight: bolder;
  color: #bae910;
  text-shadow: 5px 2px 4px grey;
}

.img_profile {
  margin: -0.5rem;
  width: 50px;
  height: 50px;
}

.btn_login {
  background-color: #28a745;
  width: 120px;
  height: 40px;
  font-weight: bold;
}

.btn_singup {
  width: 120px;
  height: 40px;
  font-weight: bold;
}

.drop_info {
  :hover {
      background-color: #1D1E22;
    }
}

.dropdown-toggle::after {
    display: none !important;
}

.locaton_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.bg_header {
  background-color: #242529;
}

.form__search {
  border-radius: 2rem;
  border: 2px solid;
  background-color: transparent;
  border-color: hsla(0,0%,100%,.6);
  width: 500px;
}

@media only screen and (max-width: 1024px) {
  .btn_mb {
    text-align: center;
    width: 100%;
    margin: 10px 0;
    border: 1px solid white;
    border-radius: 0.25rem;
  }
  .form__search {
    margin-bottom: 5px;
    border-color: white;
    width: 275px;
  }
}
.border__n {
  border: 0;
}
.bg-t {
  background-color: transparent !important;
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
  top: 3em;
  right:11em;
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
