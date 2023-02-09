<template>
  <div class="container-fluid" style="margin: 1em auto;">
    <div class="w100">
      <div class="row">
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">
              <b-icon icon="person-lines-fill" variant="info" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Giáo viên</p>
              <span class="fw700 value_card_item">{{ totalTeachers }}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">
              <b-icon icon="people-fill" variant="info" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Người dùng</p>
              <span class="fw700 value_card_item">{{ totalUsers }}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card_db">
            <div class="w50 content_center" style="font-size: 4rem;">

              <b-icon icon="collection-play-fill" variant="info" />
            </div>
            <div class="w50 text-center">
              <p class="m-0 fw700 name_card_item">Khoá học</p>
              <span class="fw700 value_card_item">{{ totalCourses }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from '../../../../api/user'
import { getCourseList } from '../../../../api/course'
import { getTeacherList } from '../../../../api/teacher'
export default {
  data() {
    return {
      totalUsers: 0,
      totalCourses: 0,
      totalTeachers: 0
    }
  },
  async mounted() {
  },
  async created() {
    await this.getTotalUsers()
    await this.getTotalCourses()
    await this.getTotalTeacher()
  },
  methods: {
    async getTotalUsers() {
      const params = {
        'page': 1,
        'limit': 100
      }
      // eslint-disable-next-line no-unused-vars
      const { data, total } = await getUserList(params)
      this.totalUsers = total
    },
    async getTotalCourses() {
      const params = {
        'page': 1,
        'limit': 100
      }
      // eslint-disable-next-line no-unused-vars
      const { data, total } = await getCourseList(params)
      this.totalCourses = total
    },
    async getTotalTeacher() {
      const params = {
        'page': 1,
        'limit': 100
      }
      // eslint-disable-next-line no-unused-vars
      const { data, total } = await getTeacherList(params)
      this.totalTeachers = total
    }
  }
}
</script>

<style lang="scss" scoped>
.card_db {
  height: 100px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #FFFFFF;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.name_card_item {
  color: rgba(0,0,0,.45);
  font-size: 18px;
}
.value_card_item {
  font-size: 20px;
}
</style>
