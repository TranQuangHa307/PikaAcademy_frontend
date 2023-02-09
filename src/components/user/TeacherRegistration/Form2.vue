<template>
  <div style="color: white;">
    <div class="content_center mt-5">
      <div class="w40 txt_left">
        <b-form-group label="Kinh nghiệm giảng dạy trước đây của bạn như thế nào">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio value="1">Chưa từng có hoạt động giảng dạy, chỉ hướng dẫn nhân viên hoặc chỉ có kinh nghiệm trong nghề....</b-form-radio>
            <br>
            <b-form-radio value="2">Đã từng dạy trực tiếp, nhưng không phải giảng viên chính thức</b-form-radio>
            <br>
            <b-form-radio value="3">Dạy chuyên nghiệp tại các trường lớp</b-form-radio>
            <br>
            <b-form-radio value="4">Đã có kinh nghiệm giảng dạy online</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="w60">
        <div>
          <i>Các khoá học của Edumall là những trải nghiệm dựa trên video giúp người học có cơ hội tiếp cận với các kỹ năng thực tiễn. Cho dù bạn đã có kinh nghiệm giảng dạy hay chưa, Edumall sẽ giúp bạn đóng gói kiến thức vào một khoá học online để chia sẻ và truyền cảm hứng cho người học.</i>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        Tôi đồng ý với các điều khoản nêu trên
      </b-form-checkbox>
    </div>
    <div class="w100 content_center">
      <b-button class="btn_te_reg mr-2" @click="before()">Trước đó</b-button>
      <b-button class="btn_te_reg" :disabled="isDisabled" @click="continueForm()">Tiếp theo</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '1',
      status: null
    }
  },
  computed: {
    isDisabled() {
      if (this.status === 'accepted') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    continueForm() {
      this.$emit('continueForm')
    },
    before() {
      this.$emit('before')
    }
  }
}
</script>

<style lang="scss">
.btn_te_reg {
  color: #1D1E22;
  background-color: #feda6a;
}
</style>
