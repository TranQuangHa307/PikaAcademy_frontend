<template>
  <div>
    <div class="container">
      <ul class="te_list_item">
        <li v-for="(transaction, index) in table.data" :key="index">
          <div class="content_center w100">
            <div class="w40 txt_center">
              <span>{{ transaction.code }}</span>
            </div>
            <div class="w30 txt_center">
              <span><b>Total: </b>{{ getPrice(transaction.total) }}</span>
              <br/>
              <span><b>Time: </b>{{ convertTSToDateTime(transaction.time) }}</span>
            </div>
            <div class="w30 txt_center">
              <b-button variant="outline-secondary">{{ transaction.status }}</b-button>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="table.total > 5">
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
import { getUserTransactions } from '../../../api/user'
export default {
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allCourses: [],
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 5
      },
      selectedDelete: {}
    }
  },
  created() {
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.table.page)
  },
  methods: {
    setPageParam(page) {
      if (page) this.table.page = Number(page)
      else this.table.page = 1
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.table.perPage,
        keyword: '',
        'status': ['success', 'pending', 'initial'].toString()
      }

      const { list, total } = await getUserTransactions(params, this.elmntId)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.$router.push({
        query: { ...page !== 1 && { page }}
      })
    }
  }
}
</script>

<style lang="scss">
.te_list_item {
  list-style-type: none;
  padding-inline-start: 0;
  font-size: 18px;
  li {
    background-color: white;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    margin: 1.5em 0;
  }
  li:hover {
    background-color: wheat;
  }
}
</style>
