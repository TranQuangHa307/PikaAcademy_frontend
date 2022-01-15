<template>
  <div>
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Name"
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
        label="About*"
        label-for="result-textarea"
      >
        <ckeditor v-model="data.about" :editor="editor" tag-name="textarea" />
      </b-form-group>
      <b-form-group
        label="Video"
        label-for="video-input"
      >
        <upload-vieo :url-video="data.url_video" @resVideo="setVideo($event)" />
      </b-form-group>
      <hr>
      <div class="text-center">
        <button type="button" class="btn btn-danger mr-2" @click="cancelForm">Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
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
      editor: ClassicEditor
    }
  },
  computed: {
    hasVideo() {
      return !!this.video
    }
  },
  methods: {
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
</style>
