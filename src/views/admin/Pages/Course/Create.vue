/* eslint-disable no-undef */
<template>
  <div>
    <div class="table-users p-3">
      <b-row>
        <b-col cols="12" md="8">
          <div class="container">
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                label="Name"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="course.name"
                />
                <p v-if="errors.name" class="error_valid">{{ errors.name }}</p>
              </b-form-group>
              <b-form-group
                label="Description"
                label-for="description-textarea"
              >
                <ckeditor v-model="course.description" :editor="editor" tag-name="textarea" />
                <p v-if="errors.description" class="error_valid">{{ errors.description }}</p>
              </b-form-group>
              <b-form-group
                label="About"
                label-for="about-textarea"
              >
                <ckeditor v-model="course.about" :editor="editor" tag-name="textarea" />
                <p v-if="errors.about" class="error_valid">{{ errors.about }}</p>
              </b-form-group>
              <b-form-group
                label="Image"
                label-for="image-input"
              >
                <upload-image :url-image="course.url_image" @setImage="setImage($event)" />
                <p v-if="errors.image" class="error_valid">{{ errors.image }}</p>
              </b-form-group>
              <b-form-group
                label="Intro Video"
                label-for="video-input"
              >
                <upload-vieo :url-video="course.url_intro_video" @resVideo="setVideo($event)" />
                <p v-if="errors.introVideo" class="error_valid">{{ errors.introVideo }}</p>
              </b-form-group>
              <b-form-group
                label="Result"
                label-for="result-textarea"
              >
                <ckeditor v-model="course.result" :editor="editor" tag-name="textarea" />
                <p v-if="errors.result" class="error_valid">{{ errors.result }}</p>
              </b-form-group>
              <b-form-group
                label="Price Type"
                label-for="price-select"
              >
                <b-form-select
                  v-model="priceType"
                  :options="priceTypeOptions"
                />
                <p v-if="errors.priceType" class="error_valid">{{ errors.priceType }}</p>
              </b-form-group>
              <div class="flex">
                <b-form-group
                  v-if="priceType && priceType!='free'"
                  label="Price"
                  label-for="price-input"
                  class="flex1 mr-2"
                >
                  <b-form-input
                    id="price-input"
                    v-model="price.price"
                    type="number"
                  />
                  <p v-if="errors.price" class="error_valid">{{ errors.price }}</p>
                </b-form-group>
                <b-form-group
                  v-if="priceType && priceType==='discount'"
                  label="Promotional price"
                  label-for="price-input"
                  class="flex1 ml-2"
                >
                  <b-form-input
                    id="price-input"
                    v-model="discountPromotion.discount"
                    type="number"
                    min="0"
                    max="100"
                  />
                  <p v-if="errors.discount" class="error_valid">{{ errors.discount }}</p>
                  <b-form-group
                    label="Date time range"
                    label-for="level-select"
                    class="mt-2"
                  >
                    <date-time-picker :begin-date="course.discount_begin_date" :end-date="course.discount_end_date" @setDateRange="setDateRange($event)" />
                    <p v-if="errors.dateRange" class="error_valid">{{ errors.dateRange }}</p>
                  </b-form-group>
                </b-form-group>
              </div>

              <b-form-group
                label="Level"
                label-for="level-select"
              >
                <b-form-select
                  v-model="course.level"
                  :options="levelOptions"
                />
                <p v-if="errors.level" class="error_valid">{{ errors.level }}</p>
              </b-form-group>

              <b-form-group
                label="Interests"
                label-for="interests-select"
              >
                <b-form-select
                  v-model="interestsId"
                  :options="interestsOptions"
                  value-field="id"
                  text-field="name"
                />
                <p v-if="errors.interests" class="error_valid">{{ errors.interests }}</p>
              </b-form-group>
              <b-form-group
                label="Category"
                label-for="category-select"
              >
                <b-form-select
                  v-model="course.category_id"
                  :options="categoryOptions"
                  value-field="id"
                  text-field="name"
                />
                <p v-if="errors.category" class="error_valid">{{ errors.category }}</p>
              </b-form-group>
              <b-form-group
                label="Teacher"
                label-for="teacher-select"
              >
                <b-form-select
                  v-model="course.teacher_id"
                  :options="teacherOptions"
                  value-field="id"
                  text-field="full_name"
                />
                <p v-if="errors.teacher" class="error_valid">{{ errors.teacher }}</p>
              </b-form-group>
              <div>
                <div class="content_center">
                  <div class="w50 txt_left">
                    <label>Material*</label>
                  </div>
                  <div class="w50 txt_right">
                    <b-button variant="primary" @click="appendMaterial()">+</b-button>
                  </div>
                </div>
                <div>
                  <div v-for="(elmnt, index) in  materialArr" :key="index" class="content_center">
                    <input v-model="elmnt.name" class="form-control m-1" placeholder="Name" />
                    <input v-model="elmnt.link" class="form-control m-1" placeholder="Link" />
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
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { _ } from 'vue-underscore'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { uploadFile } from '../../../../api/common'
import { getAllInterests } from '../../../../api/interests'
import { getAllCategory } from '../../../../api/category'
import { getAllTeacher } from '../../../../api/teacher'
import { addCourse } from '../../../../api/course'
import { convertDateTimeInsert } from '../../../../utils/index'
import UploadImage from '../../../../components/admin/uploadFile/UploadImg.vue'
import UploadVieo from '../../../../components/admin/uploadFile/UploadVideo.vue'
import DateTimePicker from '../../../../components/datepicker/DateTimeRangePicker.vue'
export default {
  components: {
    UploadImage,
    UploadVieo,
    DateTimePicker
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
      price: {
        id: null,
        price: 0
      },
      discountPromotion: {
        id: null,
        discount: null,
        begin_date: null,
        end_date: null
      },
      editor: ClassicEditor,
      image: null,
      video: null,
      dateRange: null,
      interestsId: null,
      interestsOptions: [],
      priceType: null,
      levelOptions: [
        { 'value': null, 'text': 'Please select an option' },
        { 'value': 'beginner', 'text': 'Beginner' },
        { 'value': 'intermediate', 'text': 'Intermediate' },
        { 'value': 'advance', 'text': 'Advance' }
      ],
      priceTypeOptions: [
        { 'value': null, 'text': 'Please select an option' },
        { 'value': 'default', 'text': 'Price' },
        { 'value': 'discount', 'text': 'Discount' },
        { 'value': 'free', 'text': 'Free' }
      ],
      categories: [],
      categoryOptions: [],
      teacherOptions: [],
      materialArr: [],
      materialIndex: 0
    }
  },
  watch: {
    interestsId(newValue, oldValue) {
      console.log(newValue)
      console.log(this.categoryOptions)
      this.setCategoryOptions(newValue)
    },
    priceType(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          if (newValue === 'free') this.price.price = 0
          if (newValue !== 'discount') {
            this.discountPromotion.discount = null
            this.discountPromotion.begin_date = null
            this.discountPromotion.end_date = null
          }
        }
      }
    }
  },
  async created() {
    await this.getInterestsOptions()
    await this.getCategoryOptions()
    await this.getTeacherOptions()
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
    setDateRange(value) {
      this.dateRange = value
      this.discountPromotion.begin_date = convertDateTimeInsert(this.dateRange[0], 'datetime')
      this.discountPromotion.end_date = convertDateTimeInsert(this.dateRange[1], 'datetime')
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
        this.categories = []
      }
      this.setCategoryOptions(this.interestsId)
    },
    setCategoryOptions(interestsId) {
      this.categoryOptions = this.categories.filter(category => category.interests_id === interestsId)
      this.categoryOptions.push({ 'id': null, 'name': 'Please select an option' })
    },
    getPriceType(course) {
      if (course.discount) this.priceType = 'discount'
      else {
        if (course.price > 0) this.priceType = 'default'
        else this.priceType = 'free'
      }
    },
    getTeacherOptions: async function() {
      try {
        const list = await getAllTeacher()
        this.teacherOptions = list
      } catch (error) {
        this.teacherOptions = []
      }
      this.teacherOptions.push({ 'id': null, 'full_name': 'Please select an option' })
    },
    checkFormValidity() {
      this.errors = {}
      if (!this.course.name) this.errors.name = 'Course Name is valid!'
      if (!this.course.description) this.errors.description = 'Description is valid!'
      if (!this.course.about) this.errors.about = 'About is valid!'
      if (!this.image && !this.course.url_image) this.errors.image = 'Image is valid!'
      if (!this.video && !this.course.url_intro_video) this.errors.introVideo = 'Intro video is valid!'
      if (!this.course.result) this.errors.result = 'Result is valid!'
      if (!this.course.level) this.errors.level = 'Level is valid!'
      if (!this.priceType) this.errors.priceType = 'Price type is valid!'
      else {
        if (this.priceType !== 'free') {
          if (!this.price.price) this.errors.price = 'Price is valid!'
          if (this.priceType === 'discount') {
            if (!this.discountPromotion.discount) this.errors.discount = 'Discount is valid!'
            if (!this.dateRange) this.errors.dateRange = 'Date range is valid!'
          }
        }
      }
      if (!this.interestsId) this.errors.interests = 'Interests is valid!'
      if (!this.course.category_id) this.errors.category = 'Category is valid!'
      if (!this.course.teacher_id) this.errors.teacher = 'Teacher is valid!'
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
        'level': this.course.level,
        'interests_id': this.interestsId,
        'category_id': this.course.category_id,
        'teacher_id': this.course.teacher_id,
        'price_id': this.price.id,
        'price': Number(this.price.price),
        'discount_promotion_id': this.discountPromotion.id,
        'discount': this.discountPromotion.discount ? Number(this.discountPromotion.discount) : null,
        'begin_date': this.discountPromotion.begin_date,
        'end_date': this.discountPromotion.end_date,
        'created_by': this.$store.state.Admin.myInfo.user_name,
        'updated_by': this.$store.state.Admin.myInfo.user_name,
        'material': this.materialArr
      }
      try {
        await addCourse(body)
      } catch (error) {
        this.showRes('danger', error.response?.data?.message || error.message)
      }
      this.$router.push({
        path: '/admin/course'
      })
      this.$store.commit('SET_DONE_LOADING')
    }
  }
}
</script>

