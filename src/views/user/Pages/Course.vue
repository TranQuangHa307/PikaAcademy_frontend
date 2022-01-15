<template>
  <div class="text-white pt-3">
    <div class="nav">
      <!-- Image and text -->
      <b-navbar variant="faded" type="light">
        <b-navbar-brand class="text_nav" href="/">
          {{ course.interests_name }}
        </b-navbar-brand>
        <b-navbar-brand class="text_nav">
          >
        </b-navbar-brand>
        <b-navbar-brand class="text_nav" href="/">
          {{ course.category_name }}
        </b-navbar-brand>
      </b-navbar>
    </div>
    <div class="main">
      <div class="content_course">
        <div>
          <div>
            <b-embed
              type="iframe"
              aspect="16by9"
              :src="dataView.url_video"
              allowfullscreen
            />
          </div>
          <div class="mt-2">
            <div class="content_center">
              <div class="w50 txt_left">
                <h1>{{ dataView.name }}</h1>
              </div>
              <div class="w50 txt_right">
                <b-button variant="danger" v-if="!course.user_purchase_course_is_rating && course.user_purchase_course_id" @click="openFormRating()">Rate</b-button>
              </div>
            </div>
            <p class="text_description_course" v-html=" course.description" />
          </div>
          <div>
            <router-link class="span_category" tag="span" :to="{ name: 'home'}">{{ course.category_name }}</router-link>
          </div>
          <div class="mt-5" style="display: flex; font-size: 0.875rem;">
            <div class="mr-5" style="display: flex;">
              <p class="pr-3"><b-icon icon="clock-fill" style="color: white;" /><span class="ml-2">{{ timeConvert(dataView.totalTime) }}</span></p>
              <p class="pr-3"><b-icon icon="play-fill" style="color: white;" /><span class="ml-2">{{ course.purchases }}</span></p>
              <p class="pr-3"><b-icon icon="star-fill" style="color: white;" /><span class="ml-2">{{ ratingNumber }}</span></p>
            </div>
            <div style="display: flex;">
              <p class="mr-3"><span>Created: {{ dateConvert(dataView.createdAt) }}</span></p>
              <p><span>Updated: {{ dateConvert(dataView.updatedAt) }}</span></p>
            </div>
          </div>
          <div>
            <div class="nav_content">
              <b-nav tabs fill style="margin-left: 0px; color: white;">
                <b-nav-item class="text-white" :active="comData.comName==='About'" @click="setNavCourse('About', dataView.about)">About</b-nav-item>
                <b-nav-item v-if="!course.user_purchase_course_id" class="text-white" :active="comData.comName==='Lessons'" @click="setNavCourse('Lessons', course.id)">Lessons</b-nav-item>
                <!-- <b-nav-item class="text-white">Lession</b-nav-item> -->
                <b-nav-item class="text-white" :active="comData.comName==='CourseRatings'" @click="setNavCourse('CourseRatings', course.id)">Course Ratings</b-nav-item>
                <!-- <b-nav-item class="text-white">Related</b-nav-item> -->
                <b-nav-item class="text-white" :active=" ['Material', 'Lock'].includes(comData.comName)" @click="setNavCourse('Material', course.id)">Material</b-nav-item>
              </b-nav>
            </div>
            <nav-course :data="comData" />
            <div>
              <h5 class="text_title">BENEFITS FROM THE COURSE</h5>
            </div>
            <div v-html="course.result" />
            <hr class="mt-5 mb-5" style="background-color: #feda6a;">
            <div>
              <h5 class="text_title">ABOUT TEACHER</h5>
            </div>
            <div style="display: flex; cursor: pointer;" @click="redirectToteacher(teacher.id)">
              <b-img :src="teacher.url_avatar" rounded="circle" width="80" height="80" alt="Circle image" />
              <div class="ml-2 mt-2">
                <h5>{{ teacher.full_name }}</h5>
                <div style="display: flex;">
                  <p class="pr-3"><b-icon icon="star-fill" style="color: white;" /><span class="ml-2">{{ teacher.rating }}</span></p>
                  <p class="pr-3"><b-icon icon="play-fill" style="color: white;" /><span class="ml-2">{{ teacher.number_course }}</span></p>
                  <p class="pr-3"><b-icon icon="person-circle" style="color: white;" /><span class="ml-2">{{ teacher.userTotal }}</span></p>
                </div>
              </div>
            </div>
            <div class="mt-4" v-html="teacher.about" />
            <hr class="mt-5 mb-5" style="background-color: #feda6a;">
          </div>
        </div>
      </div>
      <div class="content_chapter">
        <div v-if="course.user_purchase_course_id">
          <div v-for="(chapter, index) in chapters" :key="index">
            <div class="chapter">
              <div class="div_chapter">
                <div style="flex: 1 1 auto;" @click="selectedChapter(index)"><span class="title_chapter" :class="{ text_title: show.includes(index) }">Chapter {{ index + 1 }}: {{ chapter.name }}</span></div>
                <span class="mr-1 text_post">{{ chapter.sessions.length }} Post</span>
                <b-icon icon="chevron-right" style="color: #feda6a; opacity: 0.5;" />
              </div>
            </div>
            <hr style="margin-top: 0; margin-bottom: 0; background-color: #393f4d;">
            <div v-if="show.includes(index)">
              <div class="chapter">
                <div v-for="(session, indexS) in chapter.sessions" :key="indexS" class="div_chapter mt-2" @click="setDataView(session)">
                  <b-iconstack font-scale="2" class="ml-3 mr-2" style="background-color: white;">
                    <b-icon stacked scale="2" icon="youtube" style="color: #D4D4DC;" />
                  </b-iconstack>
                  <!-- <b-icon icon="youtube" font-scale="4" style="color: #D4D4DC; background-color: white;" /> -->
                  <div class="ml-3">
                    <span>{{ session.name }}</span>
                  </div>
                  <span class="mr-1 text_post" style="margin: auto; min-width: 45px;">{{ timeConvert(session.time) }} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mr-3">
          <div class="card card_img_2" style="color: white; border: 0; height: 800px;">
            <div class="card-body" :style="{ backgroundImage: 'url(' + course.url_image + ')' }" style="height: 500px; border-radius: 8px 8px 0px 0px; background-size: cover !important;" />
            <div class="card-footer" style="background-color: #2B2F38;">
              <div class="p-2">
                <div v-if="course.price>0" style="flex: 1 1 auto; justify-content: center;" class="text-center mb-2 items_center">
                  <span class="mb-0 mr-1" style="color: white; font-size: 28px;font-weight: bold;">{{ convertPrice(course.price, course.discount) }} VND</span>
                  <span v-if="course.discount" style="margin-bottom: 0;text-decoration-line: line-through;">{{ convertPrice(course.price) }} VND</span>
                </div>
                <div v-else class="pt-1 text-center mb-2" style="width: 100%; flex: 1 1 auto; display: flex;align-items: center;"><p class="mb-0" style="color: white; font-size: 28px;font-weight: bold;width: 100%;">FREE</p></div>
                <div style="align-items: center; display: flex;">
                  <b-button v-if="course.price===0" block style="height: 52px; background-color: #feda6a; width: 100%; border-radius: 50rem !important" @click="startCourse(course)">
                    START
                  </b-button>
                  <b-button v-else block style="height: 52px; background-color: #feda6a; width: 100%; border-radius: 50rem !important" @click="addCourseToCart(course, true)">
                    GET
                  </b-button>
                </div>
                <div v-if="course.price>0" class="mt-2" style="align-items: center; display: flex;">
                  <b-button block style="height: 52px; background-color: #F05D40; border-radius: 50rem !important" @click.prevent="addCourseToCart(course)">
                    <b-icon icon="cart-plus" aria-hidden="true" /> <span>Add to cart</span>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        id="modal-rating"
        ref="modal"
        v-model="isModalFormOpen"
        title="Rate Course"
        hide-footer
        hide-header-close
      >
        <rating :courseId="ratingData.courseId" :courseName="ratingData.courseName" :userPurchaseCourseId="ratingData.userPurchaseCourseId" @cancelFormRating="cancelFormRating" @updateRating="updateRating"/>
      </b-modal>
  </div>
</template>

<script>
import { getChapterList } from '../../../api/course'
import { getCourseInfo, getTeacherInfo, getTotalFollowers, getTeacherRating } from '../../../api/public'
import { addToCart } from '../../../api/cart'
import { transaction } from '../../../api/transaction'
import { getCourseRatingNumber } from '../../../api/rating'
import NavCourse from '../../../components/user/NavCourse/Index'
import Rating from '../../../components/user/Rating'
export default {
  components: {
    NavCourse,
    Rating
  },
  data() {
    return {
      show: [],
      dataView: {
        name: null,
        url_video: null,
        about: null,
        totalTime: 0,
        createdAt: null,
        updatedAt: null
      },
      course: {},
      teacher: {},
      chapters: [],
      comData: {
        comName: 'About',
        comData: null
      },
      ratingNumber: 0,
      isModalFormOpen: false,
      ratingData: {
        courseId: 0,
        courseName: null,
        userPurchaseCourseId: 0
      }
    }
  },
  created() {
    this.getCourse()
    this.getChapter()
  },
  methods: {
    openFormRating() {
      this.isModalFormOpen = true
      this.ratingData.courseId = this.course.id
      this.ratingData.courseName = this.course.name
      this.ratingData.userPurchaseCourseId = this.course.user_purchase_course_id
    },
    cancelFormRating() {
      this.isModalFormOpen = false
    },
    async updateRating() {
      this.ratingNumber = (!(await getCourseRatingNumber(this.course.id))) ? 0 : (await getCourseRatingNumber(this.course.id)).rating
      this.setNavCourse('CourseRatings', this.course.id)
      this.course.user_purchase_course_is_rating = true
    },
    redirectToteacher(teacherId) {
      this.$router.push({
        path: `/teacher/${teacherId}`
      })
    },
    setNavCourse(comName, comData) {
      if (this.course.user_purchase_course_id || comName !== 'Material') {
        this.comData.comName = comName
        this.comData.comData = comData
      } else {
        this.comData.comName = 'Lock'
        this.comData.comData = null
      }
    },
    selectedChapter(index) {
      if (this.show.includes(index)) {
        this.show.splice(this.show.indexOf(index), 1)
      } else {
        this.show.push(index)
      }
    },
    async getCourse() {
      const params = {
        'user_id': this.$store.state.User.myInfo ? this.$store.state.User.myInfo.id : null
      }
      this.course = await getCourseInfo(this.$route.params.id, params)
      this.dataView.name = this.course.name
      this.dataView.about = this.course.about
      this.dataView.url_video = this.course.url_intro_video
      this.dataView.createdAt = this.course.created_at
      this.dataView.updatedAt = this.course.updated_at
      this.teacher = await getTeacherInfo(this.course.teacher_id)
      this.teacher.userTotal = (!(await getTotalFollowers(this.course.teacher_id))) ? 0 : (await getTotalFollowers(this.course.teacher_id)).total
      this.teacher.rating = (!(await getTeacherRating(this.course.teacher_id))) ? 0 : (await getTeacherRating(this.course.teacher_id)).rating
      this.ratingNumber = (!(await getCourseRatingNumber(this.course.id))) ? 0 : (await getCourseRatingNumber(this.course.id)).rating
      this.setNavCourse('About', this.dataView.about)
    },
    async getChapter() {
      this.chapters = await getChapterList(this.$route.params.id)
      this.getTotalTime(this.chapters)
    },
    timeConvert(time) {
      const sec_num = parseInt(time, 10)
      const hours = Math.floor(sec_num / 3600)
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
      let seconds = sec_num - (hours * 3600) - (minutes * 60)
      let res_time = ''
      if (hours > 0) {
        if (hours < 10) res_time = `0${hours}:`
        else res_time = `${hours}:`
      }
      if (minutes < 10) minutes = `0${minutes}`
      if (seconds < 10) seconds = `0${seconds}`
      return `${res_time}${minutes}:${seconds}`
    },
    getTotalTime(arr) {
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].sessions.reduce((n, { time }) => n + time, 0)
      }
      this.dataView.totalTime = total
    },
    dateConvert(time) {
      const date = new Date(time * 1000)
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    },
    setDataView(data) {
      this.dataView.name = data.name
      this.dataView.totalTime = data.time
      this.dataView.url_video = data.url_video
      this.dataView.about = data.about
      this.dataView.createdAt = data.created_at
      this.dataView.updatedAt = data.updated_at
    },
    convertPrice(price, discount) {
      if (discount) {
        price = price * ((100 - discount) / 100)
      }
      return new Intl.NumberFormat('de-DE').format(price)
    },
    async addCourseToCart(course, isRedirect = false) {
      if (!this.$store.state.User.myCart) {
        this.$router.push({
          path: '/login'
        })
      } else {
        const params = {
          'cart_id': this.$store.state.User.myCart.id,
          'course_id': course.id
        }
        await addToCart(params)
        this.$swal({
          toast: true,
          icon: 'success',
          title: 'The course has been added to your cart!',
          animation: false,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        this.$store.commit('User/ADD_CART')
        if (isRedirect) {
          this.$router.push({
            path: '/cart'
          })
        }
      }
    },
    async startCourse(course) {
      if (!this.$store.state.User.myInfo) {
        this.$router.push({
          path: '/login'
        })
      } else {
        debugger
        const body = {
          'user_id': this.$store.state.User.myInfo.id,
          'first_name': this.$store.state.User.myInfo.first_name,
          'last_name': this.$store.state.User.myInfo.last_name,
          'email': this.$store.state.User.myInfo.email,
          'phone_number': this.$store.state.User.myInfo.phone_number,
          'voucher_id': null,
          'discount': 0,
          'total': 0,
          'payment_mode': null,
          'status': 'success',
          'transaction_course': [
            {
              'course_id': course.id,
              'course_name': course.name,
              'price_id': course.price_id,
              'price': course.price,
              'discount_promotion_id': course.discount_promotion_id,
              'discount': course.discount ? course.discount : 0
            }
          ]
        }
        await transaction(body)
        this.$swal({
          toast: true,
          icon: 'success',
          title: 'The course has been added to your learning!',
          animation: false,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        this.getCourse()
        this.getChapter()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.items_center {
  display: flex;
  align-items: center;
}
.card_img_2 {
  background-size: cover !important;
  border-radius: 10px !important;
}
.chapter {
  :hover {
    background-color: #2F3033;
    cursor: pointer;
  }
}
.div_chapter {
  display: flex;
  align-items:
  center; padding: 10px;
}
.title_chapter {
  color: white;
  font-size: 13px;
  line-height: 20px;
  text-transform: uppercase;
}
.text_post {
  color: white;
  width: 75px;
  opacity: 0.5;
  font-size: 13px;
  min-width: 75px;
  align-self: start;
  margin-top: 4px;
  text-align: right;
  line-height: 18px;
}
.text_title {
  color: #feda6a;
  text-transform: uppercase;
}
.nav_content {
  border-bottom: 1px solid #feda6a;
  a {
    color: #79797C;
    background-color: transparent !important;
    text-transform: uppercase;
    font-size: 0.875rem;
  }
  .active {
    border-color: #feda6a;
    color: #feda6a;
  }
}
.span_category {
  color: #686A70;
  font-weight: bold;
  border-radius: 20px;
  background-color: #2B2E37;
  padding: 10px;
  font-size: 0.875rem;
}
.text_description_course {
  color: white;
  padding: 20px 20px 0px 0px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.08px;
}
.main {
  display: flex;
  margin-top: 20px;
  margin-bottom: 0px;
  flex-direction: row;
}
.content_course {
  width: 69.64vw;
  padding-left: 40px;
  padding-right: 20px;
}
.content_chapter {
  width: 29vw;
  height: 800px;
  overflow-y: auto;
}
.text_nav {
  color: #d4d4dc;
  font-size: 13px;
  line-height: 18px;
}
.nav {
  margin-left: 25px;
  a:hover{
    color: #d4d4dc;
    text-decoration: none;
  }
}
</style>
