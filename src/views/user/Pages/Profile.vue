<template>
  <div class="text-white pt-3">
    <div class="main">
      <div class="nav">
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
          <b-navbar-brand class="text_nav" href="/">
            Trang chủ
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            >
          </b-navbar-brand>
          <b-navbar-brand class="text_nav" href="/">
            Thông tin cá nhân
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="mt-3">
        <h1>Thông tin cá nhân</h1>
        <div class="nav_content mt-4">
          <b-nav tabs fill style="margin-left: 0px; color: white;">
            <b-nav-item class="text-white" active>Giới thiệu</b-nav-item>
          </b-nav>
        </div>
        <div style="display: flex;" class="mt-3">
          <div style="width: 60%;">
            <form>
              <div style="width: 100%; display: flex; align-items: center;">
                <div class="mb-3 mr-2" style="border-bottom: 2px solid #feda6a; width: 45%;">
                  <label for="inputFirstName" class="form-label" style="font-size: 13px; opacity: 0.5;">Họ</label>
                  <div>
                    <input v-model="profile.first_name" type="text" class="form-control form_input" required>
                  </div>
                </div>
                <div class="mb-3 ml-2" style="border-bottom: 2px solid #feda6a; width: 45%;">
                  <label for="inputLastName" class="form-label" style="font-size: 13px; opacity: 0.5;">Tên</label>
                  <div>
                    <input v-model="profile.last_name" type="text" class="form-control form_input" required>
                  </div>
                </div>
              </div>
              <div style="width: 100%; display: flex; align-items: center;">
                <div class="mb-3 mr-2" style="border-bottom: 2px solid #feda6a; width: 45%;">
                  <label for="inputEmail" class="form-label" style="font-size: 13px; opacity: 0.5;">Giới tính</label>
                  <div>
                    <select v-model="profile.gender" class="form-control form_input" style="background: none;border:none; color: white;" aria-label="Default select example">
                      <option v-for="(gender, index) in genderOptions" :key="index" :value="gender.value" style="background-color: #1D1E22;">{{ gender.text }}</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 ml-2" style="border-bottom: 2px solid #feda6a; width: 45%;">
                  <label for="inputPhone" class="form-label" style="font-size: 13px; opacity: 0.5;">Số điện thoại</label>
                  <input id="inputPhone" v-model="profile.phone_number" type="text" class="form-control form_input" required>
                </div>
              </div>
              <div style="width: 100%; display: flex; align-items: center;">
                <div class="mb-3 mr-2" style="border-bottom: 2px solid #feda6a; width: 45%;">
                  <label for="inputEmail" class="form-label" style="font-size: 13px; opacity: 0.5;">Ngày sinh</label>
                  <div>
                    <b-input-group class="mb-3">
                      <b-form-input
                        id="example-input"
                        v-model="profile.date_of_birth"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        autocomplete="off"
                        style="background: none;border:none; color: white;"
                      />
                      <b-input-group-append>
                        <b-form-datepicker
                          v-model="profile.date_of_birth"
                          button-only
                          right
                          locale="en-US"
                          aria-controls="example-input"
                          button-variant="success"
                          size="sm"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="mb-3 ml-2 d_flex" style="width: 45%; align-items: center;">
                  <b-button pill block variant="outline-primary" @click="openFormChangePassword">Đổi mật khẩu</b-button>
                </div>
              </div>
              <div style="width: 100%; display: flex; align-items: center;">
                <div class="mb-3 mr-2" style="width: 45%;">
                  <b-button pill block style="background-color: #FEDA6A; color: black;" @click="onUpdateUser">Lưu thay đổi</b-button>
                </div>
              </div>
            </form>
          </div>
          <div style="width: 50%; height: 100%; text-align: center;">
            <div>
              <b-img width="200" height="200" style="border: 3px solid #feda6a; width: 200px; height: 200px;" rounded="circle" :src="profile.url_avatar" />
            </div>
            <div class="mt-2">
              <label for="formFile" class="form-label"> <p style="color: #feda6a; cursor: pointer; margin-top: 14px; text-decoration: underline;">Cập nhật ảnh đại diện</p></label>
              <b-form-file id="formFile" v-model="image" accept=".jpg, .png, .gif, .jfif" style="display: none;" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-rating"
      ref="modal"
      v-model="isModalFormOpen"
      title="Đổi mật khẩu"
      hide-footer
      hide-header-close
    >
      <change-password @cancelForm="cancelForm" />
    </b-modal>
  </div>
</template>

<script>
// import { convertDateTime } from '../../../utils/index'
import { uploadFile } from '../../../api/common'
import { updateUser } from '../../../api/user'
import { convertTimeStamptoDate, convertDateTimeInsert } from '../../../utils/index'
import ChangePassword from '../../../components/user/ChangePassword'
export default {
  components: {
    ChangePassword
  },
  data() {
    return {
      profile: {},
      genderOptions: [
        { value: 'not_specific', text: 'Not specific' },
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      image: null,
      isModalFormOpen: false
    }
  },
  watch: {
    async image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          try {
            this.profile.url_avatar = await uploadFile(this.image)
            this.onUpdateUser()
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  },
  async created() {
    this.profile = this.$store.state.User.myInfo
    this.profile.date_of_birth = this.convertDateTimeInsert(this.convertTimeStamptoDate(this.profile.date_of_birth))
  },
  methods: {
    openFormChangePassword() {
      this.isModalFormOpen = true
    },
    cancelForm() {
      this.isModalFormOpen = false
    },
    convertTimeStamptoDate,
    convertDateTimeInsert,
    async onUpdateUser() {
      // this.profile.date_of_birth = this.profile.date_of_birth
      await updateUser(this.profile.id, this.profile)
      this.$swal({
        toast: true,
        icon: 'success',
        title: 'Cập nhật thông tin thành công!',
        background: '#28A745',
        animation: false,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    },
    redirectToMyTransactions() {
      this.$router.push({ name: 'myTransactions' })
    }
  }
}
</script>

<style lang="scss" scoped>
.selected_options {
  background-color: black;
  option {
  background-color: black;
}
}
.form_input {
  font: inherit;
    color: currentColor;
    width: 100%;
    border: 0;
    height: 1.1876em;
    margin: 0;
    display: block;
    padding: 6px 0 7px;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    letter-spacing: inherit;
    animation-duration: 10ms;
    -webkit-tap-highlight-color: transparent;
}
.nav_content {
  border-bottom: 1px solid #393F4D;
  a {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid #393F4D;
    color: #79797C;
    background-color: transparent !important;
    text-transform: uppercase;
    font-size: 0.875rem;
  }
  .active {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid #feda6a;
    color: #feda6a;
  }
}
.main {
  margin: auto;
  max-width: 67vw;
}
.text_nav {
  color: #d4d4dc;
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
}
.text_title {
  color: #feda6a;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 400;
}
.nav {
  nav {
    padding-left: 0;
  }
  a:hover{
    color: #d4d4dc;
    text-decoration: none;
  }
}
</style>
