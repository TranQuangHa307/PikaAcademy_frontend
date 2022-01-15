<template>
  <div class="te_sidebar">
    <div class="content_center">
      <b-img id="tooltip-target-1" src="https://firebasestorage.googleapis.com/v0/b/sandrasoft-8fe2b.appspot.com/o/public%2Ffile%2Fstartup.png?alt=media&token=9b8785a7-1981-4672-a2a0-6cb203534fd8" rounded="circle" alt="Circle image"></b-img>
    </div>
    <div class="h85 content_center">
      <ul>
        <router-link tag="li" v-for="(item, index) in items" :key="index" :to="item.to">
          <b-icon :icon="item.icon" font-scale="2" />
          <br/>
          {{ item.title }}
        </router-link>
        <li @click="onOpenConfirmLogout()">
          <b-icon icon="power" font-scale="2" />
          <br/>
          Logout
        </li>
      </ul>
    </div>
    <b-modal
        v-if="isModelLogoutOpen"
        id="modal-delete-interests"
        v-model="isModelLogoutOpen"
        title="Please Confirm"
        size="sm"
        button-size="sm"
        ok-variant="danger"
        ok-title="YES"
        cancel-title="NO"
        footer-class="p2"
        hide-header-close
        @cancel="onCancelLogout()"
        @ok="logout()"
      >Are you sure you want logout?</b-modal>
  </div>
</template>

<script>
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
          title: 'Course',
          to: '/teachermanager/course',
          icon: 'collection-play-fill'
        },
        {
          title: 'Student',
          to: '/teachermanager/user',
          icon: 'people-fill'
        },
        {
          title: 'Follower',
          to: '/teachermanager/follower',
          icon: 'person-check-fill'
        },
        {
          title: 'Profile',
          to: '/teachermanager/profile',
          icon: 'person-circle'
        }
      ],
      isModelLogoutOpen: false
    }
  }, methods: {
    onOpenConfirmLogout() {
      this.isModelLogoutOpen = true
    },
    onCancelLogout() {
      this.isModelLogoutOpen = false
    },
    logout() {
      this.$store.dispatch('Teacher/logout')
      this.$router.push({ name: 'loginTeacher' })
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
</style>
