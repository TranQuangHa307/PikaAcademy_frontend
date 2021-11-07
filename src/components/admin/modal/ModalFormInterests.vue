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
        label="Description"
        label-for="description-input"
        invalid-feedback="Description is required"
        :state="state"
      >
        <b-form-input
          id="description-input"
          v-model="interests.description"
          :state="state"
          required
        />
      </b-form-group>
      <b-form-group
        label="Image"
        label-for="image-input"
      >
        <div>
          <b-form-file
            v-model="image"
            :state="state"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept=".jpg, .png, .gif"
          />
        </div>
        <div class="text-center">
          <b-img v-if="hasImage" rounded="circle" :src="imageSrc" class="preview_img" />
          <b-img v-else-if="interests.url_image" rounded="circle" :src="interests.url_image" class="preview_img" />
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
      interests: this.data,
      imageSrc: null,
      image: null,
      state: null
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
      if (this.image) {
        this.interests.url_image = await uploadFile(this.image)
        console.log('url: ' + this.interests.url_image)
      }
      if (this.isAdd) {
        this.$emit('onadd', this.interests)
      } else {
        this.$emit('onupdate', this.interests)
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
