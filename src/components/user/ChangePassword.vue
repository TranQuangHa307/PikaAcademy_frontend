<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <b-form-group
          label="Mật khẩu hiện tại*"
          label-for="currentPassword"
        >
          <b-form-input
            id="currentPassword"
            v-model="form.currentPassword"
            type="password"
            required
          />
        </b-form-group>

        <b-form-group
          label="Mật khẩu mới*"
          label-for="newPassword"
        >
          <b-form-input
            id="newPassword"
            v-model="form.newPassword"
            type="password"
            required
          />
        </b-form-group>

        <b-form-group
          label="Xác nhận mật khẩu*"
          label-for="confirmPassword"
        >
          <b-form-input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
          />
          <p v-if="form.confirmPassword && (form.newPassword !== form.confirmPassword)">Your password and confirmation password do not match.</p>
        </b-form-group>
      </div>
      <div class="w100 txt_center">
        <b-button class="mr-2" type="button" variant="danger" @click="cancelForm()">Huỷ bỏ</b-button>
        <b-button type="submit" variant="primary" :disabled="!isSubmit">Cập nhật</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import { changePassword } from '../../api/user'
export default {
  data() {
    return {
      form: {}
    }
  },
  computed: {
    isSubmit() {
      if (this.form.currentPassword && this.form.newPassword && this.form.confirmPassword && this.form.newPassword === this.form.confirmPassword) return true
      else return false
    }
  },
  methods: {
    cancelForm() {
      this.$emit('cancelForm')
    },
    async onSubmit() {
      const body = {
        id: this.$store.state.User.myInfo.id,
        currentPassword: this.form.currentPassword,
        newPassword: this.form.newPassword,
        confirmPassword: this.form.confirmPassword
      }
      const res = await changePassword(body)
      let icon = 'success'
      if (!res.status) icon = 'warning'
      this.$swal({
        'icon': icon,
        'title': res.message,
        background: '#1D1E22'
      }).then((result) => {
        if (res.status) this.cancelForm()
      })
    }
  }
}
</script>

