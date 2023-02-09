<template>
  <div>
    <section>
      <div>
        <section class="login-form py-md-5 py-3">
          <div class="card card_border p-md-4">
            <div class="card-body">
              <b-form @submit.prevent="onSubmit">
                <div class="text-center mb-lg-5 mb4">
                  <h3 class="login__title mb-2">Đăng nhập</h3>
                </div>
                <b-alert
                  v-if="response"
                  variant="danger"
                  class="login_res"
                  show
                ><p>{{ response }}</p></b-alert>
                <b-form-group>
                  <label
                    for="exampleInputEmail1"
                    class="input__label"
                  >Tài khoản</label>
                  <b-form-input
                    v-model="account.username"
                    type="text"
                    class="form-control login_text_field_bg input-style"
                    required
                  />
                </b-form-group>
                <b-form-group class="mt-3">
                  <label
                    for="exampleInputPassword1"
                    class="input__label"
                  >Mật khẩu</label>
                  <b-form-input
                    v-model="account.password"
                    type="password"
                    class="form-control login_text_field_bg input-style"
                    required
                  />
                </b-form-group>
                <div
                  class="
                    d-flex
                    align-items-center
                    flex-wrap
                    justify-content-between
                  "
                >
                  <b-button
                    block
                    type="submit"
                    variant="primary"
                    class="btn-style mt-4"
                  >Đăng nhập</b-button>
                </div>
              </b-form>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      account: {
        username: '',
        password: ''
      },
      response: null
    }
  },
  created() {
    this.isLoading = this.$store.state.Admin.isLoading
  },
  methods: {
    ...mapActions({
      login: 'Admin/login'
    }),
    async onSubmit() {
      this.$store.commit('SET_LOADING')
      try {
        const loginRes = await this.login(this.account)
        if (!loginRes) {
          this.response = 'Tài khoản hoặc mật khẩu không chính xác!'
          this.$store.commit('SET_DONE_LOADING')
          return
        }
        this.$router.push({
          path: '/admin/dashboard'
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
.login-form {
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  min-height: 100vh;
}
.card_border {
  border: none;
  box-shadow: 0 1px 2px 1px rgba(154, 154, 204, 0.22);
}
.login__title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  color: #4755ab;
}
.input__label {
  font-size: 18px;
  line-height: 25px;
  text-transform: capitalize;
  margin-bottom: 3px;
}
.login_text_field_bg {
  background-color: rgba(71, 90, 171, 0.07);
}
.login_res {
  background-color: #c82333;
  color: white;
}

</style>
