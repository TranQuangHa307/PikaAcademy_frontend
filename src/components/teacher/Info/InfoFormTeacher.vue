<template>
  <div class="te_form_te">
    <div class="w100 txt_right">
      <b-button v-if="!isEdit" variant="primary" class="mr-3" @click="setEdit(true)">Edit</b-button>
      <b-button variant="danger">Change Password</b-button>
    </div>
    <b-form @submit.prevent="onSubmit()">
      <b-form-group
        id="input-group-full-name"
        label="Full Name:"
        label-for="input-full-name"
      >
        <b-form-input
          id="input-full-name"
          v-model="teacher.full_name"
          type="text"
          :disabled="!isEdit"
          required
        />
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label="Email:"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="teacher.email"
          type="email"
          :disabled="!isEdit"
          required
        />
      </b-form-group>
      <b-form-group
        id="input-group-phone-number"
        label="Phone Number:"
        label-for="input-phone-number"
      >
        <b-form-input
          id="input-phone-number"
          v-model="teacher.phone_number"
          type="text"
          :disabled="!isEdit"
          required
        />
      </b-form-group>
      <b-form-group
        id="input-group-genre"
        label="Genre:"
        label-for="input-genre"
      >
        <select v-model="teacher.gender" class="form-control form_input" :disabled="!isEdit">
          <option v-for="(gender, index) in genderOptions" :key="index" :value="gender.value">{{ gender.text }}</option>
        </select>
      </b-form-group>
      <b-form-group
        id="input-group-date-of-birth"
        label="Date of Birth:"
        label-for="input-date-of-birth"
      >
        <b-form-input
          id="input-date-of-birth"
          v-model="teacher.date_of_birth"
          type="date"
          :disabled="!isEdit"
          required
        />
      </b-form-group>
      <b-form-group
        id="input-group-avatar"
        label="Avatar:"
        label-for="input-avatar"
      >
        <upload-image :url-image="teacher.url_avatar" @setImage="setImage($event)" />
      </b-form-group>
      <b-form-group
        id="input-group-about"
        label="About:"
        label-for="input-about"
      >
        <ckeditor v-model="teacher.about" :editor="editor" tag-name="textarea" :disabled="!isEdit" />
      </b-form-group>
      <div v-if="isEdit" class="w100 txt_center">
        <b-button type="button" variant="danger" class="mr-2" @click="setEdit(false)">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../../../components/admin/uploadFile/UploadImg'
import { getTeacherInfo, updateTeacher } from '../../../api/teacher'
import { uploadFile } from '../../../api/common'
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      teacher: {
        full_name: null,
        date_of_birth: null,
        gender: null,
        phone_number: null,
        email: null,
        about: null,
        url_avatar: null
      },
      genderOptions: [
        { value: 'not_specific', text: 'Not specific' },
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      editor: ClassicEditor,
      isEdit: false,
      image: null
    }
  },
  async created() {
    this.teacher = await getTeacherInfo(this.$store.state.Teacher.myInfo.id)
    if (this.teacher.date_of_birth) this.teacher.date_of_birth = this.convertDateOfBirth(this.teacher.date_of_birth)
  },
  methods: {
    setImage(value) {
      this.image = value
    },
    setEdit(bool) {
      this.isEdit = bool
    },
    async onSubmit() {
      this.$store.commit('SET_LOADING')
      if (this.image) {
        this.teacher.url_avatar = await uploadFile(this.image)
      }
      try {
        const body = {
          'id': this.teacher.id,
          'full_name': this.teacher.full_name,
          'date_of_birth': this.teacher.date_of_birth,
          'gender': this.teacher.gender,
          'phone_number': this.teacher.phone_number,
          'email': this.teacher.email,
          'about': this.teacher.about,
          'url_avatar': this.teacher.url_avatar
        }
        await updateTeacher(this.teacher.id, body)
        this.showResAction('success', 'Successfully')
        this.setEdit(false)
      } catch (error) {
        this.showResAction('waring', error.response?.data?.message || error.message)
      }
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>

<style>
  .te_form_te {
    background-color: white;
    margin: 1em;
    padding: 1em;
    border-radius: 0.5em;
  }
</style>
