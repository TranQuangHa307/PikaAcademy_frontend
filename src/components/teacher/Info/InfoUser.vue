<template>
  <div style="background-color: wheat; height: 100%;">
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Student" active></b-tab>
        <b-tab title="Rating"></b-tab>
      </b-tabs>
    </div>
    <div>
      <ul class="te_info_list_item">
        <li v-for="(item, index) in table.data" :key="index">
          <div class="mr-2">
            <b-img :src="item.url_avatar"></b-img>
          </div>
          <div>
            <h5>{{ item.first_name }} {{ item.last_name }}</h5>
            <span><b>Buyed at:</b> {{ convertTSToDateTime(item.buyed_at) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserListBuyCourse } from '../../../api/course.js'
export default {
  props: {
    elmntId: {
      default: null
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
  watch: {
    elmntId(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setPageParam(this.$route.query.pageTag)
        this.getDataList(this.table.page)
      }
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

      const { list, total } = await getUserListBuyCourse(params, this.elmntId)
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
.te_info_heading {
  margin: 0 1em;
}
.te_info_list_item {
  margin: 0 1em;
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
    background-color: cyan;
  }
}
.nav-tabs {
  font-size: 25px;
}
</style>
