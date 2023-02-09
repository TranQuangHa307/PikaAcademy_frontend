<template>
  <div class="mt-3 mb-3">
    <ul v-if="exercises.length > 0" class="mt-2">
      <li v-for="(item, index) in exercises" :key="index">
        <a :href="item.link" target="blank">{{ item.name }}</a>
      </li>
    </ul>
    <div v-else>
      <h1>Không có bài tập nào</h1>
      <hr>
    </div>
  </div>
</template>

<script>
import { getListExercise } from '../../../api/session.js'
export default {
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      exercises: []
    }
  },
  async created() {
    await this.getExericeList(this.data)
  },
  methods: {
    async getExericeList(sessionId) {
      this.exercises = await getListExercise(sessionId)
    }
  }
}
</script>

