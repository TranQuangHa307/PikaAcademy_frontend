<template>
  <div>
    <div>
      <ul class="te_list_item">
        <li v-for="(user, index) in table.data" :key="index">
          <div class="mr-2">
            <b-img :src="user.url_avatar" />
          </div>
          <div class="flex1">
            <div>
              <h4>{{ user.first_name }} {{ user.last_name }}</h4>
            </div>
            <div>
              <span>
                <b>Followed: </b>
                {{ convertTSToDateTime(user.followed_time) }}
              </span>
            </div>
            <div>
              <span>
                <b>Eamil: </b>
                {{ user.email }}
              </span>
              <span>
                <b>Phone Number: </b>
                {{ user.phone_number }}
              </span>
              <span>
                <b>Birth Day: </b>
                {{ convertDateOfBirth(user.date_of_birth) }}
              </span>
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
import { getListbyTeacher } from '../../../../api/followed'
export default {
  data() {
    return {
      allCourses: [],
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 10
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
        teacher_id: this.$store.state.Teacher.myInfo.id,
        limit: this.table.perPage,
        keyword: ''
      }

      const { list, total } = await getListbyTeacher(params, this.$store.state.Teacher.myInfo.id)
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
