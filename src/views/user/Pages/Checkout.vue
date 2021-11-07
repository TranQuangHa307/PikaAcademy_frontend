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
            Checkout
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div class="mt-3" style="display: flex;">
        <div style="flex: 1 1 auto;">
          <div>
            <div>
              <h1>Complete Payment</h1>
            </div>
            <div class="mb-3 mt-5" style="display: flex; align-items: center; width: 100%;">
              <div class="mr-3">
                <b-icon icon="file-code" style="width: 40px; height: 40px;" />
              </div>
              <div class="pb-3" style="line-height: 10px; border-bottom: 1px solid green; width: 70%;">
                <h5 style="color: #feda6a;">Step 1: Go to your Bank Application</h5>
                <p style="font-size: 14px;">Choose Transfer</p>
                <p style="font-size: 14px;">Bank name: <span style="font-weight: bold;">{{ bankAccount.bankName }}</span></p>
              </div>

            </div>
            <div class="mb-3" style="display: flex; align-items: center;">
              <div class="mr-3">
                <b-icon icon="credit-card2-back" style="width: 40px; height: 40px;" />
              </div>
              <div class="pb-3" style="line-height: 10px; border-bottom: 1px solid green; width: 70%;">
                <h5 style="color: #feda6a;">Step 2: Copy And Paste Bank Account</h5>
                <p style="font-size: 14px;">Bank account number: <span style="color: #feda6a;">{{ bankAccount.bankAccountNumber }}</span> <b-icon class="ml-3" icon="files" variant="success" style="cursor: pointer;" @click="doCopy(bankAccount.bankAccountNumber)" /></p>
                <p style="font-size: 14px;">Bank account holder: <span style="font-weight: bold;">{{ bankAccount.bankAccountHolder }}</span></p>
              </div>

            </div>
            <div class="mb-3" style="display: flex; align-items: center;">
              <div class="mr-3">
                <b-icon icon="front" style="width: 40px; height: 40px;" />
              </div>
              <div class="pb-3" style="line-height: 10px; border-bottom: 1px solid green; width: 70%;">
                <h5 style="color: #feda6a;">Step 3: Copy And Paste Transfer Syntax</h5>
                <p style="font-size: 14px;">Transfer Syntax: <span style="color: #feda6a;">{{ transactionCode }}</span><b-icon class="ml-3" icon="files" variant="success" style="cursor: pointer;" @click="doCopy(transactionCode)" /></p>
                <p style="font-size: 14px; opacity: 0.5;">Note: This step is not mandatory</p>
              </div>

            </div>
            <div class="mb-3" style="display: flex; align-items: center;">
              <div class="mr-3">
                <b-icon icon="check2-circle" style="width: 40px; height: 40px;" />
              </div>
              <div class="pb-3" style="line-height: 10px; border-bottom: 1px solid green; width: 70%;">
                <h5 style="color: #feda6a;">Step 4: Complete The Payment</h5>
                <p style="font-size: 14px;">Click proceed and enjoy your course right away!</p>
              </div>

            </div>
          </div>
        </div>
        <div class="pt-5" style="width: 25vw;">
          <div class="mb-5">
            <h5 style="color: #feda6a;">User Information</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Full Name</span>
                  <span style="font-size: 0.875rem;">{{ transaction.first_name }} {{ transaction.last_name }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Email address</span>
                  <span style="font-size: 0.875rem;">{{ transaction.email }}</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Phone number</span>
                  <span style="font-size: 0.875rem;">{{ transaction.phone_number }}</span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div class="mb-5">
            <h5 style="color: #feda6a;">Courses</h5>
            <div>
              <b-list-group>
                <b-list-group-item v-for="(item, index) in transactionCourses" :key="index" class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">{{ item.course_name }}</span>
                  <div style="line-height: 0px;">
                    <p :class="{'m-0': (item.discount <= 0)}" style="font-size: 0.875rem;">{{ convertPrice(item.original_price, item.discount ) }} đ</p>
                    <span v-if="item.discount > 0" style="font-size: 0.75rem; text-decoration: line-through;">{{ convertPrice(item.original_price ) }} đ</span>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div class="mb-5">
            <h5 style="color: #feda6a;">Summary</h5>
            <div>
              <b-list-group>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Original Price</span>
                  <span style="font-size: 0.875rem;">{{ originalPriceShow }} đ</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Coupon Discount</span>
                  <span style="font-size: 0.875rem;">{{ transaction.discount }} đ</span>
                </b-list-group-item>
                <b-list-group-item class="item_summary">
                  <span style="flex: 1; font-size: 0.875rem;">Total Amount</span>
                  <span style="font-size: 0.875rem;">{{ totalAmountShow }} đ</span>
                </b-list-group-item>
              </b-list-group>
            </div>
            <div class="mt-3">
              <b-button block style="color: black;background-color: #feda6a; border-radius: 8px;" @click="completeThePayment">PROCEED</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTransaction, getTransactionCourseList, updateTransactionStatus } from '../../../api/transaction'
import { convertPrice } from '../../../utils/index'
export default {
  data() {
    return {
      transaction: {},
      bankAccount: {
        bankName: 'VPBank - NH TMCP Việt Nam Thịnh Vượng',
        bankAccountNumber: '236858968',
        bankAccountHolder: 'Nguyen Hoang Anh'
      },
      transactionCourses: [],
      originalPrice: 0
    }
  },
  computed: {
    transactionCode: function() {
      return this.transaction.code
    },
    originalPriceShow: function() {
      return new Intl.NumberFormat('de-DE').format(this.originalPrice)
    },
    couponDiscountShow: function() {
      return this.transaction.discount
    },
    totalAmountShow: function() {
      return new Intl.NumberFormat('de-DE').format(this.transaction.total)
    }
  },
  async created() {
    await this.getTransactionInfo()
    this.getOriginalPrice()
  },
  methods: {
    async getTransactionInfo() {
      this.transaction = await getTransaction(this.$route.params.id)
      this.transactionCourses = await getTransactionCourseList(this.transaction.id)
    },
    doCopy(text) {
      navigator.clipboard.writeText(text)
      this.$swal({
        toast: true,
        icon: 'success',
        title: 'Copied',
        background: '#28A745',
        color: 'white',
        animation: false,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    },
    convertPrice,
    getOriginalPrice() {
      this.originalPrice = this.transactionCourses.reduce((n, { original_price, discount }) => n + this.convertPrice(original_price, discount, false), 0)
    },
    async completeThePayment() {
      try {
        const params = {
          'id': this.transaction.id,
          'user_id': this.$store.state.User.myInfo.id,
          'cart_id': this.$store.state.User.myCart.id,
          'status': 'pending',
          'transaction_course': this.transactionCourses
        }
        await updateTransactionStatus(params)
        this.$swal({
          title: 'Your request has been received by the system. Please check your email for more information.',
          width: 600,
          padding: '3em',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat`
        }).then((result) => {
          this.$router.push({
            path: '/'
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar { width: 0px; }
.modal-content {
  background-color: #1D1E22 !important;
}
.text_span_summary {
  font-size: 20px;
  font-weight: 600;
}
.item_summary {
  background-color: rgb(57, 63, 77);
  display: flex;
  align-items: center;
}
.main {
  margin: auto;
  max-width: 70vw;
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
    min-width: 0;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    letter-spacing: inherit;
    animation-duration: 10ms;
    -webkit-tap-highlight-color: transparent;
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
  font-weight: 600;
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
