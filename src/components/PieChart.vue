<template>
  <div style="width:100%">
    <highcharts :options="chartOptions" :highcharts="hcInstance"></highcharts>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
export default {
  props: { data: { type: Object, required: true } },
  name: 'PieChart',
  data () {
    return {
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
          pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '$'
          }
        },
        legend: {
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'center',
          x: 0,
          y: 0
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
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
          }, {
            name: 'Internet Explorer',
            y: 11.84
          }, {
            name: 'Firefox',
            y: 10.85
          }, {
            name: 'Edge',
            y: 4.67
          }, {
            name: 'Safari',
            y: 4.18
          }, {
            name: 'Sogou Explorer',
            y: 1.64
          }, {
            name: 'Opera',
            y: 1.6
          }, {
            name: 'QQ',
            y: 1.2
          }, {
            name: 'Other',
            y: 2.61
          }]
        }]
      }
    }
  }
}
</script>
