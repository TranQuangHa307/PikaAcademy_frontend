<template>
  <div class="text-white pt-3 container">
    <div>
      <div class="nav">
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
          <b-navbar-brand class="text_nav" href="/">
            Trang chủ
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            <b-icon icon="chevron-right" style="color: #d4d4dc;" scale="0.75" />
          </b-navbar-brand>
          <div v-if="namePage === 'wishlistUser'">
            <b-navbar-brand class="text_nav" href="/wishlist">
              Khoá học yêu thích
            </b-navbar-brand>
          </div>
          <div v-else-if="namePage === 'myLearningUser'">
            <b-navbar-brand class="text_nav" href="/my-courses">
              Khoá học đã đăng ký
            </b-navbar-brand>
          </div>
          <div v-else>
            <b-navbar-brand class="text_nav" href="/interests">
              Khoá học
            </b-navbar-brand>
            <b-navbar-brand class="text_nav">
              <b-icon icon="chevron-right" style="color: #d4d4dc;" scale="0.75" />
            </b-navbar-brand>
            <b-navbar-brand class="text_nav" href="">
              {{ interests.name }}
            </b-navbar-brand>
          </div>

        </b-navbar>
      </div>
      <div class="ml-3 mt-3">
        <div v-if="namePage === 'wishlistUser'">
          <h1>Khoá học yêu thích</h1>
        </div>
        <div v-else-if="namePage === 'myLearningUser'">
          <h1>Khoá học đã đăng ký</h1>
        </div>
        <div v-else>
          <h1>{{ category.name }}</h1>
        </div>
        <div class="mt-4">
          <app-course-list :data="dataList.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInterestsInfo, getCategoryInfo, getCourseList } from '../../../api/public'
import { getListFavoriteCourse, getListPurchasedCourse } from '../../../api/user'
import CourseList from '../../../components/user/CourseListV2.vue'
export default {
  components: {
    appCourseList: CourseList
  },
  data() {
    return {
      urlImgDefault: 'https://edumall.vn/assets/icons/skill.svg',
      category: {},
      interests: {},
      dataList: {
        data: [],
        total: 0,
        page: 1,
        perPage: 20
      },
      namePage: ''
    }
  },
  async created() {
    this.namePage = this.$route.name
    if (this.namePage !== 'wishlistUser' && this.namePage !== 'myLearningUser') {
      this.interests = await getInterestsInfo(this.$route.params.interests_id)
      this.category = await getCategoryInfo(this.$route.params.category_id)
    }
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.dataList.page)
  },
  methods: {
    setPageParam(page) {
      if (page) this.dataList.page = Number(page)
      else this.dataList.page = 1
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.dataList.perPage,
        interests: this.$route.name === 'wishlistUser' ? null : this.$route.params.interests_id,
        categories: this.$route.name === 'wishlistUser' ? null : this.$route.params.category_id
      }
      if (this.$route.name === 'wishlistUser') {
        const { list, total } = await getListFavoriteCourse(this.$store.state.User.myInfo.id, params)
        this.dataList.data = list
        this.dataList.total = total
      } else if (this.$route.name === 'myLearningUser') {
        const { list, total } = await getListPurchasedCourse(this.$store.state.User.myInfo.id, params)
        this.dataList.data = list
        this.dataList.total = total
      } else {
        const { list, total } = await getCourseList(params)
        this.dataList.data = list
        this.dataList.total = total
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.div_category {
  width: 280px;
  cursor: pointer;
  height: 380px;
  border-radius: 14px;
}
.card_interests {
  cursor: pointer;
  height: 100%;
  border-radius: 8px;
  background-size: 56.37px, 74px;
  background-repeat: no-repeat;
  background-position: right 41.23px bottom 32.1px,right bottom;
  color: black;
  border: none;
  background-color: rgb(212, 212, 220);
}
.text_description {
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.text_nav {
  color: #d4d4dc;
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
}

.nav {
  a:hover{
    color: #d4d4dc;
    text-decoration: none;
  }
}
</style>
