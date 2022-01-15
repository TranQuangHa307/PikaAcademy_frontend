<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Student" @click="changeCom('User')" active></b-tab>
      <b-tab title="Rating" @click="changeCom('Rating')"></b-tab>
    </b-tabs>
    <div>
      <component :is="comNameComputed" :elmntId="comDataComputed" />
    </div>
  </div>
</template>

<script>
import User from './User'
import Rating from './Rating'
export default {
  components: {
    User,
    Rating
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
  methods: {
    changeCom(comName) {
      this.com.comName = comName
    }
  }
}
</script>

