<template>
  <b-row class="border-bottom">
    <b-col md="12">
      <b-card>
        <column-chart v-if="data !== null" :data="data" @clicked="getPieData" />
      </b-card>
    </b-col>
    <b-col md="12" class="mt-3">
      <b-card>
        <pie-chart
          v-if="pieData !== null"
          :data="pieData"
          :dropdownOptions="dropdownOptions"
          @date-changed="getPieData"
        />
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import ColumnChart from '../components/ColumnChart.vue'
import PieChart from '../components/PieChart.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    ColumnChart,
    PieChart
  },
  data () {
    return {
      data: null,
      pieData: null,
      totalExpenses: 0,
      dropdownOptions: []
    }
  },
  created () {
    this.getData()
    this.getPieData()
  },
  methods: {
    async getData () {
      const response = await this.$store.dispatch('getData')
      const reimbursement = response.Data.item.map((el) => el.reimbursement)
      const totalSales = response.Data.item.map((el) => el.totalSales)
      const totalExpenses = response.Data.item.map((el) => el.totalExpenses)
      const refund = response.Data.item.map((el) => el.refund)
      const itemQuantity = response.Data.item.map((el) => el.itemQuantity)
      const date = response.Data.item.map((el) => el.date)
      this.data = {
        reimbursement,
        totalSales,
        totalExpenses,
        refund,
        itemQuantity,
        date
      }
      this.dropdownOptions = date.map((el) => ({ value: el, text: el }))
      this.dropdownOptions.unshift({ value: 30, text: 'Last 30 Days' })
    },
    async getPieData (val) {
      const response = await this.$store.dispatch('getSalesExpanse', val)
      this.pieData = {
        items: response.Data.item,
        totalExpenses: response.Data.totalExpenses,
        selectedDate: val
      }
    }
  }
}
</script>
