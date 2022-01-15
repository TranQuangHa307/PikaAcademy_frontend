<template>
  <div>
    <div>
      <ul class="te_info_list_item mt-3">
        <h3>Top 5 most popular courses</h3>
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
    <hr/>
    <div>
      <ul class="te_info_list_item">
        <h3>Top 5 purchased courses</h3>
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
</template>

<script>
import { getTopCourseByTeacher } from '../../../api/course.js'
export default {
  data() {
    return {
      topCourseLike: [],
      topCoursePurchases: []
    }
  },
  async created() {
    await this.getTopCourse()
  },
  methods: {
    async getTopCourse() {
      this.topCourseLike = await getTopCourseByTeacher(this.$store.state.Teacher.myInfo.id, 'like')
      this.topCoursePurchases = await getTopCourseByTeacher(this.$store.state.Teacher.myInfo.id, 'purchases')
    }
  }
}
</script>

<style lang="scss">
.te_info_list_item {
  li{
    height: auto;
    font-size: 15px;
    padding: 0.5em;
    margin: 0.5em;
    img{
      height: 50px;
      width: 50px;
    }
  }
}
</style>
