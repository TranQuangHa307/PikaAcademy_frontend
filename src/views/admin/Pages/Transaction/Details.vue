<template>
  <div class="container-fluid mt-3 p-3">
    <div class="p-3 flex" style="background-color: white; box-shadow: 0 1px 4px rgb(0 21 41 / 8%);">
      <div class="flex1">
        <div class="w90 m_auto">
          <div class="mb-3">
            <h5 class="text-info">Transaction Information</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Code: </b>
                  <span style="">{{ transaction.code }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Payment mode: </b>
                  <span style="text-transform: uppercase;">{{ transaction.payment_mode }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Time: </b>
                  <span style="">{{ convertDateTimeVN(transaction.time) }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Voucher: </b>
                  <span style="">{{ transaction.voucher_id ? transaction.voucher_id : 'Not Applied' }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div>
            <h5 class="text-info">Summary</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Original Price: </b>
                  <span style="">{{ vndFormat(originalPrice) }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Coupon Discount: </b>
                  <span style="">{{ vndFormat(transaction.discount) }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Total Amount: </b>
                  <span style="">{{ vndFormat(transaction.total) }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div v-if="transaction.status === 'pending'" class="mt-3 flex w100">
            <div class="flex1 mr-3">
              <b-button variant="success" block @click="onConfirmTransaction('success')">Successful transaction</b-button>
            </div>
            <div class="flex1 ml3">
              <b-button variant="danger" block @click="onConfirmTransaction('canceled')">Cancel transaction</b-button>
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
                  <b style="flex: 1; ">Full Name: </b>
                  <span style="">{{ transaction.first_name }} {{ transaction.last_name }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Email address: </b>
                  <span style="">{{ transaction.email }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <b style="flex: 1; ">Phone number: </b>
                  <span style="">{{ transaction.phone_number }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div>
            <h5 class="text-info">Courses</h5>
            <div style="height: 200px; overflow: auto;">
              <b-list-group>
                <b-list-group-item v-for="(item, index) in transactionCourses" :key="index" class="item_summary">
                  <p class="mb-0" style="flex: 1; ">{{ item.course_name }}</p>
                  <div>
                    <span class="mr-2" :class="{'m-0': (item.discount <= 0)}" style="">{{ vndFormat(convertPrice(item.original_price, item.discount, false )) }}</span>
                    <span v-if="item.discount > 0" style="font-size: 0.75rem; text-decoration: line-through;">{{ vndFormat(convertPrice(item.original_price, 0, false )) }}</span>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-modal
        id="modal-delete-interests"
        v-model="isModelConfirmOpen"
        title="Please Confirm"
        size="sm"
        button-size="sm"
        ok-variant="danger"
        ok-title="YES"
        cancel-title="NO"
        footer-class="p2"
        hide-header-close
        @cancel="onCancelConfirmTransaction()"
        @ok="onUpdateStatusTransaction()"
      >{{ messageConfirm }}</b-modal>
    </div>
  </div>
</template>

<script>
import { convertPrice, vndFormat, convertDateTimeVN } from '../../../../utils/index'
import { getTransaction, getTransactionCourseList, updateTransactionStatus } from '../../../../api/transaction'
export default {
  data() {
    return {
      transaction: {},
      transactionCourses: [],
      isModelConfirmOpen: null,
      statusTransaction: null
    }
  },
  computed: {
    originalPrice() {
      return this.transactionCourses.reduce((n, { original_price, discount }) => n + this.convertPrice(original_price, discount, false), 0)
    },
    messageConfirm() {
      return this.statusTransaction === 'success' ? 'Are you sure you want to confirm the transaction is successful?' : 'Are you sure you want to confirm the transaction abort?'
    }
  },
  watch: {
    async $route(to, from) {
      if (this.$route.params.id) {
        await this.getTransactionInfo()
      }
    }
  },
  async created() {
    await this.getTransactionInfo()
  },
  methods: {
    convertPrice,
    vndFormat,
    onConfirmTransaction(status) {
      this.statusTransaction = status
      this.isModelConfirmOpen = true
    },
    onCancelConfirmTransaction() {
      this.isModelConfirmOpen = false
      this.statusTransaction = null
    },
    async getTransactionInfo() {
      this.transaction = await getTransaction(this.$route.params.id)
      this.transactionCourses = await getTransactionCourseList(this.transaction.id)
    },
    async onUpdateStatusTransaction() {
      try {
        const params = {
          'id': this.transaction.id,
          'user_id': this.transaction.user_id,
          'cart_id': 0,
          'status': this.statusTransaction,
          'transaction_course': this.transactionCourses
        }
        await updateTransactionStatus(params)
        const res = this.statusTransaction === 'success' ? 'Successful transaction' : 'Successfully canceled transaction'
        this.$swal({
          icon: 'success',
          title: res
        }).then((result) => {
          this.$router.push({
            path: '/admin/transaction'
          })
        })
        this.updateNoti()
      } catch (error) {
        console.log(error)
      }
    },
    convertDateTimeVN
  }
}
</script>

<style lang="scss" scoped>

</style>
