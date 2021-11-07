<template>
  <div class="row">
    <div v-for="(course, index) in data" :key="index" class="mb-3" :class="[{ 'p-0': isPading }, `col-md-${col}`]">
      <div class="card card_img" style="color: white; border: 0" :style="{ backgroundImage: 'url(' + course.url_image + ')' }">
        <div class="card-header" style="border: 0">
          <div style="cursor: pointer;" @click="likeCourse(course)">
            <b-icon v-if="course.user_like_course_id" icon="heart-fill" /> <b-icon v-else icon="heart" /> <span>{{ course.likes }}</span>
          </div>
        </div>
        <div class="card-body">
          <div>
            <h3 class="card-title text_description" style="margin-top: 6rem !important;">{{ course.name }}</h3>
          </div>
        </div>
        <div class="card-footer mt-2 footer_card">
          <div v-if="course.user_purchase_course_id" style="justify-content: end; align-items: center; width: 100%; display: flex; min-height: 50px;">
            <div>
              <router-link tag="button" :to="{ name: 'course', params: { id: course.id }}" class="btn btn-outline-info mb-1" style="width: 80px; border-radius: 50rem !important; color: white;">LEARN</router-link>
            </div>
          </div>
          <div v-else style="width: 100%; display: flex; height: 50px;">
            <div v-if="course.price>0" style="flex: 1 1 auto;" :class="{items_center: !course.discount}">
              <p class="text_price mb-0">{{ convertPrice(course.price, course.discount) }} VND</p>
              <p v-if="course.discount" style="font-size: 13px; margin-bottom: 0;text-decoration-line: line-through;">{{ convertPrice(course.price) }} VND</p>
            </div>
            <div v-else class="pt-1" style="flex: 1 1 auto; display: flex;align-items: center;"><p class="text_price mb-0">FREE</p></div>
            <div style="align-items: center; display: flex;">
              <router-link v-if="course.price===0" tag="button" :to="{ name: 'course', params: { id: course.id }}" class="btn btn-outline-info" style="width: 80px; border-radius: 50rem !important">START</router-link>
              <router-link v-else tag="button" :to="{ name: 'course', params: { id: course.id }}" class="btn btn-outline-info" style="width: 80px; border-radius: 50rem !important">GET</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLikeCourse } from '../../api/user'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: () => 3
    },
    isPading: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    async likeCourse(course) {
      const myInfo = this.$store.state.User.myInfo
      if (myInfo) {
        console.log('ahihi')
        const params = {
          'course_id': course.id,
          'user_id': myInfo.id
        }
        course.user_like_course_id = await userLikeCourse(params)
        if (course.user_like_course_id) course.likes++
        else course.likes--
        if (this.$route.name === 'wishlistUser' && !course.user_like_course_id) {
          this.data.splice(this.data.indexOf(course), 1)
        }
      } else {
        this.$swal({
          toast: true,
          icon: 'error',
          title: 'You need to login to perform this action!',
          animation: false,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }
    },
    convertPrice(price, discount) {
      if (discount) {
        price = price * ((100 - discount) / 100)
      }
      price = price - 1000
      return new Intl.NumberFormat('de-DE').format(price)
    }
  }

}
</script>

<style lang="scss">
.items_center {
  display: flex;
  align-items: center;
}
.text_description {
  width: 100%;
  height: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card_img {
  height: 480px;
  max-width: 350px;
  background-size: cover !important;
  border-radius: 14px !important;
}
.footer_card {
  width: 100%;
  padding-top: 15px;
  bottom: 0px;
  display: flex;
  backdrop-filter: blur(30px);
  justify-content: space-between;
  border-radius: 0 0 14px 14px !important;
}
.text_price {
  font-size: 18px;
  font-style: normal;
  text-align: left;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
}
</style>
