<template>
  <div class="w-100">
    <div class="pie-chart-dropdown">
        <b-form-select v-model="selectedDate" :options="dropdownOptions" @input="dateChanged"></b-form-select>
    </div>
    <highcharts :options="chartOptions" :highcharts="hcInstance"></highcharts>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
export default {
  props: {
    data: { type: Object, required: true },
    dropdownOptions: { type: Array }
  },
  name: 'PieChart',
  data () {
    return {
      selectedDate: 30,
      hcInstance: Highcharts,
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Expenses & Refunds',
          align: 'left'
        },
        tooltip: {
          pointFormatter: function () {
            return '$' + Highcharts.numberFormat(this.y, 2, '.', ',')
          }
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          width: 350,
          verticalAlign: 'middle',
          useHTML: true,
          title: {
          },
          labelFormatter: function () {
            return '<div style="text-align: left; width:330px;float:left;">' + this.name + ' <span style="float:right">$' + Highcharts.numberFormat(this.y, 2) + '</span></div>'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            dataLabels: {
              enabled: false
            }
          }
        },
        series: []
      }
    }
  },
  watch: {
    data (val) {
      this.updateSeries(val)
    }
  },
  created () {
    this.updateSeries(this.data)
  },
  methods: {
    updateSeries (series) {
      if (series.selectedDate) {
        this.selectedDate = series.selectedDate
      }
      this.chartOptions.legend.title = {
        text: '<div style="text-align:left;width:350px;">Total Expenses <span style="float:right">$' + series.totalExpenses.toLocaleString('en') + '</span></div>',
        style: {
          fontSize: '1.1em'
        }
      }
      const arr = series.items.filter((el) => el.amount > 0).map((el) => {
        return {
          name: el.type,
          y: el.amount
        }
      })
      this.chartOptions.series = [{
        name: '',
        colorByPoint: true,
        data: arr
      }]
    },
    dateChanged (e) {
      this.$emit('date-changed', e)
    }
  }
}
</script>
