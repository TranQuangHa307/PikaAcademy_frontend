<template>
  <div>
    <div class="table-users pt-5 pb-5">
      <div class="te_main">
        <div class="content_center">
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="heart-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Lượt thích</p>
              <h1> {{ course.likes }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="people-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Lượt đăng ký</p>
              <h1>{{ course.purchases }}</h1>
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
        <div style="background-color: white; margin: 1em 0; padding: 1em; border-radius: 1em;">
          <line-chart :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseInfo } from '../../../api/course'
import { getCourseRatingNumber } from '../../../api/rating'
export default {
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      course: {},
      ratingNumber: 0,
      chartData: []
    }
  },
  computed: {
    likes() {
      return this.teacher.likes
    },
    ratingComputed() {
      return this.ratingNumber
    }
  },
  async created() {
    this.course = await getCourseInfo(this.elmntId)
    this.ratingNumber = (!(await getCourseRatingNumber(this.course.id))) ? 0 : (await getCourseRatingNumber(this.course.id)).rating
    await this.getChartData()
    console.log(this.chartData)
  }
}
</script>

