<template>
  <div>
    <div class="flex">
      <div class="content_center c_pointer flex1" style="width: 300px; border: 1px dashed; height: 200px; border-radius: 5px;">
        <label for="formFile" class="form-label c_pointer">
          <div class="text-center">
            <div style="font-size: 4rem;">
              <b-icon icon="cloud-upload-fill" variant="info" />
            </div>
            <p>Upload Image</p>
          </div>
        </label>
        <b-form-file
          id="formFile"
          v-model="image"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".jpg, .png, .gif, .jfif, .jpeg"
          style="display: none;"
        />
      </div>
      <div class="text-center flex1">
        <b-img v-if="hasImage" rounded :src="imageSrc" class="preview_img" />
        <b-img v-else-if="urlImage" rounded :src="urlImage" class="preview_img" />
      </div>
    </div>
  </div>
</template>
<script>
import { base64Encode } from '../../../utils/index'
export default {
  props: {
    urlImage: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      imageSrc: null,
      image: null
    }
  },
  computed: {
    hasImage() {
      return !!this.image
    }
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value
            })
            .catch(() => {
              this.imageSrc = null
            })
        } else {
          this.imageSrc = null
        }
        this.$emit('setImage', this.image)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preview_img {
  height: 200px;
  width: 100%;
}
</style>
