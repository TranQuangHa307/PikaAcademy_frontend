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
          <b-navbar-brand class="text_nav" href="/">
            Khoá học
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            <b-icon icon="chevron-right" style="color: #d4d4dc;" scale="0.75" />
          </b-navbar-brand>
          <b-navbar-brand class="text_nav" href="/">
            {{ interests.name }}
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="ml-3 mt-3">
        <div>
          <h1>{{ interests.name }}</h1>
        </div>
        <div class="row mt-4">
          <div v-for="(item, index) in categories" :key="index" class="col-md-3 mb-3">
            <router-link tag="div" :to="{ name: 'courseListUser', params: { category_id: item.id, interests_id: interests.id }}" class="div_category">
              <div class="card card_interests" :style="{ backgroundImage: 'url(' + item.url_image + '), url('+ urlImgDefault + ')'}">
                <div class="card-body">
                  <h2>{{ item.name }}</h2>
                  <p>{{ item.course }} Khoá học</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInterestsInfo, getCategoriesByInterests } from '../../../api/public'
export default {
  data() {
    return {
      urlImgDefault: 'https://edumall.vn/assets/icons/skill.svg',
      interests: {},
      categories: []
    }
  },
  async created() {
    this.interests = await getInterestsInfo(this.$route.params.id)
    this.categories = await getCategoriesByInterests(this.interests.id)
  }
}
</script>

<style lang="scss" scoped>
.div_category {
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
