<template>
  <div>
    <div class="d_flex w100">
      <div class="w20">
        <b-form-select v-model="videoType" :options="videoTypeOptions"></b-form-select>
      </div>
      <div class="w80" v-if="videoTypeComputed==='file'">
        <b-form-file
          v-model="video"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept="video/*"
        />
      </div>
      <div class="w80" v-else>
        <b-form-input v-model="url" />
      </div>
    </div>
    <div class="text-center">
      <video v-if="videoType=='file' && hasVideo" :src="videoSrc" height="300" class="mt-3" style="max-width: 100%;" controls />
      <iframe id="introVideo" v-if="urlVideoComputed && !video" :src="urlVideoComputed" class="mt-3" height="300"></iframe>
    </div>
  </div>
</template>

<script>
import { base64Encode } from '../../../utils/index'
export default {
  props: {
    urlVideo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      video: null,
      videoSrc: null,
      videoTypeOptions: [
        { 'value': 'file', 'text': 'File' },
        { 'value': 'url', 'text': 'Url' }
      ],
      videoType: 'file',
      resVideo: {
        videoType: 'file',
        video: null
      },
      url: this.urlVideo
    }
  },
  computed: {
    hasVideo() {
      return !!this.video
    },
    videoTypeComputed() {
      return this.videoType
    },
    urlVideoComputed() {
      return this.urlVideo
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
      this.resVideo.videoType = this.videoType
      this.resVideo.video = this.video
      this.$emit('resVideo', this.resVideo)
    },
    url() {
      this.resVideo.videoType = this.videoType
      this.resVideo.video = this.url
      this.$emit('resVideo', this.resVideo)
    }
  }
}
</script>

<style scoped>

</style>
