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
            Cart
          </b-navbar-brand>
        </b-navbar>
      </div>
      <div v-if="cartCourses.length > 0" class="mt-3 flex">
        <div style="flex: 1 1 auto;">
          <div>
            <div style="max-height: 180px; overflow-y: auto;">
              <b-form-group>
                <b-form-checkbox-group
                  id="checkbox-group"
                  v-model="transactionCourses"
                >
                  <div v-for="(course, index) in cartCourses" :key="index" class="mb-2" style="width: 100%; display: flex; align-items: center;">
                    <b-form-checkbox size="lg" :value="course" />
                    <b-img class="mr-2" width="50" height="50" rounded="circle" :src="course.url_image" />
                    <div style="width: 300px;">
                      <span style="font-size: 16px;font-weight: 500;">{{ course.course_name }}</span>
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 16px;font-weight: 500;color: #FDD96A;">{{ convertPrice(course.price, course.discount) }} VND</span>
                        <span v-if="course.discount" class="ml-1" style="font-size: 12px; text-decoration: line-through; opacity: 0.5;">{{ convertPrice(course.price) }} VND</span>
                      </div>
                    </div>
                    <div>
                      <button type="button" class="close" style="font-size: 2.5rem;" @click="removeCartCourse(course)">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <div class="mt-5">
              <p class="text_title">Choose Payment Method</p>
            </div>
            <div>
              <div>
                <b-form-group>
                  <b-form-radio v-for="(payment, index) in paymentOptions" :key="index" v-model="paymentMode" name="radio-size" size="lg" :value="payment">
                    <p>{{ payment.text }}</p>
                  </b-form-radio>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 30vw;">
          <div style="display: flex;">
            <p class="text_title" style="flex: 1">SUMMARY</p>
            <div>
              <b-button data-toggle="modal" data-target="#exampleModal" variant="outline-success">Apply Coupon Code</b-button>
            </div>
          </div>
          <b-list-group>
            <b-list-group-item class="item_summary">
              <span class="text_span_summary" style="flex: 1">Original Price</span>
              <span class="text_span_summary">{{ totalPriceShow }}</span>
            </b-list-group-item>
            <b-list-group-item class="item_summary">
              <span class="text_span_summary" style="flex: 1">Coupon Discount</span>
              <span class="text_span_summary">{{ couponDiscountShow }}</span>
            </b-list-group-item>
            <b-list-group-item class="item_summary">
              <span class="text_span_summary" style="flex: 1">Payment Mode</span>
              <span class="text_span_summary">{{ paymentMode.text }}</span>
            </b-list-group-item>
            <b-list-group-item class="item_summary">
              <span class="text_span_summary" style="flex: 1">Total Amount</span>
              <span class="text_span_summary">{{ totalAmountShow }}</span>
            </b-list-group-item>
          </b-list-group>
          <hr style="border-color: #38393D;">
          <div v-if="!isPaypal" class="mb-5">
            <b-button block style="color: black;background-color: #feda6a; height: 48px; border-radius: 8px;" :disabled="isProceedStatus" @click="createTransaction('initial')">PROCEED</b-button>
          </div>
          <div v-show="isPaymentPaypal">
            <div ref="paypal" />
          </div>
        </div>
      </div>
      <div v-else class="text-center w100">
        <div class="w100">
          <b-img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" rounded class="img_empty_cart" />
          <br>
          <b-button class="mt-5 mb-5 content_center" style="width: 300px;color: black;background-color: #feda6a; height: 40px; border-radius: 8px;" :to="{name: 'home'}">Continue shopping</b-button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="exampleModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="text-center mt-5">
              <h2>Apply Coupon Code</h2>
            </div>
            <div class="pb-2 mt-5 mb-5" style="border-bottom: 1px solid #393f4d;">
              <b-input-group class="mt-3">
                <template #append>
                  <b-button pill style="black;background-color: #feda6a; color:black;">APPLY</b-button>
                </template>
                <b-form-input style="border: none; background-color: transparent; color:white;" />
              </b-input-group>
            </div>
            <div>
              <p class="text_title">AVAILABLE COUPONS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListCartCourse, deleteCourseCart } from '../../../api/cart'
import { transaction } from '../../../api/transaction'
import { convertPrice } from '../../../utils/index'
export default {
  data() {
    return {
      cart: {},
      cartCourses: [],
      transactionCourses: [],
      voucher: null,
      total: 0,
      couponDiscount: 0,
      paymentMode: {
        value: null,
        text: 'Not Selected'
      },
      paymentOptions: [
        { value: 'paypal', text: 'Paypal Wallet' },
        { value: 'bank', text: 'Bank Transfer' }
      ],
      totalAmount: 0,
      isProceed: false,
      isPaypal: false,
      loaded: false,
      paidFor: false,
      product: {
        price: 7.77,
        description: 'leg lamp from that one movie'
      }
    }
  },
  computed: {
    totalPriceShow: function() {
      // eslint-disable-next-line key-spacing
      return this.total.toLocaleString('it-IT', { style : 'currency', currency : 'VND' })
    },
    couponDiscountShow: function() {
      let res = this.couponDiscount
      if (!this.voucher) res = 'Not Applied'
      return res
    },
    totalAmountShow: function() {
      // eslint-disable-next-line key-spacing
      return this.totalAmount.toLocaleString('it-IT', { style : 'currency', currency : 'VND' })
    },
    isProceedStatus: function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.paymentMode.value && this.transactionCourses.length > 0) this.isProceed = true
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      else this.isProceed = false
      return !this.isProceed
    },
    isPaymentPaypal: function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.paymentMode.value === 'paypal' && this.transactionCourses.length > 0) this.isPaypal = true
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      else this.isPaypal = false
      return this.isPaypal
    }
  },
  watch: {
    transactionCourses: function() {
      this.getOriginalPrice()
      this.getTotalAmount()
    }
  },
  mounted: function() {
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=Aa0ieqkQYd1EKBwVY-8Ly0FmNf9ahbf4LAfaeKd-jfx_mSWHear7Q7qlUXDBCrynXkUM3zLwXM4KQwkB'
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  async created() {
    await this.getCart()
    this.getOriginalPrice()
    this.getTotalAmount()
  },
  methods: {
    setLoaded: function() {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: 'USD',
                    value: (this.totalAmount / 23000).toFixed(1)
                  }
                }
              ]
            })
          },
          onApprove: async(data, actions) => {
            await actions.order.capture()
            this.createTransaction('success')
          },
          onError: err => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    },
    async getCart() {
      this.cart = this.$store.state.User.myCart
      if (this.cart) {
        this.cartCourses = await getListCartCourse(this.cart.id)
      }
    },
    convertPrice,
    getOriginalPrice() {
      this.total = this.transactionCourses.reduce((n, { price, discount }) => n + this.convertPrice(price, discount, false), 0)
    },
    getTotalAmount() {
      this.totalAmount = this.total - this.couponDiscount
    },
    async removeCartCourse(cartCourse) {
      await deleteCourseCart(cartCourse.id)
      this.cartCourses.splice(this.cartCourses.indexOf(cartCourse), 1)
      this.transactionCourses.splice(this.transactionCourses.indexOf(cartCourse), 1)
      this.$store.commit('User/REMOVE_CART')
    },
    async createTransaction(status) {
      const body = {
        'user_id': this.$store.state.User.myInfo.id,
        'first_name': this.$store.state.User.myInfo.first_name,
        'last_name': this.$store.state.User.myInfo.last_name,
        'email': this.$store.state.User.myInfo.email,
        'phone_number': this.$store.state.User.myInfo.phone_number,
        'voucher_id': null,
        'discount': 0,
        'total': this.totalAmount,
        'payment_mode': this.paymentMode.value,
        'status': status,
        'cart_id': this.$store.state.User.myCart.id,
        'transaction_course': this.transactionCourses
      }
      const transactionId = await transaction(body)
      if (transactionId) {
        if (this.paymentMode.value === 'paypal') {
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
        } else {
          this.$router.push({
            name: 'checkoutUser',
            params: { id: transactionId }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img_empty_cart {
  width: 30%;
  height: 30%;
}
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
