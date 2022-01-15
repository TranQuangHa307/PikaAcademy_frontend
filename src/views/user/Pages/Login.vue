<template>
  <div class="container">
    <div class="pt-5 pb-5" style="width: 33%; margin: auto; color: white;">
      <h1>Sign in</h1>
      <div class="mt-5">
        <div>
          <div>
            <div class="btn_link mt-2" style="background-color: white; color: black;" @click="onLoginGoogle()">
              <b-icon icon="google" variant="success" class="mr-2" />
              <span>Continue with Google</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; flex-direction: row;">
            <hr>
            <span style="font-weight: 400;">or continue with</span>
            <hr>
          </div>
          <transition>
            <div v-if="response" class="mt-2 mb-2 p-2" style="border: 2px solid #feda6a; width: 100%;">
              <span class="text-danger" style="width: 100%; font-size: 15px; text-align: center; font-weight: 600;">{{ response }}</span>
            </div>
          </transition>
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email address</label>
              <div>
                <input v-model="account.email" type="email" placeholder="mail@example.com" class="form-control form_input" required aria-describedby="emailHelp" @change="reset">
              </div>
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input id="inputPassword" v-model="account.password" type="password" class="form-control form_input" required @change="reset">
            </div>
            <div class="text-center">
              <p style="color: #feda6a;font-size: 15px;">Forgot Password?</p>
            </div>
            <button type="submit" class="form_button">
              <span class="text_btn">Sign in</span>
            </button>
          </form>
          <div class="text-center">
            <p class="text_p">Not a member yet? <router-link tag="span" class="text_span" :to="{ name: 'signUpUser' }">Sign up</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      account: {
        email: null,
        password: null
      },
      response: null
    }
  },
  created() {
    if (this.$store.state.User.myInfo) {
      this.$router.push({
        path: '/'
      })
    }
  },
  methods: {
    ...mapActions({
      login: 'User/login',
      loginGoogle: 'User/loginGoogle'
    }),
    async onLoginGoogle() {
      const googleUser = await this.$gAuth.signIn()
      const idToken = googleUser.getAuthResponse().id_token
      const userPictureUrl = googleUser.getBasicProfile().getImageUrl()
      const auth = {
        idToken: idToken,
        userPictureUrl: userPictureUrl
      }
      try {
        const loginRes = await this.loginGoogle(auth)
        if (loginRes) {
          this.$router.push({
            path: '/'
          })
        }
      } catch (error) {
        this.$swal({
          'icon': 'warning',
          'title': error.response?.data?.message || error.message,
          background: '#1D1E22'
        })
      }
    },
    async onSubmit() {
      this.$store.commit('SET_LOADING')
      try {
        const loginRes = await this.login(this.account)
        if (!loginRes) {
          this.response = 'The specified user name or password is incorrect!'
          this.$store.commit('SET_DONE_LOADING')
          return
        }
        this.$router.push({
          path: '/'
        })
      } catch (error) {
        this.$swal({
          'icon': 'warning',
          'title': error.message,
          background: '#1D1E22'
        })
      }
      this.$store.commit('SET_DONE_LOADING')
    },
    reset() {
      this.response = null
    }
  }
}
</script>

<style lang="scss" scoped>
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
  /* font-family: SF Pro Display; */
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
  border: none;
  background: #feda6a;
}
.form_input {
  color: white;
  width: 100% !important;
  border: 0px !important;
  height: 60px !important;
  font-size: 17px !important;
  font-family: SF Pro Display;
  font-weight: 400 !important;
  line-height: 20px !important;
  border-radius: 8px !important;
  background-color: #333336 !important;
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
