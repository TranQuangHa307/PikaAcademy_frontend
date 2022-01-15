<template>
  <div style="color: white;">
    <div class="content_center mt-5">
      <div class="w40 txt_left">
        <b-form-group>
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio value='individual'>Cá nhân</b-form-radio>
            <br/>
            <b-form-radio value='organization'>Tổ chức</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="w60">
        <div>
          Tuỳ vào phương thức hợp tác cá nhân hay pháp nhân, quy trình hợp tác giảng viên với Edumall sẽ khác nhau.
        </div>
        <div>
          <b>- Điều kiện cần để hợp tác cá nhân: Chứng minh thư nhân dân/Hộ chiếu</b>
        </div>
        <div>
          <b>- Điều kiện cần để hợp tác pháp nhân : Giấy phép Đăng ký kinh doanh và 1 trong các giấy tờ sau:</b>
        </div>
        <div>
          <i>+ Giấy chứng nhận đăng ký hoạt động nghề nghiệp</i>
        </div>
        <div>
          <i>+ Giấy phép hoạt động giáo dục kĩ năng sống và hoạt động giáo dục ngoài giờ chính khoá</i>
        </div>
        <div>
          <i>+ Giấy chứng nhận hoạt động của trung tâm đào tạo ngoại ngữ/tin học</i>
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
      <b-button class="btn_te_reg" @click="continueForm()" :disabled="!status">Tiếp theo</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'individual',
      status: null
    }
  },
  methods: {
    continueForm() {
      this.$emit('continueForm')
    },
    before() {
      this.$emit('before')
    },
    onSubmit() {
      this.$emit('onSubmit', null)
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
