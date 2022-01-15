<template>
  <div>
    <div class="container">
      <div class="te_login_form">
        <h1 class="te_login_title">Login</h1>
        <div>
          <form @submit.prevent="onSubmit">
            <div>
              <input v-model="account.email" placeholder="Email" />
            </div>
            <div>
              <input type="password" v-model="account.password" placeholder="Password" />
            </div>
            <div>
              <b-button block variant="primary" type="submit">Login</b-button>
            </div>
          </form>
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
        email: '',
        password: ''
      },
      response: null
    }
  },
  created() {
    this.isLoading = this.$store.state.Teacher.isLoading
  },
  methods: {
    ...mapActions({
      login: 'Teacher/login'
    }),
    async onSubmit() {
      this.$store.commit('SET_LOADING')
      try {
        const loginRes = await this.login(this.account)
        if (!loginRes) {
          this.response = 'The specified user name or password is incorrect!'
          this.$swal({
            'icon': 'warning',
            'title': this.response,
            background: '#1D1E22'
          })
          this.$store.commit('SET_DONE_LOADING')
          return
        }
        this.$router.push({
          name: 'dashBoardTeacherManeger'
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
    redirectToDashboard() {
      this.$router.push({
        name: 'dashBoardTeacherManeger'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.te_login_form {
  padding: 0 2em;
  padding-top: 30vh;
  background-color: rgba(30,32,55,.12);
  height: 100vh;
  width: 50%;
  margin: 0 auto;
  input, button {
    width: 100%;
    height: 50px;
    margin: 0.5em auto;
    border-radius: 5px;
    font-size: 20px;
  }
  input {
    background-color: #0E3C5C;
    border: 3px solid #FF5252;
    color: white;
    padding: 0 0.5em;
  }
  input::placeholder {
    color: white;
  }
}
.te_login_title {
  width: 100%;
  text-align: center;
  color: white;
}
</style>
