<template>
  <div>
    <div class="d_flex" style="align-items: flex-start;">
      <div class="mr-2" style="margin-top: 0.5em;">
        <b-img :src="getUrlAvatar(this.data)" />
      </div>
      <div style="flex: 1;">
        <span style="font-weight: bold;">{{ getUserName(this.data) }} - {{ dateConvert(this.data.created_at) }}<span v-if="data.role!='user'" style="text-transform: capitalize; font-weight: bold;"> - {{ data.role }} </span></span>
        <p>{{ this.data.content }}</p>
        <p class="op-reply" @click="selectedComment()">Phản hồi</p>
        <div v-if="this.isReply">
          <input v-model="replyComment.content" type="text" placeholder="Phản hồi" class="form-control ip-reply">
          <div class="mt-1" style="text-align: right;">
            <b-button class="mr-1 btn btn-danger" style="padding: 0.3em; font-size: 15px;" @click="removeReplyComment()">Huỷ</b-button>
            <b-button style="padding: 0.3em; font-size: 15px;" @click="handleSubmit()">Phản hồi</b-button>
          </div>
        </div>
        <ul v-if="this.isShowReply">
          <span v-if="this.data.count_reply_comment > 0" style=" cursor: pointer; color: cornflowerblue; font-weight: bold;" @click="hideReplyComment()"> ▲ Ẩn phản hồi</span>
          <li v-for="(item, index) in this.table.data" :key="index">
            <div style="display: flex;">
              <div class="mr-2" style="margin-top: 0.5em;">
                <b-img :src="getUrlAvatar(item)" />
              </div>
              <div>
                <span>{{ getUserName(item) }} - {{ dateConvert(item.created_at) }}<span v-if="item.role!='user'" style="text-transform: capitalize; font-weight: bold;"> - {{ item.role }} </span></span>
                <p> {{ item.content }} </p>
              </div>
            </div>
          </li>
        </ul>
        <span v-if="this.data.count_reply_comment > 0 && this.table.data.length == 0" style="cursor: pointer; color: cornflowerblue; font-weight: bold;" @click="showReplyComment()"> ▼ Xem {{ this.data.count_reply_comment - (this.table.data.length) }} phản hồi</span>
        <span v-if="this.data.count_reply_comment > 0 && this.table.data.length > 0 && this.table.data.length < this.data.count_reply_comment" style="cursor: pointer; color: cornflowerblue; font-weight: bold;" @click="pushShowReplyComment()"> ▼ Xem thêm {{ this.data.count_reply_comment - (this.table.data.length) }} phản hồi</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getReplyComment } from '../../../api/public'
import { addReplyComment } from '../../../api/comment.js'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
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
      isReply: false,
      isShowReply: false,
      replyComment: {
        commentId: null,
        content: null,
        userId: null,
        adminId: this.$store.state.Admin.myInfo ? this.$store.state.Admin.myInfo.id : 0,
        teacherId: null,
        role: 'admin'
      }
    }
  },
  watch: {
    data(newValue, oldValue) {
      this.table.data = []
      this.table.toatal = 0
      this.table.page = 1
      this.table.perPage = 5
      this.isShowReply = false
      this.isReply = false
      this.data = newValue
    }
  },
  methods: {
    async handleSubmit() {
      const body = {
        'content': this.replyComment.content,
        'comment_id': this.data.id,
        'user_id': this.replyComment.userId,
        'admin_id': this.replyComment.adminId,
        'teacher_id': this.replyComment.teacherId,
        'role': this.replyComment.role
      }
      await addReplyComment(this.data.id, body)
      this.replyComment.content = null
      this.showReplyComment()
    },
    selectedComment() {
      this.isReply = true
    },
    removeReplyComment() {
      this.replyComment.content = null
      this.isReply = false
    },
    dateConvert(time) {
      const date = new Date(time * 1000)
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    showReplyComment() {
      this.onPageChange(1)
      this.isShowReply = true
    },
    pushShowReplyComment() {
      this.table.perPage += 5
      this.showReplyComment()
    },
    hideReplyComment() {
      this.table.data = []
      this.table.total = 0
      this.table.page = 1
      this.isShowReply = false
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
      const { list, total } = await getReplyComment(params, this.data.id)
      this.table.data = list
      this.table.total = total
      this.data.count_reply_comment = total
      console.log(this.table.data)
    },
    onPageChange(page) {
      this.getDataList(page)
    },
    getUserName(comment) {
      let userName = ''
      if (comment.role === 'user') {
        userName = `${comment.user_first_name} ${comment.user_last_name}`
      }
      if (comment.role === 'teacher') {
        userName = comment.teacher_full_name
      }
      if (comment.role === 'admin') {
        userName = comment.admin_user_name
      }
      return userName
    },
    getUrlAvatar(comment) {
      let urlAvatar = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
      if (comment.role === 'user') {
        urlAvatar = comment.user_url_avatar
      }
      if (comment.role === 'teacher') {
        urlAvatar = comment.teacher_url_avatar
      }
      return urlAvatar
    }
  }
}
</script>

