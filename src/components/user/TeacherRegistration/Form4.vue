<template>
  <div style="color: white;">
    <form class="mt-3" @submit.prevent="onSubmit">
      <div>
        <div class="p-2">
          <div class="mb-3">
            <label for="inputFullName" class="form-label">Họ Tên:*</label>
            <div>
              <input v-model="teacher.full_name" name="fullName" type="text" class="form-control form_input">
              <p v-if="errors.full_name" class="error_valid">
                {{ errors.full_name }}
              </p>
            </div>
          </div>
          <div class="mb-3">
            <label for="inputPhoneNumber" class="form-label">Số điện thoại:*</label>
            <input id="inputPhoneNumber" v-model="teacher.phone_number" name="phoneNumber" type="text" class="form-control form_input">
            <p v-if="errors.phone_number" class="error_valid">
              {{ errors.phone_number }}
            </p>
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email:*</label>
            <div>
              <input v-model="teacher.email" name="email" type="email" class="form-control form_input" aria-describedby="emailHelp">
              <p v-if="errors.email" class="error_valid">
                {{ errors.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="mt-3">
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        Tôi đồng ý với các điều khoản nêu trên
      </b-form-checkbox>
    </div>
    <div class="w100 content_center">
      <b-button class="btn_te_reg mr-2" @click="before()">Trước đó</b-button>
      <b-button class="btn_te_reg" :disabled="isDisabled" @click="continueForm()">Tiếp theo</b-button>
    </div>
  </div>
</template>

<script>
import { _ } from 'vue-underscore'
export default {
  data() {
    return {
      selected: '1',
      status: null,
      errors: {},
      teacher: {
        full_name: null,
        email: null,
        phone_number: null,
        date_of_birth: '1990-01-01',
        gender: 'not_specific',
        about: '',
        url_avatar: 'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png',
        hash_pwd: 'Aa123456@'
      }
    }
  },
  computed: {
    isDisabled() {
      if (this.status === 'accepted') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    checkFormValidity() {
      this.errors = {}
      for (const [key, value] of Object.entries(this.teacher)) {
        if (!value) {
          switch (key) {
            case 'full_name':
              this.errors[`${key}`] = 'Full name is valid'
              break
            case 'email':
              this.errors[`${key}`] = 'Email is valid'
              break
            case `phone_number`:
              this.errors[`${key}`] = 'Phone is valid'
              break
          }
        }
      }
      return _.isEmpty(this.errors)
    },
    continueForm() {
      if (!this.checkFormValidity()) return
      this.$emit('onSubmit', this.teacher)
    },
    before() {
      this.$emit('before')
    }
  }
}
</script>

<style lang="scss">
.btn_te_reg {
  color: #1D1E22;
  background-color: #feda6a;
}
</style>
