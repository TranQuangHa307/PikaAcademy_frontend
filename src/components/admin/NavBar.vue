<template>
  <div class="header_nb">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="white">
        <b-navbar-brand style="color: #97a8be;" href="#">{{ titlePage }}</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="mr-3">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-form class="mr-3">
              <div
                v-b-popover.hover="{ variant: 'warning', content: `There are ${numberPT} pending transactions`, disabled: false }"
                style="font-size: 2rem; display: flex; cursor: pointer;"
                title="Notification"
                @click="redirectToPendingTransaction()"
              >
                <b-icon icon="bell-fill" variant="info" />
                <span v-if="numberPT" class="text_nofification">{{ numberPT }}</span>
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
  </div>
</template>

<script>
import { getTransactionListByStatus } from '../../api/transaction'
export default {
  data() {
    return {
      numberPT: 1
    }
  },
  computed: {
    titlePage() {
      return this.$store.state.Admin.titlePage
    }
  },
  async created() {
    await this.getNumberPT()
  },
  methods: {
    async getNumberPT() {
      const list = await getTransactionListByStatus('pending')
      this.numberPT = list.length
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
</style>
