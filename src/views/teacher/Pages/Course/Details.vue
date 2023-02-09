<template>
  <div class="te_course_detail">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Tên*"
        label-for="name-input"
      >
        <b-form-input
          id="name-input"
          v-model="course.name"
        />
        <p v-if="errors.name" class="error_valid">{{ errors.name }}</p>
      </b-form-group>
      <b-form-group
        label="Mô tả*"
        label-for="description-textarea"
      >
        <ckeditor v-model="course.description" :editor="editor" tag-name="textarea" />
        <p v-if="errors.description" class="error_valid">{{ errors.description }}</p>
      </b-form-group>
      <b-form-group
        label="Giới thiệu*"
        label-for="about-textarea"
      >
        <ckeditor v-model="course.about" :editor="editor" tag-name="textarea" />
        <p v-if="errors.about" class="error_valid">{{ errors.about }}</p>
      </b-form-group>
      <b-form-group
        label="Ảnh*"
        label-for="image-input"
      >
        <upload-image :url-image="course.url_image" @setImage="setImage($event)" />
        <p v-if="errors.image" class="error_valid">{{ errors.image }}</p>
      </b-form-group>
      <b-form-group
        label="Vieo giới thiệu*"
        label-for="video-input"
      >
        <upload-vieo :url-video="course.url_intro_video" @resVideo="setVideo($event)" />
        <p v-if="errors.introVideo" class="error_valid">{{ errors.introVideo }}</p>
      </b-form-group>
      <b-form-group
        label="Lợi ích sau khoá học*"
        label-for="result-textarea"
      >
        <ckeditor v-model="course.result" :editor="editor" tag-name="textarea" />
        <p v-if="errors.result" class="error_valid">{{ errors.result }}</p>
      </b-form-group>

      <b-form-group
        label="Khối lớp*"
        label-for="interests-select"
      >
        <b-form-select
          v-model="interestsId"
          :options="interestsOptions"
          value-field="id"
          text-field="name"
          style="width: 100%;"
        />
        <p v-if="errors.interests" class="error_valid">{{ errors.interests }}</p>
      </b-form-group>
      <b-form-group
        label="Môn học*"
        label-for="category-select"
      >
        <b-form-select
          v-model="course.category_id"
          :options="categoryOptions"
          value-field="id"
          text-field="name"
          style="width: 100%;"
        />
        <p v-if="errors.category" class="error_valid">{{ errors.category }}</p>
      </b-form-group>
      <div>
        <div class="content_center">
          <div class="w50 txt_left">
            <label>Tài liệu tham khảo*</label>
          </div>
          <div class="w50 txt_right">
            <b-button variant="primary" @click="appendMaterial()">+</b-button>
          </div>
        </div>
        <div>
          <div v-for="(elmnt, index) in materialArr" :key="index" class="content_center">
            <input v-model="elmnt.name" class="form-control m-1" placeholder="Name">
            <input v-model="elmnt.link" class="form-control m-1" placeholder="Link">
            <button type="button" class="btn btn-danger" @click="removeMaterial(elmnt.id)"><b-icon icon="trash-fill" variant="white" /></button>
          </div>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { _ } from 'vue-underscore'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { uploadFile } from '../../../../api/common'
import { getAllInterests } from '../../../../api/interests'
import { getAllCategory } from '../../../../api/category'
import { addCourse, updateCourse, getCourseInfo, getMaterialByCourse } from '../../../../api/course'
import UploadImage from '../../../../components/admin/uploadFile/UploadImg.vue'
import UploadVieo from '../../../../components/admin/uploadFile/UploadVideo.vue'
export default {
  components: {
    UploadImage,
    UploadVieo
  },
  data() {
    return {
      errors: {},
      course: {
        name: null,
        description: null,
        about: null,
        url_image: null,
        url_intro_video: null,
        time: null,
        result: null,
        interests_id: null,
        category_id: null,
        level: null,
        teacher_id: null
      },
      editor: ClassicEditor,
      image: null,
      video: null,
      dateRange: null,
      interestsId: null,
      interestsOptions: [],
      levelOptions: [
        { 'value': null, 'text': 'Please select an option' },
        { 'value': 'beginner', 'text': 'Cơ bản' },
        { 'value': 'intermediate', 'text': 'Trung bình' },
        { 'value': 'advance', 'text': 'Nâng cao' }
      ],
      categories: [],
      categoryOptions: [],
      materialArr: [],
      materialIndex: 0
    }
  },
  watch: {
    interestsId(newValue, oldValue) {
      console.log(newValue)
      console.log(this.categoryOptions)
      this.setCategoryOptions(newValue)
    }
  },
  async created() {
    await this.getInterestsOptions()
    await this.getCategoryOptions()
    if (this.$route.params.id) {
      this.course = await getCourseInfo(this.$route.params.id)
      this.interestsId = this.course.interests_id
      const material = await getMaterialByCourse(this.$route.params.id)
      this.getMaterial(material)
      this.showInfo('Chapter', this.course.id)
    }
  },
  methods: {
    appendMaterial() {
      this.materialIndex++
      this.materialArr.push({ id: this.materialIndex, name: null, link: null })
    },
    removeMaterial(id) {
      const material = this.materialArr.find(item => item.id === id)
      this.materialArr.splice(this.materialArr.indexOf(material), 1)
    },
    setImage(value) {
      this.image = value
    },
    setVideo(value) {
      if (value.videoType === 'file') {
        this.video = value.video
      } else {
        this.video = null
        this.course.url_intro_video = value.video
      }
    },
    showRes(res) {
      this.$bvToast.toast(res.message, {
        title: `Variant ${res.status || 'default'}`,
        variant: res.status,
        solid: true
      })
    },
    getInterestsOptions: async function() {
      try {
        const list = await getAllInterests()
        this.interestsOptions = list
      } catch (error) {
        this.interestsOptions = []
      }
      this.interestsOptions.push({ 'id': null, 'name': 'Please select an option' })
    },
    getCategoryOptions: async function() {
      try {
        const list = await getAllCategory()
        this.categories = list
      } catch (error) {
        this.categoryOptions = []
      }
      this.setCategoryOptions(this.interestsId)
    },
    setCategoryOptions(interestsId) {
      this.categoryOptions = this.categories.filter(category => category.interests_id === interestsId)
      this.categoryOptions.push({ 'id': null, 'name': 'Please select an option' })
    },
    getMaterial(material) {
      for (let i = 0; i < material.length; i++) {
        this.materialIndex++
        this.materialArr.push({
          'id': this.materialIndex,
          'name': material[i].name,
          'link': material[i].link
        })
      }
    },
    checkFormValidity() {
      this.errors = {}
      if (!this.course.name) this.errors.name = 'Course Name is valid!'
      if (!this.course.description) this.errors.description = 'Description is valid!'
      if (!this.course.about) this.errors.about = 'About is valid!'
      if (!this.image && !this.course.url_image) this.errors.image = 'Image is valid!'
      if (!this.video && !this.course.url_intro_video) this.errors.introVideo = 'Intro video is valid!'
      if (!this.course.result) this.errors.result = 'Result is valid!'
      if (!this.interestsId) this.errors.interests = 'Interests is valid!'
      if (!this.course.category_id) this.errors.category = 'Category is valid!'
      return _.isEmpty(this.errors)
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.$store.commit('SET_LOADING')
      if (this.image) {
        this.course.url_image = await uploadFile(this.image)
      }
      if (this.video) {
        this.course.url_intro_video = await uploadFile(this.video)
      }
      const body = {
        'name': this.course.name,
        'description': this.course.description,
        'about': this.course.about,
        'url_image': this.course.url_image,
        'url_intro_video': this.course.url_intro_video,
        'result': this.course.result,
        'level': 'beginner',
        'interests_id': this.interestsId,
        'category_id': this.course.category_id,
        'is_active': null,
        'release': null,
        'teacher_id': this.$store.state.Teacher.myInfo.id,
        'created_by': 'anhnh',
        'updated_by': 'anhnh',
        'material': this.materialArr
      }
      try {
        if (this.$route.params.id) {
          await updateCourse(this.$route.params.id, body)
        } else {
          await addCourse(body)
        }
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.$router.push({
        name: 'courseTeacherManeger'
      })
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>

<style lang="scss">
.te_course_detail {
  background-color: white;
  height: 95vh;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
  border-radius: 1em;
  overflow: auto;
  padding: 1em 2em;
  label {
    font-weight: bold;
  }
}
</style>
