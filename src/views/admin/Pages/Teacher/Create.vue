<template>
  <div class="container-fluid">
    <div class="table-users pt-5 pb-5">
      <div class="container">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Full Name"
            label-for="fullname-input"
          >
            <b-form-input
              id="name-input"
              v-model="teacher.full_name"
            />
            <p v-if="errors.full_name" class="error_valid">{{ errors.full_name }}</p>
          </b-form-group>
          <div class="form-group">
            <label for="date-of-birth-input">Date of birth</label>
            <date-picker :data="teacher.date_of_birth" @setDate="setDate($event)" />
            <p v-if="errors.date_of_birth" class="error_valid">{{ errors.date_of_birth }}</p>
          </div>
          <b-form-group
            label="Email"
            label-for="email-input"
          >
            <b-form-input
              id="name-input"
              v-model="teacher.email"
              type="email"
            />
            <p v-if="errors.email" class="error_valid">{{ errors.email }}</p>
          </b-form-group>
          <b-form-group
            label="Avatar"
            label-for="avatar-input"
          >
            <upload-image :url-image="teacher.url_avatar" @setImage="setImage($event)" />
            <p v-if="errors.url_avatar" class="error_valid">{{ errors.url_avatar }}</p>
          </b-form-group>
          <b-form-group
            label="Gender"
            label-for="gender-select"
          >
            <b-form-select
              v-model="teacher.gender"
              :options="genderOptions"
            />
            <p v-if="errors.gender" class="error_valid">{{ errors.gender }}</p>
          </b-form-group>
          <b-form-group
            label="Phone number"
            label-for="phone-number-input"
          >
            <b-form-input
              id="name-input"
              v-model="teacher.phone_number"
            />
            <p v-if="errors.phone_number" class="error_valid">{{ errors.phone_number }}</p>
          </b-form-group>
          <div class="form-group">
            <label for="about-input">About</label>
            <ckeditor v-model="teacher.about" :editor="editor" tag-name="textarea" />
          </div>
          <p v-if="errors.about" class="error_valid">{{ errors.about }}</p>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { uploadFile } from '../../../../api/common'
import UploadImage from '../../../../components/admin/uploadFile/UploadImg.vue'
import DatePicker from '../../../../components/datepicker/DatePicker'
import { addTeacher, updateTeacher } from '../../../../api/teacher'
import { convertDateTimeInsert } from '../../../../utils/index'
export default {
  components: {
    UploadImage,
    DatePicker
  },
  data() {
    return {
      errors: {},
      teacher: {
        full_name: null,
        email: null,
        url_avatar: null,
        date_of_birth: null,
        gender: null,
        phone_number: null,
        about: null
      },
      genderOptions: [
        { 'value': null, text: 'Select gender' },
        { 'value': 'not_specific', 'text': 'Not Specific' },
        { 'value': 'male', 'text': 'Male' },
        { 'value': 'female', 'text': 'Female' }
      ],
      image: null,
      editor: ClassicEditor
    }
  },
  methods: {
    setDate(value) {
      this.teacher.date_of_birth = value
    },
    setImage(value) {
      this.image = value
    },
    checkFormValidity() {
      this.errors = {}
      for (const [key, value] of Object.entries(this.teacher)) {
        if (!value) {
          switch (key) {
            case 'full_name':
              this.errors[`${key}`] = `Full name is valid`
              break
            case 'date_of_birth':
              this.errors[`${key}`] = `Date of birth is valid`
              break
            case 'email':
              this.errors[`${key}`] = `Email is valid`
              break
            case 'url_avatar':
              if (!this.image) this.errors[`${key}`] = `Avatar is valid`
              break
            case 'gender':
              this.errors[`${key}`] = `Gender is valid`
              break
            case 'phone_number':
              this.errors[`${key}`] = `Phone number is valid`
              break
            case 'about':
              this.errors[`${key}`] = `About is valid`
              break
          }
        }
      }
      return _.isEmpty(this.errors)
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.$store.commit('SET_LOADING')
      if (this.image) {
        this.teacher.url_avatar = await uploadFile(this.image)
      }
      try {
        const body = {
          'full_name': this.teacher.full_name,
          'date_of_birth': convertDateTimeInsert(this.teacher.date_of_birth),
          'email': this.teacher.email,
          'url_avatar': this.teacher.url_avatar,
          'gender': this.teacher.gender,
          'phone_number': this.teacher.phone_number,
          'about': this.teacher.about
        }
        if (this.$route.params.id) {
          await updateTeacher(this.teacher.id, body)
        } else {
          await addTeacher(body)
        }
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.$router.push({
        path: '/admin/teacher'
      })
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>
