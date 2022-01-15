<template>
  <div class="text-white pt-3">
    <div class="main">
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
            Profile & Settings
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="mt-3">
        <h1>Profile & Settings</h1>
        <div class="nav_content mt-4">
          <b-nav tabs fill style="margin-left: 0px; color: white;">
            <b-nav-item class="text-white" @click="redirectToProfile()">About</b-nav-item>
            <b-nav-item class="text-white" active>My Orders</b-nav-item>
          </b-nav>
        </div>
        <div class="mt-3 my_transaction">
          <div class="w100">
            <b-alert v-for="item in transactions" :key="item.id" class="transaction_info d_flex" variant="dark"  show>
              <div class="w25 txt_center">
                <span>{{ item.code }}</span>
              </div>
              <div class="w25 txt_center">
                <span>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total) }}</span>
                <br/>
                <span>{{ convertTSToDateTime(item.time) }}</span>
              </div>
              <div class="w25 txt_center">
                <b-button class="transaction_status" :variant="getvariant(item.status)" disabled>{{ item.status }}</b-button>
              </div>
              <div class="w25 txt_center">
                <b-button v-if="['initial', 'pending'].includes(item.status)" variant="outline-info" @click="redirectToCheckout(item.id)">Details</b-button>
              </div>
            </b-alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserTransactions } from '../../../api/user'
export default {
  data() {
    return {
      transactions: [],
      total: 0
    }
  },
  async created() {
    await this.getTransactions(this.$store.state.User.myInfo.id)
  },
  methods: {
    async getTransactions(userId = 1) {
      const params = {
        'page': 1,
        'limit': 10,
        'status': ['success', 'pending', 'initial'].toString()
      }
      const { list, total } = await getUserTransactions(params, userId)
      this.transactions = list
      this.total = total
    },
    convertTSToDateTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000)
      return `${this.getNumber(date.getDate())}/${this.getNumber(date.getMonth() + 1)}/${this.getNumber(date.getFullYear())} ${this.getNumber(date.getHours())}:${this.getNumber(date.getMinutes())}:${this.getNumber(date.getSeconds())}`
    },
    getNumber(number) {
      return (number < 10) ? `0${number}` : number
    },
    getvariant(status) {
      if (status === 'success') return 'success'
      if (status === 'pending') return 'warning'
    },
    redirectToCheckout(transactionId) {
      this.$router.push({
        name: 'checkoutUser',
        params: { id: transactionId }
      })
    },
    redirectToProfile() {
      this.$router.push({
        name: 'profileUser'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my_transaction {
  min-height: 31vh;
}
.transaction_info {
  color: white;
  background: #393F4D;
  display: flex;
  align-items: center;
  border: none;
}
.transaction_status {
  color: white;
  opacity: 1;
  font-weight: bold;
}
.selected_options {
  background-color: black;
  option {
  background-color: black;
}
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
