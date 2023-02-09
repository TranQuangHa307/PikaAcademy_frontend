<template>
  <div class="row">
    <split-carousel :height="220" :item-width="320">
      <split-carousel-item v-for="(teacher, index) in data" :key="index" style="display: flex; align-items: center; justify-content: center;">
        <router-link tag="div" :to="{name: 'teacherInfo', params: { id: teacher.id }}" class="col-md-2 mb-3 c_pointer" style="display: flex;">
          <div class="text-center">
            <div>
              <b-img class="MuiAvatar-img" rounded="circle" :src="teacher.url_avatar" />
              <p class="text-white text_img">{{ teacher.full_name }}</p>
            </div>
          </div>
        </router-link>
      </split-carousel-item>
    </split-carousel>
  </div>
</template>

<script>
import { SplitCarousel, SplitCarouselItem } from 'vue-split-carousel'
export default {
  components: {
    SplitCarousel,
    SplitCarouselItem
  },
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
  }
}
</script>

<style lang="scss">
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
</style>
