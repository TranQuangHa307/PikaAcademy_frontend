<template>
  <div class="te_form_te">
    <div class="w100 txt_right">
      <b-button type="button" v-if="!isEdit" variant="primary" class="mr-3" @click="setEdit(true)">Edit</b-button>
      <b-button type="button" variant="danger" @click="openFormChangePassword()">Change Password</b-button>
    </div>
    <b-form @submit.prevent="onSubmit()">
      <div class="w100 d_flex">
        <div class="w45">
          <b-form-group
            id="input-group-full-name"
            label="Full Name:"
            label-for="input-full-name"
          >
            <b-form-input
              id="input-full-name"
              type="text"
              v-model="teacher.full_name"
              :disabled="!isEdit"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="w10" />
        <div class="w45">
          <b-form-group
            id="input-group-email"
            label="Email:"
            label-for="input-email"
          >
            <b-form-input
              id="input-email"
              type="email"
              v-model="teacher.email"
              :disabled="!isEdit"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="w100 d_flex">
        <div class="w30">
          <b-form-group
            id="input-group-phone-number"
            label="Phone Number:"
            label-for="input-phone-number"
          >
            <b-form-input
              id="input-phone-number"
              type="text"
              v-model="teacher.phone_number"
              :disabled="!isEdit"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="w5"/>
        <div class="w30">
          <b-form-group
            id="input-group-date-of-birth"
            label="Date of Birth:"
            label-for="input-date-of-birth"
          >
            <b-form-input
              id="input-date-of-birth"
              type="date"
              v-model="teacher.date_of_birth"
              :disabled="!isEdit"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="w5"/>
        <div class="w30">
          <b-form-group
            id="input-group-genre"
            label="Genre:"
            label-for="input-genre"
          >
            <select v-model="teacher.gender" class="form-control form_input" :disabled="!isEdit">
              <option v-for="(gender, index) in genderOptions" :key="index" :value="gender.value">{{ gender.text }}</option>
            </select>
          </b-form-group>
        </div>
      </div>
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
    <b-modal
        id="modal-rating"
        ref="modal"
        v-model="isModalFormOpen"
        title="Change Password"
        hide-footer
        hide-header-close
      >
      <change-password :elmntId="teacher.id" @cancelForm="cancelForm" @onSubmit="onChangePassword($event)" />
    </b-modal>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../../../../components/admin/uploadFile/UploadImg'
import { getTeacherInfo, updateTeacher, changePassword } from '../../../../api/teacher'
import { uploadFile } from '../../../../api/common'
import ChangePassword from '../../../../components/ChangePassword'
export default {
  components: {
    UploadImage,
    ChangePassword
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
      image: null,
      isModalFormOpen: false
    }
  },
  async created() {
    this.teacher = await getTeacherInfo(this.$store.state.Teacher.myInfo.id)
    if (this.teacher.date_of_birth) this.teacher.date_of_birth = this.convertDateOfBirth(this.teacher.date_of_birth)
  },
  methods: {
    openFormChangePassword() {
      this.isModalFormOpen = true
    },
    async onChangePassword(value) {
      const res = await changePassword(value)
      let icon = 'success'
      if (!res.status) icon = 'warning'
      this.$swal({
        'icon': icon,
        'title': res.message,
        background: '#1D1E22'
      }).then((result) => {
        if (res.status) this.cancelForm()
      })
    },
    cancelForm() {
      this.isModalFormOpen = false
    },
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
    height: 90vh;
    box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    overflow: auto;
  }
</style>
