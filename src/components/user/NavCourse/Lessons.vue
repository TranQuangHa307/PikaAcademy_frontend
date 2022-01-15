<template>
  <div class="mt-3 mb-3">
    <div class="w100">
      <div v-for="(chapter, index) in chapters" :key="index">
        <div class="chapter">
          <div class="div_chapter">
            <div style="flex: 1 1 auto" @click="selectedChapter(index)">
              <span
                class="title_chapter"
                :class="{ text_title: show.includes(index) }"
                >Chapter {{ index + 1 }}: {{ chapter.name }}</span
              >
            </div>
            <span
              class="mr-1 text_post"
              >{{ chapter.sessions.length }} Post</span
            >
            <b-icon icon="chevron-right" style="color: #feda6a; opacity: 0.5" />
          </div>
        </div>
        <hr
          style="margin-top: 0; margin-bottom: 0; background-color: #393f4d"
        />
        <div v-if="show.includes(index)">
          <div class="chapter">
            <div
              v-for="(session, indexS) in chapter.sessions"
              :key="indexS"
              class="div_chapter mt-2"
            >
              <b-iconstack
                font-scale="2"
                class="ml-3 mr-2"
                style="background-color: white"
              >
                <b-icon
                  stacked
                  scale="2"
                  icon="youtube"
                  style="color: #d4d4dc"
                />
              </b-iconstack>
              <!-- <b-icon icon="youtube" font-scale="4" style="color: #D4D4DC; background-color: white;" /> -->
              <div class="ml-3">
                <span>{{ session.name }}</span>
              </div>
              <span
                class="mr-1 text_post"
                style="margin: auto; min-width: 45px"
                >{{ timeConvert(session.time) }} min</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChapterList } from '../../../api/course.js'
export default {
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: [],
      chapters: []
    }
  },
  async created() {
    await this.getChapter(this.data)
  },
  methods: {
    async getChapter(courseId) {
      this.chapters = await getChapterList(courseId)
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
    selectedChapter(index) {
      if (this.show.includes(index)) {
        this.show.splice(this.show.indexOf(index), 1)
      } else {
        this.show.push(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter {
  :hover {
    background-color: #2F3033;
    cursor: pointer;
  }
}
.div_chapter {
  display: flex;
  align-items:center;
  padding: 10px;
}
.title_chapter {
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
