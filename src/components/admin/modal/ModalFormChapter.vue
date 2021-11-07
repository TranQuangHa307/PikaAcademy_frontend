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
      <hr>
      <div class="text-center">
        <button type="button" class="btn btn-danger mr-2" @click="cancelForm">Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
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
      chapter: this.data,
      state: null
    }
  },
  computed: {
    hasImage() {
      return !!this.image
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
      // return
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.$store.commit('SET_LOADING')
      if (this.isAdd) {
        this.$emit('onadd', this.chapter)
      } else {
        this.$emit('onupdate', this.chapter)
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
