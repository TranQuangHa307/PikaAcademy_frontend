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
              <p class="m-0 fw700 name_card_item">Likes</p>
              <h1> {{ course.likes }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="people-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Student</p>
              <h1>{{ course.purchases }}</h1>
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
              <p class="m-0 fw700 name_card_item">Frice</p>
              <h1>{{ getPrice(course.price) }}</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="credit-card2-front-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Discount</p>
              <h1>{{ course.discount }}%</h1>
            </div>
          </div>
          <div class="content_center" style="background-color: white; margin: 1em; padding: 1em; border-radius: 1em;">
            <div class="content_center mr-1" style="font-size: 3rem;">
              <b-icon icon="clock-fill" variant="info" />
            </div>
            <div class="text-center">
              <p class="m-0 fw700 name_card_item">Time Discount</p>
              <b>{{ convertTSToDateTime(course.discount_begin_date) }}</b> <br/> <b>{{ convertTSToDateTime(course.discount_end_date) }}</b>
            </div>
          </div>
        </div>
        <div style="background-color: white; margin: 1em 0; padding: 1em; border-radius: 1em;">
          <line-chart :data="chartData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseInfo, getListPriceByCourse } from '../../../api/course'
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
  },
  methods: {
    async getChartData() {
      const prices = await getListPriceByCourse(this.elmntId)
      if (prices) {
        let contentPrice = '{'
        for (let i = 0; i < prices.length; i++) {
          contentPrice += `"${this.convertTSToDateTime(prices[i].created_at)}" : ${prices[i].price}`
          if (i < prices.length - 1) contentPrice += ', '
        }
        contentPrice += '}'
        this.chartData = JSON.parse(contentPrice)
      }
    }
  }
}
</script>

