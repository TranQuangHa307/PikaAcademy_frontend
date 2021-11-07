<template>
  <div>
    <div>
      <b-form-file
        v-model="video"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        accept="video/*"
      />
    </div>
    <div class="text-center">
      <video v-if="hasVideo" :src="videoSrc" height="300" class="mt-3" controls />
      <video v-else-if="urlVideo" :src="urlVideo" height="300" class="mt-3" controls />
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
      videoSrc: null
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
      this.$emit('setVideo', this.video)
    }
  }
}
</script>

<style scoped>

</style>
