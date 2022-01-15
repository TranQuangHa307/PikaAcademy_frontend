<template>
  <div style="color: white;">
    <div class="content_center mt-5">
      <div class="w40 txt_left">
        <b-form-group label="Bạn đã có kinh nghiệm tạo dựng video khoá học chưa?">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio value='1'>Mới bắt đầu</b-form-radio>
            <br/>
            <b-form-radio value='2'>Biết một chút</b-form-radio>
            <br/>
            <b-form-radio value='3'>Đã có kinh nghiệm</b-form-radio>
            <br/>
            <b-form-radio value='4'>Tôi đã có video và sẵn sàng để upload lên edumall</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="w60">
        <div>
          <i>Trong những năm qua, Edumall đã hướng dẫn hàng ngàn giảng viên cách quay dựng bài giảng tại nhà. Bất kể bạn đã có kinh nghiệm quay dựng hay chưa, bạn cũng có thể trở thành một chuyên gia video. Edumall sẽ trang bị cho giảng viên các tài nguyên, mẹo hỗ trợ để giúp giảng viên sản xuất được khoá học hiệu quả nhất.</i>
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
      selected: '1',
      status: null
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
