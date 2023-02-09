<template>
  <div class="container-fluid">
    <div class="pt-5 pb-5" style="width: 33%; margin: auto; color: white;">
      <h1>Đăng ký</h1>
      <div class="mt-5">
        <div>
          <form @submit.prevent="onSubmit">
            <div>
              <div class="p-2">
                <div class="mb-3">
                  <label for="inputEmail" class="form-label">Địa chỉ Email</label>
                  <div>
                    <input v-model="user.email" name="email" type="email" placeholder="mail@example.com" class="form-control form_input" aria-describedby="emailHelp">
                    <p v-if="errors.email" class="error_valid">
                      {{ errors.email }}
                    </p>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="inputPassword" class="form-label">Mật khẩu</label>
                  <input id="inputPassword" v-model="user.hash_pwd" name="password" type="password" class="form-control form_input">
                  <p v-if="errors.hash_pwd" class="error_valid">
                    {{ errors.hash_pwd }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2>Thông tin cá nhân</h2>
              <div class="p-2">
                <div class="form-group">
                  <label for="inputFullName" class="form-label">Họ Tên</label>
                  <div class="flex">
                    <div class="flex1">
                      <input v-model="user.first_name" name="firstName" type="text" class="form-control mr-2" placeholder="Họ">
                      <p v-if="errors.first_name" class="error_valid">
                        {{ errors.first_name }}
                      </p>
                    </div>
                    <div class="flex1">
                      <input v-model="user.last_name" name="lastName" type="text" class="form-control ml-2" placeholder="Tên">
                      <p v-if="errors.last_name" class="error_valid">
                        {{ errors.last_name }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputBirthday" class="form-label">Ngày sinh</label>
                  <date-picker :data="user.date_of_birth" @setDate="setDate($event)" />
                  <p v-if="errors.date_of_birth" class="error_valid">{{ errors.date_of_birth }}</p>
                </div>
                <div class="form-group">
                  <label for="inputGender" class="form-label">Giới tính</label>
                  <b-form-radio-group
                    v-model="user.gender"
                    :options="options"
                    class="mb-3"
                    value-field="value"
                    text-field="text"
                  />
                  <p v-if="errors.gender" class="error_valid">{{ errors.gender }}</p>
                </div>
                <div class="form-group">
                  <label for="inputPhone" class="form-label">Số điện thoại</label>
                  <input v-model="user.phone_number" name="phoneNumber" type="text" class="form-control" placeholder="Phone Number">
                  <p v-if="errors.phone_number" class="error_valid">{{ errors.phone_number }}</p>
                </div>
                <div class="form-group">
                  <label for="inputAvatar" class="form-label">Ảnh đại diện</label>
                  <upload-img :url-image="user.url_avatar" @setImage="setImage($event)" />
                  <p v-if="errors.url_avatar" class="error_valid">{{ errors.url_avatar }}</p>
                </div>
              </div>
            </div>
            <div class="mb-3" style="color:#FEDA6A;">
              <b-form-checkbox
                v-model="selectedAgreed"
                size="lg"
              >
                Đồng ý với điều khoản & điều kiện
              </b-form-checkbox>
            </div>
            <button type="submit" class="form_button" :class="{is_active: selectedAgreed}">
              <span class="text_btn">Đăng ký</span>
            </button>
          </form>
          <div class="text-center">
            <p class="text_p">Nếu bạn đã có sẵn tài khoản? <router-link tag="span" class="text_span" :to="{ name: 'loginUser' }">Đăng nhập</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _ } from 'vue-underscore'
import { signUpCheck, signUp } from '../../../api/user'
import DatePicker from '../../../components/datepicker/DatePicker.vue'
import UploadImg from '../../../components/admin/uploadFile/UploadImg.vue'
import { uploadFile } from '../../../api/common'
import { convertDateTimeInsert } from '../../../utils/index'
export default {
  components: {
    DatePicker,
    UploadImg
  },
  data() {
    return {
      errors: {},
      user: {
        first_name: null,
        last_name: null,
        url_avatar: null,
        email: null,
        date_of_birth: null,
        phone_number: null,
        hash_pwd: null,
        gender: null
      },
      image: null,
      selectedAgreed: false,
      options: [
        { 'value': 'not_specific', 'text': 'Không xác định' },
        { 'value': 'male', 'text': 'Nam' },
        { 'value': 'female', 'text': 'Nữ' }
      ]
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
            case 'hash_pwd':
              this.errors[`${key}`] = 'Password is valid'
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
    async onSubmit() {
      this.$store.commit('SET_LOADING')
      try {
        if (!this.selectedAgreed || !this.checkFormValidity()) return
        await signUpCheck(this.email)
        if (this.image) this.user.url_avatar = await uploadFile(this.image)
        this.user.date_of_birth = convertDateTimeInsert(this.user.date_of_birth)
        await signUp(this.user)
        this.$swal({
          'icon': 'success',
          'title': 'Đăng ký thành công',
          background: '#1D1E22',
          html:
            '<p style="color: #feda6a;">Chúng tôi đã gửi một email tới <br/>' +
            `${this.user.email}</p>`
        }).then((result) => {
          this.$router.push({
            path: '/login'
          })
        })
      } catch (error) {
        this.$swal({
          'icon': 'warning',
          'title': error.message,
          background: '#1D1E22'
        })
      }
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  background-color: #333336 !important;
  color: white !important;
  font-family: SF Pro Display;
  border: none;
}
label {
  font-weight: bold;
}
.text_btn {
  color: #1D1E22;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  text-transform: none;
}
.text_span {
  color: #feda6a;
  cursor: pointer;
  text-align: center;
  margin-left: 10px;
}
.text_p {
  color: gray;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.078px;
}
.form_button {
  flex: 1;
  width: 100%;
  height: 60px;
  margin-top: 20px;
  min-height: 60px;
  border-radius: 8px;
  margin-bottom: 20px;
  opacity: 0.5;
  background: #feda6a;
}
.is_active {
  opacity: 1;
}
.form_input {
  width: 100% !important;
  border: 0px !important;
  height: 60px !important;
  font-size: 17px !important;
  font-weight: 400 !important;
  line-height: 20px !important;
  border-radius: 8px !important;
}
hr {
  background-color: #393f4d;
  width: 30%;
  height: 0.1px;
}
.btn_link {
  background-color: #3A5C98;
  width: 100%;
  border: 1px;
  cursor: pointer;
  height: 48px;
  display: flex;
  align-items: center;
  border-color: #000000;
  border-style: solid;
  border-radius: 100px;
  justify-content: center;
}
</style>
