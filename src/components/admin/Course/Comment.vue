<template>
  <div class="mt-3 mb-5 us_list_rating container-fluid">
    <form ref="form" style="text-align: right; display: flex;" @submit.stop.prevent="handleSubmit">
      <b-form-textarea
        id="textarea-large"
        v-model="comment.content"
        size="lg"
        placeholder="Bình luận"
      />
      <div style="min-width: 100px;">
        <div>
          <button type="submit" class="btn btn-success">Bình luận</button>
        </div>
      </div>
    </form>
    <ul>
      <li v-for="(item, index) in courseRatings.data" :key="index">
        <comment-section :data="item" />
      </li>
      <div>
        <b-pagination
          v-if="table.total>5"
          v-model="table.page"
          :total-rows="table.total"
          :per-page="table.perPage"
          class="float-right mr-4 mb-4"
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
    </ul>
  </div>
</template>

<script>
import { getCommentByCourse } from '../../../api/public'
import { addComment } from '../../../api/comment.js'
import CommentSection from './CommentSection.vue'
export default {
  components: {
    CommentSection
  },
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
        perPage: 5
      },
      comment: {
        conent: null,
        courseId: this.$route.params.id,
        userId: null,
        adminId: this.$store.state.Admin.myInfo ? this.$store.state.Admin.myInfo.id : 0,
        teacherId: null,
        role: 'admin'
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
    async handleSubmit() {
      const body = {
        'content': this.comment.content,
        'course_id': parseInt(this.comment.courseId),
        'user_id': this.comment.userId,
        'admin_id': this.comment.adminId,
        'teacher_id': this.comment.teacherId,
        'role': this.comment.role
      }
      await addComment(this.$route.params.id, body)
      await this.getDataList(this.table.page)
      this.comment.content = null
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
      const { list, total } = await getCommentByCourse(params, this.elmntId)
      this.table.data = list
      this.table.total = total
    },
    onPageChange(page) {
      this.getDataList(page)
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
    p {
      font-size: 18px;
      margin: 0;
      padding: 0;
      background-color: transparent !important;
    }
  }
}
.checked {
  color: orange;
}
.pagination li {
  margin: 0;
  padding: 0 !important;
}
img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
}
.op-reply {
  color: #79797C !important;
  font-size: 0.875rem;
  width: 85px;
  padding: 0.1em;
  text-align: center;
      font-weight: bold;
  cursor: pointer;
  font-size: 15px !important;
}
.ip-reply {
  border: 2px solid;
  background-color: transparent !important;
}
</style>
