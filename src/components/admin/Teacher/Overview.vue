<template>
  <div>
    <div class="table-users pt-5 pb-5">
      <div class="te_main">
        <div class="content_center">
          <div class="content_center" style="background-color: white; margin: 1em 0; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="collection-play-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Khoá học</p>
              <h1> {{ totalCourse }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="heart-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Lượt thích</p>
              <h1> {{ likes }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="person-check-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Lượt theo dõi</p>
              <h1> {{ follower }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="people-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Học sinh</p>
              <h1>{{ totalUser }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="star-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Đánh giá</p>
              <h1>{{ ratingComputed }}</h1>
            </div>
          </div>
        </div>
        <div class="d_flex w100">
          <div class="w45 te_dash_top_course">
            <ul class="te_list_item mt-3">
              <h4>5 khoá học được đăng ký nhiều nhất</h4>
              <li v-for="(course, index) in topCoursePurchases" :key="index">
                <div class="mr-2">
                  <b-img :src="course.url_image" />
                </div>
                <div class="flex1">
                  <div>
                    <b>{{ course.name }}</b>
                  </div>
                  <div>
                    <span class="mr-2"><b>Lượt thích:</b> {{ course.likes }}</span>
                    <span class="mr-2"><b>Lượt đăng ký:</b> {{ course.purchases }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="w10" />
          <div class="w45 te_dash_top_course">
            <ul class="te_list_item mt-3">
              <h4>5 khoá học được yêu thích nhất</h4>
              <li v-for="(course, index) in topCourseLike" :key="index">
                <div class="mr-2">
                  <b-img :src="course.url_image" />
                </div>
                <div class="flex1">
                  <div>
                    <b>{{ course.name }}</b>
                  </div>
                  <div>
                    <span class="mr-2"><b>Lượt thích:</b> {{ course.likes }}</span>
                    <span class="mr-2"><b>Lượt đăng ký:</b> {{ course.purchases }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseListOfTeacher, getTeacherRating } from '../../../api/public'
import { getUserListByTecherId, getTeacherInfo } from '../../../api/teacher'
import { getTopCourseByTeacher } from '../../../api/course'
export default {
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      teacher: {},
      allCourses: [],
      totalUser: 0,
      totalCourse: 0,
      total: 0,
      chartData: {
        '2021-01-01': 2,
        '2021-01-02': 3,
        '2021-01-03': 10
      },
      selectedDelete: {},
      topCourseLike: [],
      topCoursePurchases: [],
      rating: 0
    }
  },
  computed: {
    follower() {
      return this.teacher.followed
    },
    likes() {
      return this.teacher.likes
    },
    ratingComputed() {
      return this.rating
    }
  },
  async created() {
    this.getDataTotal()
    await this.getTopCourse()
    this.rating = (!(await getTeacherRating(this.elmntId))) ? 0 : (await getTeacherRating(this.elmntId)).rating
    this.teacher = await getTeacherInfo(this.elmntId)
    console.log(this.teacher)
  },
  methods: {
    async getTopCourse() {
      this.topCourseLike = await getTopCourseByTeacher(this.elmntId, 'like')
      this.topCoursePurchases = await getTopCourseByTeacher(this.elmntId, 'purchases')
    },
    async getDataTotal() {
      const params = {
        page: 1,
        teacher_id: this.elmntId,
        limit: 10,
        keyword: ''
      }
      const courses = await getCourseListOfTeacher(params)
      this.totalCourse = courses.total
      const users = await getUserListByTecherId(params, this.elmntId)
      this.totalUser = users.total
    }
  }
}
</script>

<style lang="scss" scoped>
.te_list_item {
  list-style-type: none;
  padding-inline-start: 0;
  font-size: 15px;
  li {
    background-color: white;
    border-radius: 1em;
    padding: 0.2em;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    margin: 1.5em 0;
  }
  li:hover {
    background-color: wheat;
  }
  img {
    width: 40px;
    height: 40px;
  }
}
.te_main {
  height: 90vh;
  overflow: auto;
}

.te_dash_top_course {
  background-color: wheat;
  padding: 0.5em;
  padding-top: 0;
  border-radius: 1em;
  .title {
    color: blue;
  }
}
</style>
