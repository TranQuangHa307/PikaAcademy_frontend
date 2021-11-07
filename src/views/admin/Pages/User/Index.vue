<template>
  <div class="table-users">
    <div class="header">
      <span>User</span>
    </div>

    <table cellspacing="0" style="border-bottom: 1px solid #FEC415;">
      <thead>
        <tr>
          <th>Id</th>
          <th>Full Name</th>
          <th>Avatar</th>
          <th>Email</th>
          <th>Date of birth</th>
          <th>Gender</th>
          <th>Phone number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in table.data" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>
            <b-img
              v-if="user.url_avatar"
              :src="user.url_avatar"
            />
          </td>
          <td>{{ user.email }}</td>
          <td>{{ getDateToLocaleString(user.date_of_birth) }}</td>
          <td class="text_upcase">{{ user.gender }}</td>
          <td>{{ user.phone_number }}</td>
          <td style="width: 120px;">
            <div>
              <router-link
                tag="button"
                :to="{ name: 'userInformation', params: { id: user.id }}"
                class="btn btn-info mr-1 size_75"
              ><b-icon icon="pencil-fill" variant="white" /></router-link>
              <button
                class="btn btn-danger siza_75"
                @click.prevent="onDeleteData(user)"
              ><b-icon icon="trash-fill" variant="white" /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <b-pagination
        v-model="table.page"
        :total-rows="table.total"
        :per-page="table.perPage"
        class="mt-4 float-right mr-4"
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
    <div>
      <b-modal
        v-if="isModelDeleteOpen"
        id="modal-delete-interests"
        v-model="isModelDeleteOpen"
        title="Please Confirm"
        size="sm"
        button-size="sm"
        ok-variant="danger"
        ok-title="YES"
        cancel-title="NO"
        footer-class="p2"
        hide-header-close
        @cancel="onCancelDelete()"
        @ok="onConfirmDeleteData()"
      >Are you sure you want to remove teacher {{ selectedDelete.id }}?</b-modal>
    </div>
  </div>
</template>

<script>
import { getUserList } from '../../../../api/user'
import { getDateToLocaleString } from '../../../../utils/index'
export default {
  data() {
    return {
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 5
      },
      selectedDelete: null,
      isModelDeleteOpen: null
    }
  },
  created() {
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.table.page)
  },
  methods: {
    setPageParam(page) {
      this.table.page = (!page) ? 1 : Number(page)
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.table.perPage,
        keywork: null
      }
      const { list, total } = await getUserList(params)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.$router.push({
        query: { ...page !== 1 && { page }}
      })
    },
    getDateToLocaleString
  }
}
</script>

<style scoped>

</style>
