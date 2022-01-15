<template>
  <div class="container mt-5 pt-5">
    <div class="nav">
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
          <b-navbar-brand class="text_nav" href="/">
            Home
          </b-navbar-brand>
          <b-navbar-brand class="text_nav">
            >
          </b-navbar-brand>
          <b-navbar-brand class="text_nav" href="/">
            Teacher registration form
          </b-navbar-brand>
        </b-navbar>
      </div>
    <div>
      <b-progress class="w-100" max="100" height="1.5rem">
        <b-progress-bar :value="valBarComputed"></b-progress-bar>
      </b-progress>
    </div>
    <component :is="comNameComputed" @continueForm="continueForm($event)" @before="before($event)" @onSubmit="onSubmit($event)" />
  </div>
</template>

<script>
import Form1 from '../../../components/user/TeacherRegistration/Form1'
import Form2 from '../../../components/user/TeacherRegistration/Form2'
import Form3 from '../../../components/user/TeacherRegistration/Form3'
import Form4 from '../../../components/user/TeacherRegistration/Form4'
import { signUpCheck, signUp } from '../../../api/teacher'
export default {
  components: {
    Form1,
    Form2,
    Form3,
    Form4
  },
  data() {
    return {
      comName: 'Form1',
      valBar: 20,
      index: 1
    }
  },
  computed: {
    comNameComputed() {
      return this.comName
    },
    valBarComputed() {
      return this.valBar
    }
  },
  methods: {
    async onSubmit(data) {
      this.$store.commit('SET_LOADING')
      try {
        await signUpCheck(data.email)
        await signUp(data)
        this.$swal({
          'icon': 'success',
          'title': 'Sign up Successfully',
          background: '#1D1E22',
          html:
            '<p style="color: #feda6a;">We have sent an email to <br/>' +
            `${data.email}</p>`
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
    },
    continueForm() {
      if (this.index < 5) {
        this.index++
        this.comName = `Form${this.index}`
        this.valBar = this.index * 20
      }
    },
    before() {
      if (this.index > 1) {
        this.index--
        this.comName = `Form${this.index}`
        this.valBar = this.index * 20
      }
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
