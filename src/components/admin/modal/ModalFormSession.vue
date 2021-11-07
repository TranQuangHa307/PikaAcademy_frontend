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
        label="Video"
        label-for="video-input"
      >
        <div>
          <b-form-file
            v-model="video"
            :state="state"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept="video/*"
          />
        </div>
        <div class="text-center">
          <video v-if="hasVideo" id="introVideo" :src="videoSrc" width="400" height="250" class="mt-3" controls />
          <b-embed
            v-else-if="session.url_video"
            class="mt-3"
            type="iframe"
            aspect="16by9"
            :src="session.url_video"
            allowfullscreen
          />
          <!-- <video v-else-if="session.url_video" :src="session.url_video" width="300" class="mt-3" controls /> -->
        </div>
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
import { uploadFile } from '../../../api/common'
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(data)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
export default {
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
      state: null
    }
  },
  computed: {
    hasVideo() {
      return !!this.video
    }
  },
  watch: {
    video(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.videoSrc = value
            })
            .catch(() => {
              this.videoSrc = null
            })
        } else {
          this.videoSrc = null
        }
      }
    }
  },
  methods: {
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
      console.log('modal: ' + this.isAdd)
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
