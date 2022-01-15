import eventBus from './eventBus'
export default {
  methods: {
    showNotification(status, message) {
      this.$swal({
        icon: status,
        title: message,
        background: '#1D1E22'
      }).then((result) => {
        this.$router.push({
          path: '/'
        })
      })
    },
    getPrice(price) {
      return (!price) ? 'FREE' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    convertTSToDateTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000)
      return `${this.getNumber(date.getDate())}/${this.getNumber(date.getMonth() + 1)}/${this.getNumber(date.getFullYear())} ${this.getNumber(date.getHours())}:${this.getNumber(date.getMinutes())}:${this.getNumber(date.getSeconds())}`
    },
    getNumber(number) {
      return (number < 10) ? `0${number}` : number
    },
    convertDateOfBirth(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000)
      return `${this.getNumber(date.getFullYear())}-${this.getNumber(date.getMonth() + 1)}-${this.getNumber(date.getDate())}`
    },
    showInfo(comName, id) {
      const com = {
        'comName': comName,
        'comData': id
      }
      eventBus.$emit('com', com)
    },
    updateNoti() {
      eventBus.$emit('updateNoti')
    },
    showResAction(status, message) {
      this.$swal({
        toast: true,
        icon: status,
        title: message,
        background: '#28A745',
        color: 'white',
        animation: false,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    }
  }
}
