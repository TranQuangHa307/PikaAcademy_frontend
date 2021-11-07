<template>
  <div class="table-users">
    <table cellspacing="0" style="border-bottom: 1px solid #FEC415;">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Intro video</th>
          <th>Price</th>
          <th>Teacher</th>
          <th>Purchase time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in table.data" :key="index">
          <td>{{ course.id }}</td>
          <td>{{ course.name }}</td>
          <td> <b-img v-if="course.url_image" :src="course.url_image" /></td>
          <td> <b-embed
            v-if="course.url_intro_video"
            type="iframe"
            aspect="16by9"
            :src="course.url_intro_video"
            allowfullscreen
          /></td>
          <td>{{ course.transaction_original_price }}</td>
          <td>{{ course.teacher }}</td>
          <td>{{ course.transaction_time }}</td>
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
</template>

<script>
import { getListPurchasedCourse } from '../../../../api/user'
export default {
  data() {
    return {
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 5
      }
    }
  },
  created() {
    this.setPageParam(this.route.query.pageTag)
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

      const { list, total } = await getListPurchasedCourse(this.$route.params.id, params)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.$roter.push({
        query: { ...page !== 1 && { page }}
      })
    }
  }
}
</script>
