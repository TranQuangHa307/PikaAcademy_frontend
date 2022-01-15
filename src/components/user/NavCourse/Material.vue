<template>
  <div class="mt-3 mb-3">
    <ul class="mt-2">
      <li v-for="(item, index) in materials" :key="index">
        <a :href="item.link" target="blank">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMaterialByCourse } from '../../../api/course.js'
export default {
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      materials: []
    }
  },
  async created() {
    await this.getMaterialList(this.data)
  },
  methods: {
    async getMaterialList(courseId) {
      this.materials = await getMaterialByCourse(courseId)
    }
  }
}
</script>

