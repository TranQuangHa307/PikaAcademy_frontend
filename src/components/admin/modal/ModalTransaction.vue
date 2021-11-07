<template>
  <div>
    <div class="container flex">
      <div class="flex1">
        <div class="w90 m_auto">
          <div class="mb-3">
            <h5 class="text-info">Transaction Information</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Code: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.code }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Payment mode: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.payment_mode }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Time: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.time }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Voucher: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.voucher_id }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div>
            <h5 class="text-info">Summary</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Original Price: </b>
                  <span style="font-size: 0.875rem;">{{ vndFormat(originalPrice) }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Coupon Discount: </b>
                  <span style="font-size: 0.875rem;">{{ vndFormat(transaction.discount) }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Total Amount: </b>
                  <span style="font-size: 0.875rem;">{{ vndFormat(transaction.total) }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
      </div>
      <div class="flex1">
        <div class="w90 m_auto">
          <div class="mb-3">
            <h5 class="text-info">User Information</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Full Name: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.first_name }} {{ transaction.last_name }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Email address: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.email }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; font-size: 0.875rem;">Phone number: </b>
                  <span style="font-size: 0.875rem;">{{ transaction.phone_number }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div>
            <h5 class="text-info">Courses</h5>
            <div style="height: 200px; overflow: auto;">
              <b-list-group>
                <b-list-group-item v-for="(item, index) in transactionCourses" :key="index" class="item_summary">
                  <p class="mb-0" style="flex: 1; font-size: 0.875rem;">{{ item.course_name }}</p>
                  <div>
                    <span class="mr-2" :class="{'m-0': (item.discount <= 0)}" style="font-size: 0.875rem;">{{ vndFormat(convertPrice(item.original_price, item.discount, false )) }}</span>
                    <span v-if="item.discount > 0" style="font-size: 0.75rem; text-decoration: line-through;">{{ vndFormat(convertPrice(item.original_price, 0, false )) }}</span>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr style="margin-left: -15px; margin-right: -15px;">
    <div class="flex container">
      <div v-if="transaction.status === 'pending'" class="flex1">
        <b-button variant="success" block @click="onConfirmTransaction('success')">Successful transaction</b-button>
      </div>
      <div v-if="transaction.status === 'pending'" class="flex1 ml-3 ">
        <b-button variant="danger" block @click="onConfirmTransaction('canceled')">Cancel transaction</b-button>
      </div>
      <div class="flex1 ml-3">
        <b-button variant="info" block @click="closeModal">Close transaction</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { convertPrice, vndFormat } from '../../../utils/index'
import { getTransaction, getTransactionCourseList, updateTransactionStatus } from '../../../api/transaction'
export default {
  props: {
    data: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      transaction: {},
      transactionCourses: []
    }
  },
  computed: {
    originalPrice() {
      return this.transactionCourses.reduce((n, { original_price, discount }) => n + this.convertPrice(original_price, discount, false), 0)
    }
  },
  async created() {
    await this.getTransactionInfo()
  },
  methods: {
    convertPrice,
    vndFormat,
    async getTransactionInfo() {
      this.transaction = await getTransaction(this.$route.params.id)
      this.transactionCourses = await getTransactionCourseList(this.transaction.id)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    async onConfirmTransaction(status) {
      try {
        const params = {
          'id': this.transaction.id,
          'user_id': this.transaction.user_id,
          'cart_id': 0,
          'status': status,
          'transaction_course': this.transactionCourses
        }
        await updateTransactionStatus(params)
        this.closeModal()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
