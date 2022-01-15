<template>
  <div class="te_main">
    <div class="content_center">
      <div class="content_center" style="background-color: white; margin: 1em 0; padding: 1em; border-radius: 1em;">
        <div class="content_center mr-1" style="font-size: 3rem;">
          <b-icon icon="collection-play-fill" variant="info" />
        </div>
        <div class="text-center">
          <p class="m-0 fw700 name_card_item">Total Courses</p>
          <h1> {{ totalCourse }}</h1>
        </div>
      </div>
      <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
        <div class="content_center mr-1" style="font-size: 3rem;">
          <b-icon icon="person-check-fill" variant="info" />
        </div>
        <div class="text-center">
          <p class="m-0 fw700 name_card_item">Follower</p>
          <h1> {{ follower }}</h1>
        </div>
      </div>
      <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
        <div class="content_center mr-1" style="font-size: 3rem;">
          <b-icon icon="people-fill" variant="info" />
        </div>
        <div class="text-center">
          <p class="m-0 fw700 name_card_item">Student</p>
          <h1>{{ totalUser }}</h1>
        </div>
      </div>
      <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
        <div class="content_center mr-1" style="font-size: 3rem;">
          <b-icon icon="star-fill" variant="info" />
        </div>
        <div class="text-center">
          <p class="m-0 fw700 name_card_item">Rating</p>
          <h1>{{ ratingComputed }}</h1>
        </div>
      </div>
      <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
        <div class="content_center mr-1" style="font-size: 3rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-currency-dollar text-info" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
        </div>
        <div class="text-center">
          <p class="m-0 fw700 name_card_item">Income</p>
          <h1>{{ getPrice(total) }}</h1>
        </div>
      </div>
    </div>
    <div style="background-color: white; margin: 1em 0; padding: 1em; border-radius: 1em;">
      <line-chart :data="chartData"></line-chart>
    </div>
    <div class="d_flex w100">
      <div class="w45 te_dash_top_course">
        <ul class="te_info_list_item mt-3">
          <h4>Top 5 purchased courses</h4>
          <li v-for="(course, index) in topCoursePurchases" :key="index">
            <div class="mr-2">
              <b-img :src="course.url_image" />
            </div>
            <div class="flex1">
              <div>
                <b>{{ course.name }}</b>
              </div>
              <div>
                <span class="mr-2"><b>Likes:</b> {{ course.likes }}</span>
                <span class="mr-2"><b>Purchases:</b> {{ course.purchases }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w10" />
      <div class="w45 te_dash_top_course">
        <ul class="te_info_list_item mt-3">
          <h4>Top 5 most popular courses</h4>
          <li v-for="(course, index) in topCourseLike" :key="index">
            <div class="mr-2">
              <b-img :src="course.url_image" />
            </div>
            <div class="flex1">
              <div>
                <b>{{ course.name }}</b>
              </div>
              <div>
                <span class="mr-2"><b>Likes:</b> {{ course.likes }}</span>
                <span class="mr-2"><b>Purchases:</b> {{ course.purchases }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseListOfTeacher, getTeacherRating } from '../../../../api/public'
import { getUserListByTecherId } from '../../../../api/teacher'
import { getTransactionListByTeacher } from '../../../../api/transaction.js'
import { getTopCourseByTeacher } from '../../../../api/course'
export default {
  data() {
    return {
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
      return this.$store.state.Teacher.myInfo.followed
    },
    ratingComputed() {
      return this.rating
    }
  },
  async created() {
    this.getDataTotal()
    this.getChartData()
    await this.getTopCourse()
    this.rating = (!(await getTeacherRating(this.$store.state.Teacher.myInfo.id))) ? 0 : (await getTeacherRating(this.$store.state.Teacher.myInfo.id)).rating
  },
  methods: {
    async getTopCourse() {
      this.topCourseLike = await getTopCourseByTeacher(this.$store.state.Teacher.myInfo.id, 'like')
      this.topCoursePurchases = await getTopCourseByTeacher(this.$store.state.Teacher.myInfo.id, 'purchases')
    },
    async getDataTotal() {
      const params = {
        page: 1,
        teacher_id: this.$store.state.Teacher.myInfo.id,
        limit: 10,
        keyword: ''
      }
      const courses = await getCourseListOfTeacher(params)
      this.totalCourse = courses.total
      const users = await getUserListByTecherId(params, this.$store.state.Teacher.myInfo.id)
      this.totalUser = users.total
    },
    async getChartData() {
      const transactions = await getTransactionListByTeacher(this.$store.state.Teacher.myInfo.id)
      let content = '{'
      var arr = []
      for (let i = 0; i < transactions.length; i++) {
        const elmnt = arr.find(item => item.time === this.convertTSToDateTime(transactions[i].time).split(' ')[0])
        if (!elmnt) {
          arr.push({
            time: this.convertTSToDateTime(transactions[i].time).split(' ')[0],
            total: transactions[i].total
          })
        } else {
          arr[arr.indexOf(elmnt)].total += transactions[i].total
        }
        this.total += transactions[i].total
      }
      for (let j = 0; j < arr.length; j++) {
        content += `"${arr[j].time}": ${arr[j].total}`
        if (j < (arr.length - 1)) content += ', '
      }
      content += '}'
      this.chartData = JSON.parse(content)
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
