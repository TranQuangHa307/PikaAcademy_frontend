<template>
  <div>
    <div>
      <ul class="te_list_item">
        <li v-for="(course, index) in table.data" :key="index">
          <div class="mr-2">
            <b-img :src="course.url_image" />
          </div>
          <div class="flex1" @click="changeShowInfo(course.id)">
            <div>
              <h4>{{ course.name }}</h4>
            </div>
            <div>
              <span class="mr-2"><b>Price:</b> {{ getPrice(course.price) }}</span>
              <span class="mr-2"><b>Views:</b> {{ course.views }}</span>
              <span class="mr-2"><b>Likes:</b> {{ course.likes }}</span>
              <span class="mr-2"><b>Purchases:</b> {{ course.purchases }}</span>
              <br/>
              <span class="mr-2"><b>Created at:</b> {{ convertTSToDateTime(course.created_at) }}</span>
              <span class="mr-2"><b>Updated at:</b> {{ convertTSToDateTime(course.updated_at) }}</span>
            </div>
          </div>
          <div class="w30 txt_right">
            <button v-if="!course.is_active" class="btn btn-success mr-2" @click="onActive(course.id)">Active</button>
            <button class="btn btn-primary mr-2" @click="toCourseDetail(course.id)"><b-icon icon="pencil-fill" variant="white" /></button>
            <button v-if="!course.is_active" class="btn btn-danger" @click="onConfirmDelete(course)"><b-icon icon="trash-fill" variant="white" /></button>
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
    <div>
      <b-modal
        v-if="isModelActiveOpen"
        id="modal-active"
        v-model="isModelActiveOpen"
        title="Please Confirm"
        size="sm"
        button-size="sm"
        ok-variant="danger"
        ok-title="YES"
        cancel-title="NO"
        footer-class="p2"
        hide-header-close
        @cancel="onCancelActive()"
        @ok="onConfirmActive()"
      >Are you sure you want to active course {{ selectedActive }}?
        <br/>
       After active you will not be able to delete the course
      </b-modal>
    </div>
  </div>
</template>

<script>
import { deleteCourse, activeCourse } from '../../../../api/course'
import { getCourseListOfTeacher } from '../../../../api/public'
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
      selectedDelete: {},
      selectedActive: null,
      isModelActiveOpen: null
    }
  },
  created() {
    this.setPageParam(this.$route.query.pageTag)
    this.getDataList(this.table.page)
  },
  methods: {
    onActive(data) {
      this.isModelActiveOpen = true
      this.selectedActive = data
    },
    onCancelActive() {
      this.isModelActiveOpen = false
      this.selectedActive = null
    },
    onConfirmActive: async function() {
      this.$store.commit('SET_LOADING')
      try {
        await activeCourse(this.selectedActive)
        this.showResAction('success', 'course successfully active.')
        this.updateNoti()
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      } finally {
        this.isModelActiveOpen = false
        this.getDataList(this.table.page)
      }
      this.$store.commit('SET_DONE_LOADING')
    },
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

      const { list, total } = await getCourseListOfTeacher(params)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.$router.push({
        query: { ...page !== 1 && { page }}
      })
    },
    toCourseDetail(courseId) {
      this.showInfo('Chapter', courseId)
      this.$router.push({
        name: 'courseDetailTeacherManeger',
        params: { id: courseId }
      })
    },
    onConfirmDelete(data) {
      this.selectedDelete.data = data
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.onDeleteData()
        }
      })
    },
    async onDeleteData() {
      this.$store.commit('SET_LOADING')
      try {
        await deleteCourse(this.selectedDelete.data.id)
      } catch (error) {
        this.res('danger', error.response?.data?.message || error.message)
      } finally {
        this.getDataList(this.table.page)
      }
      this.$store.commit('SET_DONE_LOADING')
    },
    changeShowInfo(id) {
      this.showInfo('InfoDefault', null)
      this.showInfo('InfoCourse', id)
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
