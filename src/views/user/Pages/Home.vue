<template>
  <div>
    <div style="height: calc(100vh - 250px)">
      <div class="pix-main-intro pix-intro-1 bg-gray-8">
        <div class="pix-intro-img jarallax pix-loaded" data-jarallax="" data-speed="0.5">
          <div id="jarallax-container-0" style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;overflow: hidden;/* z-index: -100; */"><img width="100%" height="600" src="https://www.marketing91.com/wp-content/uploads/2020/10/Lifelong-Learning.jpg" class="jarallax-img pix-opacity-3 animated slow-transition" alt="" loading="lazy" srcset="https://www.marketing91.com/wp-content/uploads/2020/10/Lifelong-Learning.jpg 1000w, https://www.marketing91.com/wp-content/uploads/2020/10/Lifelong-Learning.jpg 600w, https://shop.tappi.vn/wp-content/uploads/2020/06/carousel-image-1-3-300x180.jpg 300w, https://www.marketing91.com/wp-content/uploads/2020/10/Lifelong-Learning.jpg 768w" sizes="(max-width: 1000px) 100vw, 1000px" style="object-fit: cover; object-position: 50% 50%; max-width: none; position: absolute; top: 0px; left: 0px; width: 100%; height: 787px; overflow: hidden; pointer-events: none; transform-style: preserve-3d; backface-visibility: hidden; will-change: transform, opacity; margin-top: 76.9062px; transform: translate3d(0px, -76.9062px, 0px); border-radius: 0;"></div></div>

        <div class="container pix-dark" style="padding-top:150px;padding-bottom:180px;">
          <div class="pix-main-intro-placeholder d-block w-100" style="height: 110px;" />
        </div>
        <div class="">
          <div class="pix-divider pix-bottom-divider" data-style="style-19"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="300" viewBox="0 0 1200 415" preserveAspectRatio="none"><g class="pix-waiting animated" data-anim-type="fade-in-up" data-anim-delay="700"><path class="bg-gray-1" fill-opacity="0.2" d="M5.68434189e-13,292.788567 C80.6666667,271.41188 159.333333,260.723537 236,260.723537 C421,260.723537 525,344.759008 670,273.729027 C788.879994,215.494242 940.849865,-5.02123357 1200,0.788566864 C1200,33.4552335 1200,171.525711 1200,415 L9.19819776e-13,414.788567 L5.68434189e-13,292.788567 Z" /></g><g class="pix-waiting animated" data-anim-type="fade-in-up" data-anim-delay="500"><path class="bg-gray-1" fill-opacity="0.6" d="M2.08355555e-12,332.788567 C80.6666667,284.745214 159.333333,260.723537 236,260.723537 C421,260.723537 525,344.759008 670,273.729027 C789.08369,215.39446 940.387018,21.5609115 1200,37.7885669 C1200,55.7885669 1200,181.525711 1200,415 L1.8189894e-12,414.788567 L2.08355555e-12,332.788567 Z" /></g><path class="bg-gray-1" d="M9.09494702e-13,373.771254 C80.6666667,298.406109 159.333333,260.723537 236,260.723537 C421,260.723537 525,344.759008 670,273.729027 C789.088175,215.392262 940.369069,48.85905 1200,74.7885669 C1200,148.788567 1200,262.192378 1200,415 L1.0227342e-12,414.788567 L9.09494702e-13,373.771254 Z" /><defs /></svg></div>        </div>
      </div>
    </div>
    <div>
      <div>
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row">
              <div class="col-6 text-white mb-3">
                <div>
                  <h2>Recommended</h2>
                  <h5 style="font-size: 90%;">For you</h5>
                </div>
              </div>
              <div class="col-6 text-right">
                <b-button class="mb-3" pill variant="outline-info">See More</b-button>
              </div>
              <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <course-list :data="listDataNew.data" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row">
              <div class="col-6 text-white mb-3">
                <div>
                  <h2>Mua nhiều nhất tuần</h2>
                  <h5 style="font-size: 90%;">Các khóa được mua nhiều nhất tuần qua</h5>
                </div>
              </div>
              <div class="col-6 text-right">
                <b-button class="mb-3" pill variant="outline-info">See More</b-button>
              </div>
              <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <course-list :data="listDataPurchases.data" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row">
              <div class="col-6 text-white mb-3">
                <div>
                  <h2>Yêu thích nhất</h2>
                  <h5 style="font-size: 90%;">Các khóa được yêu thích nhất</h5>
                </div>
              </div>
              <div class="col-6 text-right">
                <b-button class="mb-3" pill variant="outline-info">See More</b-button>
              </div>
              <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <course-list :data="listDataLike.data" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row">
              <div class="col-6 text-white mb-3">
                <div>
                  <h2>Our Teachers</h2>
                  <h5 style="font-size: 90%;">Teachers for you</h5>
                </div>
              </div>
              <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <div class="row">
                        <router-link v-for="(teacher, index) in teachers.data" :key="index" tag="div" :to="{name: 'teacherInfo', params: { id: teacher.id }}" class="col-md-2 mb-3 c_pointer">
                          <div class="text-center">
                            <div>
                              <b-img class="MuiAvatar-img" rounded="circle" :src="teacher.url_avatar" />
                              <p class="text-white text_img">{{ teacher.full_name }}</p>
                            </div>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeacherList, getCourseListByType } from '../../../api/public'
import CourseList from '../../../components/user/CourseList.vue'
export default {
  components: {
    courseList: CourseList
  },
  data() {
    return {
      listDataNew: {
        data: [],
        total: 0
      },
      listDataLike: {
        data: [],
        total: 0
      },
      listDataPurchases: {
        data: [],
        total: 0
      },
      teachers: {
        data: [],
        total: 0
      }
    }
  },
  async created() {
    await this.getCourseList('new', this.listDataNew)
    await this.getCourseList('like', this.listDataLike)
    await this.getCourseList('purchases', this.listDataPurchases)
    await this.getTeachers()
  },
  methods: {
    async getTeachers() {
      const params = {
        page: 1,
        limit: 10
      }
      const { list, total } = await getTeacherList(params)
      this.teachers.data = list
      this.teachers.total = total
    },
    async getCourseList(typeStr, courses) {
      const userId = this.$store.state.User.myInfo ? this.$store.state.User.myInfo.id : 0
      const params = {
        page: 1,
        limit: 4,
        type: typeStr,
        user_id: userId
      }
      const { list, total } = await getCourseListByType(params)
      courses.data = list
      courses.total = total
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 1200px) {
   .container, .container-sm, .container-md, .container-lg, .container-xl {
      max-width: 1400px;
   }
}
.pix-divider {
    position: absolute;
    opacity: 1 !important;
    width: 100%;
    left: 0;
    z-index: 1;
    pointer-events: none;
}
.card_img {
  height: 380px;
  background-size: cover !important;
  border-radius: 14px !important;
}
.MuiAvatar-img {
    color: transparent;
    width: 150px;
    height: 150px;
    object-fit: cover;
    text-align: center;
}
.text_img {
  font-size: 20px;
}
.footer_card {
  width: 100%;
  padding-top: 15px;
  bottom: 0px;
  display: flex;
  border-radius: 0 0 14px 14px;
  backdrop-filter: blur(30px);
  justify-content: space-between;
}
.text_price {
  font-size: 22px;
  font-style: normal;
  text-align: left;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0px;
}
</style>
