<template>
  <div class="container-fluid" style="margin: 1em auto;">
    <div class="w100">
      <div class="row">
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">
              <b-icon icon="people-fill" variant="info" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Total Users</p>
              <span class="fw700 value_card_item">{{ totalUsers }}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">

              <b-icon icon="collection-play-fill" variant="info" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Total Courses</p>
              <span class="fw700 value_card_item">{{ totalCourses }}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-currency-dollar text-primary" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Total Sales</p>
              <span class="fw700 value_card_item">{{ totalSales }}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">
              <b-icon icon="cart-check-fill" variant="orange" style="color: orange;" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Total Orders</p>
              <span class="fw700 value_card_item">{{ totalOrders }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3" style="background-color: white; box-shadow: 0 1px 4px rgb(0 21 41 / 8%);">
      <line-chart v-if="loaded" :labels="labels" :datasets="datasets" style="height: calc(100vh - 250px)"/>
    </div>
  </div>
</template>

<script>
import { getUserList } from '../../../../api/user'
import { getCourseList } from '../../../../api/course'
import { getTransactionListByStatus } from '../../../../api/transaction'
import LineChart from '../../../../components/admin/chart/LineChart.vue'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      totalUsers: 0,
      totalCourses: 0,
      totalSales: 0,
      totalOrders: 0,
      successTransactionList: [],
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          label: 'Total Sales',
          backgroundColor: '#007BFF',
          data: []
        }
      ],
      loaded: false
    }
  },
  async mounted() {
    this.loaded = true
    const list = await getTransactionListByStatus('success')
    for (let i = 0; i < 12; i++) {
      let total = 0
      list.forEach(item => {
        if (this.checkDateTimeTransaction(item.time, i, 2021)) { total += item.total }
      })
      this.datasets[0].data.push(total)
    }
    console.log(this.datasets[0].data)
  },
  async created() {
    await this.getTotalUsers()
    await this.getTotalCourses()
    await this.getSuccessTransactionList()
  },
  methods: {
    async getTotalUsers() {
      const params = {
        'page': 1,
        'limit': 100
      }
      // eslint-disable-next-line no-unused-vars
      const { data, total } = await getUserList(params)
      this.totalUsers = total
    },
    async getTotalCourses() {
      const params = {
        'page': 1,
        'limit': 100
      }
      // eslint-disable-next-line no-unused-vars
      const { data, total } = await getCourseList(params)
      this.totalCourses = total
    },
    async getSuccessTransactionList() {
      this.successTransactionList = await getTransactionListByStatus('success')
      this.totalOrders = this.successTransactionList.length
      this.totalSales = this.successTransactionList.reduce((n, { total }) => n + total, 0)
    },
    checkDateTimeTransaction(timeStamp, month, year) {
      const dateTime = new Date(timeStamp * 1000)
      if (dateTime.getMonth() === month && dateTime.getFullYear() === year) return true
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.card_db {
  height: 100px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #FFFFFF;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.name_card_item {
  color: rgba(0,0,0,.45);
  font-size: 18px;
}
.value_card_item {
  font-size: 20px;
}
</style>
