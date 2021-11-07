<template>
  <div>
    <div class="table-users">
      <div class="header">
        <span>Transaction</span>
        <div class="float-right w10">
          <b-form-select v-model="selectedStatus" :options="options" />
        </div>
      </div>

      <table cellspacing="0" style="border-bottom: 1px solid #FEC415;">
        <thead>
          <tr>
            <th>Code</th>
            <th>Voucher</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Payment mode</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in table.data"
            :key="index"
          >
            <td>{{ transaction.code }}</td>
            <td>{{ transaction.voucher_id }}</td>
            <td>{{ transaction.discount }}</td>
            <td>{{ transaction.total }}</td>
            <td>{{ transaction.payment_mode }}</td>
            <td>{{ convertDateTime(transaction.time) }}</td>
            <td>
              <router-link tag="button" :to="{ name: 'transactionDetailsManeger', params: { id: transaction.id }}" class="btn" :class="getClassButton(transaction.status)">
                {{ transaction.status }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <b-pagination
          v-model="table.page"
          :total-rows="table.total"
          :per-page="table.perPage"
          class="mt-4 float-right mr-4"
          @change="onPageChange"
        >
          <template #first-text><span class="text-success">First</span></template>
          <template #prev-text><span class="text-danger">Prev</span></template>
          <template #next-text><span class="text-warning">Next</span></template>
          <template #last-text><span class="text-info">Last</span></template>
          <template #ellipsis-text>
            <b-spinner small type="grow" />
            <b-spinner small type="grow" />
            <b-spinner small type="grow" />
          </template>
          <template #page="{ page, active }">
            <b v-if="active">{{ page }}</b>
            <i v-else>{{ page }}</i>
          </template>
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getTransactionList } from '../../../../api/transaction'
import { convertDateTime } from '../../../../utils/'
export default {
  data() {
    return {
      allCourses: [],
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 5
      },
      isModalOpen: null,
      titleModal: null,
      selectedStatus: null,
      selectedTransaction: {},
      options: [
        { value: null, text: 'Status' },
        { value: 'success', text: 'Success' },
        { value: 'pending', text: 'Pending' },
        { value: 'canceled', text: 'Canceled' }
      ]
    }
  },
  watch: {
    async selectedStatus(newValue, oldValue) {
      if (newValue !== oldValue) {
        await this.getDataList(1, newValue)
      }
    }
  },
  created() {
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.table.page)
  },
  methods: {
    onOpenModal(transaction) {
      this.selectedTransaction = transaction
      this.titleModal = `Transaction: ${transaction.code}`
      this.isModalOpen = true
    },
    setPageParam(page) {
      if (page) this.table.page = Number(page)
      else this.table.page = 1
    },
    clearModal() {
      this.selectedTransaction = {}
      this.titleModal = null
      this.isModalOpen = false
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.table.perPage,
        keyword: null,
        status: this.selectedStatus
      }

      const { list, total } = await getTransactionList(params)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.$router.push({
        query: { ...page !== 1 && { page }}
      })
    },
    convertDateTime,
    getClassButton(value) {
      let res = null
      switch (value) {
        case 'success':
          res = 'btn-outline-success'
          break
        case 'pending':
          res = 'btn-outline-danger'
          break
        case 'canceled':
          res = 'btn-outline-info'
          break
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
