<template>
  <div class="container">
    <div class="mt-3 mb-3 us_list_rating">
      <ul>
        <li v-for="(item, index) in courseRatings.data" :key="index">
          <div class="d_flex" style="align-items: center;">
            <div class="mr-2">
              <b-img :src="item.user_url_avatar" />
            </div>
            <div>
              <span>{{ item.user_first_name }} {{ item.user_last_name }}</span>
              <br>
              <span class="fa fa-star" :class="{ checked: (item.rating > 0)}" />
              <span class="fa fa-star" :class="{ checked: (item.rating > 1)}" />
              <span class="fa fa-star" :class="{ checked: (item.rating > 2)}" />
              <span class="fa fa-star" :class="{ checked: (item.rating > 3)}" />
              <span class="fa fa-star" :class="{ checked: (item.rating > 4)}" />
            </div>
          </div>
          <div>
            <p>{{ item.comment }}</p>
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
import { getRatingByCourse } from '../../../api/rating'
export default {
  props: {
    elmntId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 10
      }
    }
  },
  computed: {
    courseRatings() {
      return this.table
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
        keyword: ''
      }

      const { list, total } = await getRatingByCourse(params, this.elmntId)
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
.us_list_rating {
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    margin: 1em;
    background-color: wheat;
    padding: 0.5em;
    border-radius: 0.5em;

    p {
      margin-top: 0.5em;
      border-radius: 0.5em;
      padding: 1em;
      background-color: #F5F5F5;
      font-size: 18px;
      color: black;
    }
  }
}
.checked {
  color: orange;
}
</style>
