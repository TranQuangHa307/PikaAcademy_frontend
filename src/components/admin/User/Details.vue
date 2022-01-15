<template>
  <div>
    <div class="table-users pt-5 pb-5">
      <div class="container">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="First Name"
            label-for="first-name-input"
          >
            <b-form-input
              id="first-name-input"
              v-model="user.first_name"
            />
            <p v-if="errors.first_name" class="error_valid">
              {{ errors.first_name }}
            </p>
          </b-form-group>
          <b-form-group
            label="Last Name"
            label-for="last-name-input"
          >
            <b-form-input
              id="last-name-input"
              v-model="user.last_name"
            />
            <p v-if="errors.last_name" class="error_valid">
              {{ errors.last_name }}
            </p>
          </b-form-group>
          <div class="form-group">
            <label for="date-of-birth-input">Date of birth</label>
            <date-picker :data="user.date_of_birth" @setDate="setDate($event)" />
            <p v-if="errors.date_of_birth" class="error_valid">{{ errors.date_of_birth }}</p>
          </div>
          <b-form-group
            label="Email"
            label-for="email-input"
          >
            <b-form-input
              id="email-input"
              v-model="user.email"
            />
            <p v-if="errors.email" class="error_valid">
              {{ errors.email }}
            </p>
          </b-form-group>
          <b-form-group
            label="Avatar"
            label-for="avatar-input"
          >
            <upload-image
              :url-image="user.url_avatar"
              @setImage="setImage($event)"
            />
            <p v-if="errors.url_avatar" class="error_valid">{{ errors.url_avatar }}</p>
          </b-form-group>
          <b-form-group
            label="Gender"
            label-for="gender-select"
          >
            <b-form-select
              v-model="user.gender"
              :options="genderOptions"
            />
            <p v-if="errors.gender" class="error_valid">{{ errors.gender }}</p>
          </b-form-group>
          <b-form-group
            label="Phone number"
            label-for="phone-number-input"
          >
            <b-form-input
              id="phone-number-input"
              v-model="user.phone_number"
            />
            <p v-if="errors.phone_number" class="error_valid">{{ errors.phone_number }}</p>
          </b-form-group>
          <hr>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { _ } from 'vue-underscore'
import UploadImage from '../../../components/admin/uploadFile/UploadImg.vue'
import DatePicker from '../../../components/datepicker/DatePicker.vue'
import { uploadFile } from '../../../api/common'
import { addUser, updateUser, getUserInfo } from '../../../api/user'
import { convertDateTimeInsert, convertTimeStamptoDate } from '../../../utils/index'
export default {
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  components: {
    UploadImage,
    DatePicker
  },
  data() {
    return {
      errors: {},
      user: {
        first_name: null,
        last_name: null,
        email: null,
        url_avatar: null,
        date_of_birth: null,
        gender: null,
        phone_number: null
      },
      genderOptions: [
        { 'value': null, text: 'Select gender' },
        { 'value': 'not_specific', 'text': 'Not Specific' },
        { 'value': 'male', 'text': 'Male' },
        { 'value': 'female', 'text': 'Female' }
      ],
      image: null
    }
  },
  async created() {
    if (this.elmntId) {
      this.user = await getUserInfo(this.elmntId)
      if (this.user.date_of_birth) this.user.date_of_birth = convertTimeStamptoDate(this.user.date_of_birth)
    }
  },
  methods: {
    setDate(value) {
      this.user.date_of_birth = value
    },
    setImage(value) {
      this.image = value
    },
    checkFormValidity() {
      this.errors = {}
      for (const [key, value] of Object.entries(this.user)) {
        if (!value) {
          switch (key) {
            case 'first_name':
              this.errors[`${key}`] = 'First name is valid'
              break
            case 'last_name':
              this.errors[`${key}`] = 'Last name is valid'
              break
            case 'date_of_birth':
              this.errors[`${key}`] = 'Date of birth is valid'
              break
            case 'email':
              this.errors[`${key}`] = 'Email is valid'
              break
            case 'url_avatar':
              if (!this.image) this.errors[`${key}`] = 'Avatar is valid'
              break
            case 'gender':
              this.errors[`${key}`] = 'Gender is valid'
              break
            case 'phone number':
              this.errors[`${key}`] = 'Phone is valid'
              break
          }
        }
      }
      return _.isEmpty(this.errors)
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) return
      this.$store.commit('SET_LOADING')
      if (this.image) this.user.url_avatar = await uploadFile(this.image)
      try {
        const body = {
          'first_name': this.user.first_name,
          'last_name': this.user.last_name,
          'date_of_birth': convertDateTimeInsert(this.user.date_of_birth),
          'email': this.user.email,
          'url_avatar': this.user.url_avatar,
          'gender': this.user.gender,
          'phone_number': this.user.phone_number
        }
        if (this.elmntId) await updateUser(this.user.id, body)
        else await addUser(body)
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.$router.push({
        path: '/admin/user'
      })
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>

