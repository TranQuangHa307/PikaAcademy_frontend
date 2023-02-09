<template>
  <div class="container-fluid">
    <div class="container">
      <ul class="te_info_list_item">
        <li v-for="(item, index) in table.data" :key="index" class="d_flex">
          <div class="mr-2">
            <b-img :src="item.user_url_avatar" />
          </div>
          <div>
            <h5>{{ item.user_first_name }} {{ item.user_last_name }}</h5>
            <span><b>Ngày thích:</b> {{ convertTSToDateTime(item.time) }}</span>
          </div>
        </li>
      </ul>
      <div v-if="table.total > 10">
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
import { getUsersLikeCourse } from '../../../api/course'
export default {
  props: {
    elmntId: {
      type: Number,
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
    console.log(this.table)
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

      const { list, total } = await getUsersLikeCourse(params, this.elmntId)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.te_info_list_item {
  margin: 0 1em;
  list-style-type: none;
  padding-inline-start: 0;
  font-size: 18px;
  li {
    background-color: wheat;
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
</style>

