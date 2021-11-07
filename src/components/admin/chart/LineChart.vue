<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    datasets: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.datasets
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
