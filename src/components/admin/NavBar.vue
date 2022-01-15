<template>
  <div class="header_nb">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="white">
        <b-navbar-brand style="color: #97a8be;" href="#">{{ navComputed.text }}</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="mr-3" v-if="navComputed.isSearch">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-form class="mr-3">
              <div
                style="font-size: 2rem; display: flex; cursor: pointer;"
                title="Notification"
                @click="isShowNoti=!isShowNoti"
              >
                <b-icon icon="bell-fill" variant="info" />
                <span v-if="number" class="text_nofification">{{ number }}</span>
              </div>
            </b-nav-form>

            <b-nav-item-dropdown right no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-img style="margin: -10px; height: 50px; width: 50px;" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="Circle image" />
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div v-if="isShowNoti && number > 0" class="ad_noti">
      <ul>
        <li v-for="(transaction, index) in transactions" :key="index+100" @click="redirectToTransactions(transaction.id)">
          <div class="mr-2">
            <b-icon icon="credit-card2-back" font-scale="3" />
          </div>
          <div>
            <div>
              {{ transaction.code }}
            </div>
            <div>
              <b>Giao dịch</b> chuyển khoản chờ xác nhận!
            </div>
          </div>
        </li>
        <li v-for="(course, index) in courses" :key="index+1000" @click="redirectToCourse(course.id)">
          <div class="mr-2">
            <b-icon icon="play-btn" font-scale="3" />
          </div>
          <div>
            <div>
              {{ course.name }}
            </div>
            <div>
              <b>Khóa học</b> đăng tải chờ xác nhận!
            </div>
          </div>
        </li>
        <li v-for="(teacher, index) in teachers" :key="index+10000" @click="redirectToTeacher(teacher.id)">
          <div class="mr-2">
            <b-icon icon="person-plus" font-scale="3" />
          </div>
          <div>
            <div>
              <b>{{ teacher.full_name }}</b>
            </div>
            <div>
              <b>Giáo viên</b> đăng ký tài khoản chờ xác nhận!
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTransactionListByStatus } from '../../api/transaction'
import { getAllInActive } from '../../api/teacher'
import { getAllActive } from '../../api/course'
import eventBus from '../../utils/eventBus'
export default {
  data() {
    return {
      numberPT: 0,
      nav: {},
      isShowNoti: false,
      teachers: [],
      transactions: [],
      courses: [],
      arrNav: [
        {
          name: 'dashBoardManeger',
          text: 'Dashboard',
          isSearch: false
        },
        {
          name: 'transactionManeger',
          text: 'Transaction',
          isSearch: false
        },
        {
          name: 'transactionDetailsManeger',
          text: 'Transaction',
          isSearch: false
        },
        {
          name: 'courseManeger',
          text: 'Course',
          isSearch: true
        },
        {
          name: 'addCourse',
          text: 'Add Course',
          isSearch: false
        },
        {
          name: 'courseDetail',
          text: 'Edit Course',
          isSearch: false
        },
        {
          name: 'intersets',
          text: 'Intersets',
          isSearch: true
        },
        {
          name: 'category',
          text: 'Category',
          isSearch: true
        },
        {
          name: 'teacher',
          text: 'Teacher',
          isSearch: true
        },
        {
          name: 'addTeacher',
          text: 'Add Teacher',
          isSearch: false
        },
        {
          name: 'teacherDetail',
          text: 'Edit Teacher',
          isSearch: false
        },
        {
          name: 'user',
          text: 'User',
          isSearch: true
        },
        {
          name: 'addUser',
          text: 'Add User',
          isSearch: false
        },
        {
          name: 'userInformation',
          text: 'Edit User',
          isSearch: false
        }
      ]
    }
  },
  computed: {
    navComputed() {
      return this.nav
    },
    number() {
      return this.numberPT
    }
  },
  async created() {
    await this.getDataNoti()
    this.getNav(this.$route.name)
    eventBus.$on('updateNoti', async() => {
      await this.getDataNoti()
    })
  },
  watch: {
    $route(to, from) {
      this.getNav(to.name)
      this.isShowNoti = false
    }
  },
  methods: {
    redirectToTeacher(teacherId) {
      this.$router.push({
        path: `/admin/teacher/${teacherId}`
      })
    },
    redirectToCourse(courseId) {
      this.$router.push({
        path: `/admin/course/${courseId}`
      })
    },
    redirectToTransactions(transactionId) {
      this.$router.push({
        path: `/admin/transaction/${transactionId}`
      })
    },
    getNav(name) {
      this.nav = this.arrNav.find(item => item.name === name)
    },
    async getDataNoti() {
      this.numberPT = 0
      this.teachers = await getAllInActive()
      if (this.teachers) this.numberPT += this.teachers.length
      this.courses = await getAllActive()
      if (this.courses) this.numberPT += this.courses.length
      this.transactions = await getTransactionListByStatus('pending')
      if (this.transactions) this.numberPT += this.transactions.length
    },
    redirectToPendingTransaction() {
      this.$router.push({
        path: '/admin/transaction'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header_nb {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  position: sticky;
  top: 0;
  z-index: 1;
}
.text_nofification {
  background-color: red;
  color: white;
  border-radius: 15px;
  font-size: 15px;
  text-align: center;
  width: 1.5em;
  font-weight: 700;
  height: 1.5em;
  margin-left: -0.8rem;
  margin-top: -0.8em;
}
.ad_noti {
  background: wheat;
  width: 400px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  right: 0;
  position: absolute;
  border-radius: 0.5em;
  max-height: 70vh;
  overflow-y: auto;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    padding: 0.5em;
    display: flex;
    align-items: center;
  }
  li:hover {
    background: #F0F2F5;
    border-radius: 0.5em;
    cursor: pointer;
  }
}
</style>
