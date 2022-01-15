<template>
  <div class="container-fluid">
    <div class="ad_nav_tabs">
      <ul>
        <li :class="{ is_active: comName === 'Details' }" @click="setCom('Details')">Profile</li>
        <li :class="{ is_active: comName === 'Overview' }" @click="setCom('Overview')">Overview</li>
        <li :class="{ is_active: comName === 'Course' }" @click="setCom('Course')">Course</li>
        <li :class="{ is_active: comName === 'Student' }" @click="setCom('Student')">Student</li>
        <li :class="{ is_active: comName === 'Follower' }" @click="setCom('Follower')">Follower</li>
      </ul>
    </div>
    <div>
      <component :is="comNameComputed" :elmntId="comDataComputed" />
    </div>
  </div>
</template>

<script>
import Details from '../../../../components/admin/Teacher/Details'
import Overview from '../../../../components/admin/Teacher/Overview'
import Course from '../../../../components/admin/Teacher/Course'
import Student from '../../../../components/admin/Teacher/Student'
import Follower from '../../../../components/admin/Teacher/Follower'
export default {
  components: {
    Details,
    Overview,
    Course,
    Student,
    Follower
  },
  data() {
    return {
      comName: 'Details',
      elmntId: this.$route.params.id
    }
  },
  computed: {
    comNameComputed() {
      return this.comName
    },
    comDataComputed() {
      if (this.elmntId) return parseInt(this.elmntId)
      else return 0
    }
  },
  methods: {
    setCom(comName) {
      this.comName = comName
    }
  }
}
</script>

<style lang="scss" scoped>
.ad_nav_tabs {
  ul {
    display: flex;
    list-style-type: none;
    padding-inline-start: 0;
    li {
      margin: 0.5em 0.5em 0 1em;
      cursor: pointer;
      padding: 0 0.5em;
      background-color: #FFFFFF;
      min-width: 110px;
      text-align: center;
      box-shadow: 3px 3px 0 rgb(0 0 0 / 10%);
      font-size: 20px;
      font-weight: bold;
    }

    li:active {
      transform: translateY(2px);
    }

    .is_active {
      background-color: wheat;
    }

    .is_active::after {
      content: ' 	●';
      color: pink;
    }

  }
  .ad_nav_tabs_items {
    margin: 1em;
  }
}
</style>

