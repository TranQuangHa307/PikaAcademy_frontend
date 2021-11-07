<template>
  <div>
    <div class="table-users">
      <div class="header">
        <span>Course</span>
        <router-link tag="button" to="/admin/course/add" class="float-right btn btn-primary">+</router-link>
        <!-- <b-button v-b-modal.modal-create-interest class="float-right" variant="primary" @click="onOpenModal(true)">+</b-button> -->
      </div>

      <table cellspacing="0" style="border-bottom: 1px solid #FEC415;">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Intro video</th>
            <th>Price</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Purchases</th>
            <th>Action</th>
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
            <td v-if="course.price_type==='free'">FREE</td>
            <td v-else>{{ course.price }}</td>
            <td>{{ course.views }}</td>
            <td>{{ course.likes }}</td>
            <td>{{ course.purchases }}</td>
            <td style="width: 120px;">
              <div>
                <router-link tag="button" :to="{ name: 'courseDetail', params: { id: course.id }}" class="btn btn-info mr-1 size_75"><b-icon icon="pencil-fill" variant="white" /></router-link>
                <button class="btn btn-danger size_75" @click.prevent="onDeleteData(course)"><b-icon icon="trash-fill" variant="white" /></button>
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
      >Are you sure you want to remove course {{ selectedDelete.id }}?</b-modal>
    </div>
  </div>
</template>

<script>
import { getCourseList, deleteCourse } from '../../../../api/course'
export default {
  data() {
    return {
      allCourses: [],
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
    showRes(variant = null, message = '') {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
    onDeleteData(data) {
      this.selectedDelete = data
      this.isModelDeleteOpen = true
    },
    onCancelDelete() {
      this.isModelDeleteOpen = false
      this.selectedDelete = null
    },
    onConfirmDeleteData: async function() {
      this.$store.commit('Admin/SET_LOADING')
      try {
        await deleteCourse(this.selectedDelete.id)
        this.showRes('success', 'Course successfully deleted.')
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      } finally {
        this.isModelDeleteOpen = false
        this.getDataList(this.table.page)
      }
      this.$store.commit('Admin/SET_DONE_LOADING')
    },
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

      const { list, total } = await getCourseList(params)
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

<style lang="scss" scoped>

</style>
