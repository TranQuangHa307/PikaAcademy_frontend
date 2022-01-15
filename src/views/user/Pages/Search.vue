<template>
  <div class="text-white pt-3">
    <div>
      <div class="nav">
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
          <b-navbar-brand class="text_nav" href="/">
            Home
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            <b-icon icon="chevron-right" style="color: #d4d4dc;" scale="0.75" />
          </b-navbar-brand>
          <b-navbar-brand class="text_nav" href="/interests">
            Search
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="ml-3 flex">
        <div class="flex1">
          <h3>Results ({{ dataList.total }}) <span v-if="searchKey">for the keyword "{{ searchKey }}"</span></h3>
        </div>
        <div class="text-right mr-3">
          <div class="c_pointer open_filter" style="font-size: 1.5rem;">
            <b-icon icon="funnel" />
          </div>
        </div>
      </div>
      <div class="ml-3 mt-3 mr-3 flex main_filter">
        <div class="div_filter">
          <div class="mb-4">
            <h3>Filters</h3>
          </div>
          <div class="mb-4">
            <h5 class="title_filter">INTERESTS</h5>
            <div class="list_group">
              <div v-for="(item, index) in interestsOptions" :key="index">
                <div class="p-2" style="background-color: transparent; border: none; border-bottom: 1px solid #393f4d;">
                  <input :id="item.name" type="checkbox" :name="item.name" @click="setParam('interests', item.id)">
                  <label :for="item.name" style="display: flex;align-items: center; margin-top: -1rem;">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <h5 class="title_filter">LEVEL</h5>
            <div class="list_group">
              <div v-for="(item, index) in levelOptions" :key="index">
                <div class="p-2" style="background-color: transparent; border: none; border-bottom: 1px solid #393f4d;">
                  <input :id="item.name" type="checkbox" :name="item.name" @click="setParam('level', item.id)">
                  <label :for="item.name" style="display: flex;align-items: center; margin-top: -1rem;">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <h5 class="title_filter">PRICE</h5>
            <div class="list_group">
              <div v-for="(item, index) in priceOptions" :key="index">
                <div class="p-2" style="background-color: transparent; border: none; border-bottom: 1px solid #393f4d;">
                  <input :id="item.name" type="checkbox" :name="item.name" @click="setParam('price', item.id)">
                  <label :for="item.name" style="display: flex;align-items: center; margin-top: -1rem;">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3 mr-3" style="width: 100%;">
          <app-course-list :data="dataList.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
import { getAllInterests } from '../../../api/public'
import { getCourseList } from '../../../api/public'
import CourseList from '../../../components/user/CourseList.vue'
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
      interestsOptions: [],
      levelOptions: [
        { id: 'beginner', name: 'Beginner' },
        { id: 'intermediate', name: 'Intermediate' },
        { id: 'advance', name: 'Advance' }
      ],
      priceOptions: [
        { id: 'free', name: 'Freee' },
        { id: 'discount', name: 'Discount' }
      ],
      interestsParams: [],
      levelParams: [],
      priceParams: [],
      searchKey: '',
      status: 'not_accepted'
    }
  },
  watch: {
    searchKey(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getDataList(1)
      }
    }
  },
  mounted() {
    eventBus.$on('search', (data) => {
      this.searchKey = data
    })
  },
  async created() {
    this.searchKey = this.$store.state.User.searchKey
    // this.$store.state.User.searchKey = null
    this.interestsOptions = await getAllInterests()
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.dataList.page)
  },
  methods: {
    setPageParam(page) {
      if (page) this.dataList.page = Number(page)
      else this.dataList.page = 1
    },
    handelArrParams(arrParams, value) {
      if (arrParams.includes(value)) arrParams.splice(arrParams.indexOf(value), 1)
      else arrParams.push(value)
    },
    setParam(name, value) {
      switch (name) {
        case 'interests':
          this.handelArrParams(this.interestsParams, value)
          break
        case 'level':
          this.handelArrParams(this.levelParams, value)
          break
        case 'price':
          this.handelArrParams(this.priceParams, value)
          break
      }
      this.getDataList(this.getDataList.page)
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.dataList.perPage,
        keyword: this.searchKey,
        user_id: this.$store.state.User.myInfo ? this.$store.state.User.myInfo.id : 0,
        interests: this.interestsParams.length <= 0 ? null : this.interestsParams.toString(),
        levels: this.levelParams.length <= 0 ? null : this.levelParams.toString(),
        prices: this.priceParams.length <= 0 ? null : this.priceParams.toString()
      }
      const { list, total } = await getCourseList(params)
      this.dataList.data = list
      this.dataList.total = total
    }
  }
}
</script>

<style lang="scss" scoped>
.list_group{
  :hover{
    background: #34363C;
  }
}
.box {
  background: #666666;
  color: #ffffff;
  width: 250px;
  padding: 10px;
  margin: 1em auto;
}
p {
  margin: 1.5em 0;
  padding: 0;
}
input[type="checkbox"] {
  visibility: hidden;
}
label {
  cursor: pointer;
}
input[type="checkbox"] + label:before {
  border: 1px solid #333;
  content: "\00a0";
  display: inline-block;
  font: 20px/1em sans-serif;
  height: 20px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 20px;
  border-radius: 3px;
}
input[type="checkbox"]:checked + label:before {
  background: #FEDA6A;
  color: #333;
  content: "\2713";
  text-align: center;
}
input[type="checkbox"]:checked + label:after {
  font-weight: bold;
}

input[type="checkbox"]:focus + label::before {
    outline: rgb(59, 153, 252) auto 5px;
}

.title_filter {
  color: #D4D4DC;
  margin: 0px 7px;
  opacity: 0.5;
}
.div_filter {
  width: 214px;
  border: none;
  padding: 24px;
  position: sticky;
  min-width: 220px;
  background: #23252b;
  box-shadow: none;
  top: 60px;
  max-height: calc(100vh - 65px);
  overflow-y: scroll;
  border-radius: 5px;
}
.card_img {
  height: 380px;
  background-size: cover !important;
  border-radius: 14px !important;
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
@media only screen and (max-width: 1024px) {
  .main_filter {
    display: flex;
  }
  .div_filter {
    width: 100%;
    display: none;
  }
}
</style>
