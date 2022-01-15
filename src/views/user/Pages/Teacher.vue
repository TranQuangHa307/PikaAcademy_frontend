<template>
  <div class="text-white pt-3">
    <div class="main">
      <div class="nav">
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
          <b-navbar-brand class="text_nav" href="/">
            Home
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            >
          </b-navbar-brand>
          <b-navbar-brand class="text_nav" href="/">
            Teacher
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="mt-3" style="display: flex;">
        <div class="left_main">
          <b-img width="200" height="200" style="border: 3px solid #feda6a; height: 200px; width: 200px;" rounded="circle" :src="teacher.url_avatar" />
          <hr style="background-color: #feda6a; width: 100%;">
          <div>
            <p class="pr-3"><b-icon icon="play-fill" style="color: white;" font-scale="1.2" /><span class="ml-2">Courses: {{ courses.total }}</span></p>
            <p class="pr-3"><b-icon icon="star-fill" style="color: white;" font-scale="1.2" /><span class="ml-2">Rating: {{ teacher.rating }}</span></p>
            <p class="pr-3"><b-icon icon="person-circle" style="color: white;" font-scale="1.2" /><span class="ml-2">Followers: {{ teacher.userTotal }}</span></p>
          </div>
        </div>
        <div class="pt-4" style="width: 100%;">
          <div class="header_right_main">
            <h1 style="flex: 1 1 auto;">{{ teacher.full_name }}</h1>
            <b-button pill variant="outline-info" @click="isFollowed()">{{ (!followComputed) ? 'FOLLOW' : 'FOLLOWED' }}</b-button>
          </div>
          <div class="pl-3 mt-3">
            <div>
              <h5 class="text_title">about</h5>
              <div v-html="teacher.about" />
            </div>
            <div class="mt-5">
              <h5 class="text_title">TOP COURSES</h5>
              <course-list :data="courses.data" :col="4" :is-pading="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { followedTeacher } from '../../../api/followed'
import { getTeacherInfo, getCourseListOfTeacher, getTeacherRating, getFollowed, getTotalFollowers } from '../../../api/public'
import CourseList from '../../../components/user/CourseList.vue'
export default {
  components: {
    courseList: CourseList
  },
  data() {
    return {
      teacher: {},
      courses: {
        data: [],
        total: 0
      },
      followed: {}
    }
  },
  computed: {
    followComputed() {
      if (!this.followed) {
        return false
      }
      return this.followed.is_active
    }
  },
  async created() {
    this.teacher = await getTeacherInfo(this.$route.params.id)
    this.teacher.rating = (!(await getTeacherRating(this.$route.params.id))) ? 0 : (await getTeacherRating(this.$route.params.id)).rating
    this.teacher.userTotal = (!(await getTotalFollowers(this.$route.params.id))) ? 0 : (await getTotalFollowers(this.$route.params.id)).total
    this.followed = await getFollowed(this.$store.state.User.myInfo.id, this.$route.params.id)
    this.getCourses(this.teacher.id)
  },
  methods: {
    async getCourses(teacherId) {
      const params = {
        teacher_id: teacherId,
        user_id: this.$store.state.User.myInfo.id,
        page: 1,
        limit: 12
      }
      const { list, total } = await getCourseListOfTeacher(params)
      this.courses.data = list
      this.courses.total = total
    },
    async isFollowed() {
      try {
        if (!this.followed) {
          this.followed = {
            'teacher_id': parseInt(this.$route.params.id),
            'user_id': this.$store.state.User.myInfo.id,
            'is_active': true
          }
        }
        const follow = await followedTeacher(this.followed)
        this.followed.is_active = follow
        if (!follow) (this.teacher.userTotal--)
        else (this.teacher.userTotal++)
        this.showResAction('success', (!follow) ? 'Unfollow' : 'Followed')
      } catch (error) {
        this.showResAction('danger', error.response?.data?.message || error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  max-width: 67vw;
}
.left_main {
  float: left;
  width: 244px;
  height: auto;
  display: flex;
  padding: 25px;
  flex-direction: column;
}
.header_right_main {
  display: flex;
  width: 100%;
  font-size: 34px;
  line-height: 44px;
  align-items: center;
}
.text_nav {
  color: #d4d4dc;
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
}
.text_title {
  color: #feda6a;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 400;
}
.nav {
  a:hover{
    color: #d4d4dc;
    text-decoration: none;
  }
}
</style>
