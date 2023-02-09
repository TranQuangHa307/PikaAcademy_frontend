<template>
  <div class="te_chapter">
    <div class="te_chapter_heading">
      <div class="w50">
        <h1>Chương</h1>
      </div>
      <div class="w50 txt_right">
        <b-button variant="primary">+ Chương</b-button>
      </div>
    </div>
    <div class="te_chapter_body">
      <div>
        <ul>
          <li v-for="(chapter, index) in chapters" :key="index" @click="showSessions(chapter.id)">
            <div class="te_chapter_item w100">
              <div class="w60">
                <h5>Chương {{ (++index) }} : {{ chapter.name }}</h5>
              </div>
              <div class="w40 txt_right">
                <b-button class="mr-1" variant="primary">+</b-button>
                <b-button class="mr-1" variant="info"><b-icon icon="pencil-fill" variant="white" /></b-button>
                <b-button variant="danger"><b-icon icon="trash-fill" variant="white" /></b-button>
              </div>
            </div>
            <ul class="te_session_group" :class="{ te_session_active: groupActive.includes(chapter.id) }">
              <li class="te_chapter_session" v-for="(session, index) in chapter.sessions" :key="index">
                <div class="w15 mr-3">
                  <b-embed
                    type="iframe"
                    aspect="16by9"
                    :src="session.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>
                <div class="flex1">
                  <h5>{{ session.name }}</h5>
                </div>
                <div class="w10 txt_right">
                  <b-button class="mb-1" variant="info"><b-icon icon="pencil-fill" variant="white" /></b-button>
                  <br/>
                  <b-button variant="danger"><b-icon icon="trash-fill" variant="white" /></b-button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getChapterList } from '../../api/course.js'
export default {
  props: {
    elmntId: {
      default: null
    }
  },
  data() {
    return {
      chapters: [],
      groupActive: []
    }
  },
  async created() {
    this.chapters = await getChapterList(this.elmntId)
  },
  methods: {
    showSessions(chapterId) {
      if (this.groupActive.includes(chapterId)){
        this.groupActive.splice(this.groupActive.indexOf(chapterId), 1)
      }else {
        this.groupActive.push(chapterId)
      }
    }
  }
}
</script>

<style lang="scss">
.te_chapter {
  margin: 0 1em;
}
.te_chapter_heading {
  display: flex;
  align-items: center;
  button {
    font-weight: bold;
  }
}
.te_chapter_body {
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
}
.te_chapter_item {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1em;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgb(0 0 0 / 10%);
  button {
    font-size: 75%;
  }
  margin: 1em 0;
}
.te_chapter_session {
  display: flex;
  align-items: center;
  background-color: wheat;
  margin: 0.5em 0 0.5em 2em;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 3px 3px 0 rgb(0 0 0 / 10%);
  button {
    font-size: 50%;
  }
}
.te_session_group {
  display: none;
}
.te_session_active {
  display: block;
}
</style>
