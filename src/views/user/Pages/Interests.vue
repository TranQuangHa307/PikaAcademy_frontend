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
        </b-navbar>
      </div>
      <div class="ml-3 mt-3">
        <div>
          <h1>Khoá học</h1>
        </div>
        <div class="row mt-4">
          <div v-for="(item, index) in interests" :key="index" class="col-md-3 mb-3">
            <router-link tag="div" :to="{ name: 'categoriesUser', params: { id: item.id }}">
              <div class="card div_interest" :style="{ backgroundImage: 'url(' + item.url_image + ')' }">
                <div class="card-body">
                  <h2>{{ item.name }}</h2>
                  <p class="text_description">
                    {{ item.description }}
                  </p>
                  <p>{{ item.number_course }} courses</p>
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
import { getAllInterests } from '../../../api/public'
export default {
  data() {
    return {
      interests: []
    }
  },
  async created() {
    this.interests = await getAllInterests()
  }
}
</script>

<style lang="scss" scoped>
.div_interest {
  cursor: pointer;
  height: 169px;
  border-radius: 8px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right bottom;
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
