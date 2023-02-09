<template>
  <div>
    <div class="table-users">
      <div class="header">
        <span>Môn học</span>
        <b-button class="float-right" variant="primary" @click="onOpenModal(true)">+</b-button>
      </div>

      <table cellspacing="0" style="border-bottom: 1px solid #FEC415;">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Khối lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in table.data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td> <b-img v-if="item.url_image" :src="item.url_image" /></td>
            <td>{{ item.interests_name }}</td>
            <td style="width: 120px;">
              <div>
                <button
                  class="btn btn-info mr-1 size_75"
                  @click="onOpenModal(false, item)"
                ><b-icon icon="pencil-fill" variant="white" /></button>
                <button class="btn btn-danger size_75" @click.prevent="onDeleteData(item)"><b-icon icon="trash-fill" variant="white" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="table.total>0">
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
        id="modal-create-interest"
        ref="modal"
        v-model="isModalFormOpen"
        :title="titleForm"
        hide-footer
        hide-header-close
        @show="resetModal"
        @hidden="resetModal"
      >
        <modal-form-category
          :is-add="modalOpts.isAdd"
          :data="modalOpts.data"
          @onadd="onAddData($event)"
          @onupdate="onEditData($event)"
          @cancelForm="onCancelForm"
        />
      </b-modal>
      <b-modal
        v-if="isModelDeleteOpen"
        id="modal-delete-category"
        v-model="isModelDeleteOpen"
        title="Vui lòng xác nhận"
        size="sm"
        button-size="sm"
        ok-variant="danger"
        ok-title="Đồng ý"
        cancel-title="Huỷ bỏ"
        footer-class="p2"
        hide-header-close
        @cancel="onCancelDelete()"
        @ok="onConfirmDeleteData()"
      >Bạn có chắc chắn muốn xoá bỏ môn học không?</b-modal>
    </div>
  </div>
</template>

<script>
import { getCategoryList, addCategory, updateCategory, deleteCategory } from '../../../../api/category'
import ModalFormCategory from '../../../../components/admin/modal/ModalFormCategory.vue'
export default {
  components: {
    modalFormCategory: ModalFormCategory
  },
  data() {
    return {
      checked: true,
      keyword: '',
      allInterests: [],
      table: {
        data: [],
        total: 0,
        page: 1,
        perPage: 5
      },
      category: {
        name: '',
        url_image: '',
        created_by: '',
        updated_by: ''
      },
      selectedDelete: null,
      modalOpts: {},
      isModalFormOpen: null,
      isModelDeleteOpen: null,
      titleForm: ''
    }
  },
  watch: {
    keyword: async function() {
      this.getDataList(1)
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
    onCancelForm() {
      this.isModalFormOpen = false
    },
    onOpenModal(isAdd, data) {
      this.modalOpts.isAdd = isAdd
      this.titleForm = isAdd ? 'Tạo môn học' : 'Cập nhật môn học'
      this.modalOpts.data = {
        'id': isAdd ? 0 : data.id,
        'name': isAdd ? null : data.name,
        'description': isAdd ? null : data.description,
        'url_image': isAdd ? null : data.url_image,
        'interests_id': isAdd ? null : data.interests_id,
        'created_by': this.$store.state.Admin.myInfo.user_name,
        'updated_by': this.$store.state.Admin.myInfo.user_name
      }
      this.isModalFormOpen = true
    },
    onAddData: async function(data) {
      try {
        const body = {
          'name': data.name.trim(),
          'url_image': data.url_image,
          'interests_id': data.interests_id,
          'created_by': this.$store.state.Admin.myInfo.user_name,
          'updated_by': this.$store.state.Admin.myInfo.user_name
        }
        await addCategory(body)
        this.showRes('success', 'Tạo môn học thành công.')
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.isModalFormOpen = false
      this.onPageChange(1)
      this.$store.commit('SET_DONE_LOADING')
    },
    onEditData: async function(data) {
      try {
        await updateCategory(data)
        this.showRes('success', 'Cập nhật môn học thành công.')
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.isModalFormOpen = false
      this.getDataList(this.table.page)
      this.$store.commit('SET_DONE_LOADING')
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
      this.$store.commit('SET_LOADING')
      try {
        await deleteCategory(this.selectedDelete.id)
        this.showRes('success', 'Xoá môn học thành công.')
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      } finally {
        this.isModelDeleteOpen = false
        this.getDataList(this.table.page)
      }
      this.$store.commit('SET_DONE_LOADING')
    },
    getInterset(data) {
      this.interest.id = data.id
      this.interest.name = data.name
      this.interest.description = data.description
      this.interest.url_image = data.url_image
    },
    clearImage() {
      this.image = null
    },
    resetModal() {
      this.state = null
      this.clearImage()
    },
    setPageParam(page) {
      if (page) this.table.page = Number(page)
      else this.table.page = 1
    },
    async getDataList(page = 1) {
      const params = {
        page: page,
        limit: this.table.perPage,
        keyword: this.keyword
      }

      const { list, total } = await getCategoryList(params)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
      this.table.page = page
      this.$router.push({
        query: { ...page !== 1 && { page }}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
