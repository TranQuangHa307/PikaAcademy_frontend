<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Học Sinh" :active="this.com.comName=='User'" @click="changeCom('User')" />
      <b-tab title="Đánh giá" :active="this.com.comName=='Rating'" @click="changeCom('Rating')" />
      <b-tab title="Bình luận" :active="this.com.comName=='Comment'" @click="changeCom('Comment')" />
    </b-tabs>
    <div>
      <component :is="comNameComputed" :elmnt-id="comDataComputed" />
    </div>
  </div>
</template>

<script>
import User from './User'
import Rating from './Rating'
import Comment from './Comment'
export default {
  components: {
    User,
    Rating,
    Comment
  },
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      com: {
        comName: 'User',
        comData: this.elmntId
      }
    }
  },
  computed: {
    comNameComputed() {
      return this.com.comName
    },
    comDataComputed() {
      return this.elmntId
    }
  },
  watch: {
    elmntId(newValue, oldValue) {
      this.com.comName = 'User'
      this.comData = newValue
      this.changeCom('User')
    },
    $route(to, from) {
      const name = to.query.itemName
      this.com.comData = to.params.id
      if (name) {
        this.com.comName = name
        this.changeCom(this.com.comName)
      }
    }
  },
  created() {
    if (this.$route.query.itemName) {
      this.com.comName = this.$route.query.itemName
    }
  },
  methods: {
    changeCom(comName) {
      this.com.comName = comName
    }
  }
}
</script>

