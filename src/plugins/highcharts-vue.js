import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    drillUpText: 'Back',
    noData: 'Check your options please',
    resetZoom: 'Reset',
    thousandsSep: ','
  }
})

Vue.use(HighchartsVue)
