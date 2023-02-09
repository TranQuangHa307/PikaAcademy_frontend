<template>
  <div>
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <div class="flex">
        <div style="flex: 1;" class="mr-1">
          <b-form-group
            label="Tên"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="state"
          >
            <b-form-input
              id="name-input"
              v-model="data.name"
              :state="state"
              required
            />
          </b-form-group>
          <b-form-group
            label="Giới thiệu*"
            label-for="result-textarea"
          >
            <ckeditor v-model="data.about" :editor="editor" tag-name="textarea" />
          </b-form-group>
          <div>
            <div class="content_center">
              <div class="w50 txt_left">
                <label>Bài tập</label>
              </div>
              <div class="w50 txt_right">
                <b-button variant="primary" @click="appendExercise()">+</b-button>
              </div>
            </div>
            <div>
              <div v-for="(elmnt, index) in exerciseArr" :key="index" class="content_center">
                <input v-model="elmnt.name" class="form-control m-1" placeholder="Name">
                <b-form-select v-model="elmnt.type" :options="exerciseOptions" />
                <input v-if="!elmnt.type" v-model="elmnt.link" class="form-control m-1" placeholder="Link">
                <b-form-file v-else v-model="elmnt.link" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />
                <button type="button" class="btn btn-danger" @click="removeExercise(elmnt.id)"><b-icon icon="trash-fill" variant="white" /></button>
              </div>
            </div>
          </div>
        </div>
        <div style="flex: 1;" class="ml-2">
          <b-form-group
            label="Video"
            label-for="video-input"
          >
            <upload-vieo :url-video="data.url_video" @resVideo="setVideo($event)" />
          </b-form-group>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button type="button" class="btn btn-danger mr-2" @click="cancelForm">Huỷ bỏ</button>
        <button type="submit" class="btn btn-primary">Lưu</button>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadFile } from '../../../api/common.js'
import UploadVieo from '../../../components/admin/uploadFile/UploadVideo.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  components: {
    UploadVieo
  },
  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      session: this.data,
      videoSrc: null,
      video: null,
      state: null,
      editor: ClassicEditor,
      exerciseArr: this.data.exercise,
      exerciseIndex: this.data.exercise.length,
      exerciseOptions: [
        { 'value': 'file', 'text': 'File' },
        { 'value': null, 'text': 'Url' }
      ]
    }
  },
  computed: {
    hasVideo() {
      return !!this.video
    }
  },
  methods: {
    appendExercise() {
      this.exerciseIndex++
      this.exerciseArr.push({ id: this.exerciseIndex, name: null, type: null, link: null })
    },
    removeExercise(id) {
      const exercise = this.exerciseArr.find(item => item.id === id)
      this.exerciseArr.splice(this.exerciseArr.indexOf(exercise), 1)
    },
    setVideo(value) {
      if (value.videoType === 'file') {
        this.video = value.video
      } else {
        this.video = null
        this.data.url_video = value.video
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.state = valid
      return valid
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // return
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.data.exerciseArr = this.exerciseArr
      this.$store.commit('SET_LOADING')
      if (this.video) {
        this.session.url_video = await uploadFile(this.video)
        const vid = document.getElementById('introVideo')
        this.session.time = Math.round(vid.duration)
      }
      if (this.isAdd) {
        this.$emit('onadd', this.session)
      } else {
        this.$emit('onupdate', this.session)
      }
    },
    cancelForm() {
      this.$emit('cancelForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview_img {
  height: 100px;
  width: 100px;
  margin-top: 1em;
  border: 5px solid pink;
}
.custom-select {
  width: 100px;
}
</style>
