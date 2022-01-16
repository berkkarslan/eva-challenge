<template>
  <div style="width:100%">
    <highcharts :options="chartOptions" :highcharts="hcInstance"></highcharts>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
export default {
  props: { data: { type: Object, required: true } },
  name: 'LineChart',
  data () {
    return {
      hcInstance: Highcharts,
      chartOptions: {
        lang: {
          thousandsSep: ''
        },
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: 'Sales & Finances',
          align: 'left'
        },
        subtitle: {
          text: '',
          align: 'left'
        },
        xAxis: [{
          categories: this.data.date,
          type: 'datetime'
        }],
        yAxis: [{ // Primary yAxis
          title: {
            text: 'Quantity (Units)'
          },
          opposite: true
        }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
            text: 'Amount ($)'
          }
        }],
        tooltip: {
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          },
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: ({ point }) => {
                  this.$emit('clicked', point.category)
                }
              }
            }
          }
        },

        series: [{
          name: 'Reimbursement',
          type: 'column',
          stack: 'col1',
          yAxis: 1,
          color: '#5b9d44',
          tooltip: {
            valuePrefix: '$'
          },
          data: this.data.reimbursement
        }, {
          name: 'Total Sales',
          type: 'column',
          stack: 'col1',
          yAxis: 1,
          color: '#9aef7b',
          tooltip: { valuePrefix: '$' },
          data: this.data.totalSales,
          marker: {
            enabled: false
          }

        },
        {
          name: 'Total Refund',
          type: 'column',
          stack: 'col2',
          yAxis: 1,
          color: '#7d231d',
          tooltip: { valuePrefix: '$' },
          data: this.data.refund,
          marker: {
            enabled: false
          }
        },
        {
          name: 'Total Expense',
          type: 'column',
          stack: 'col2',
          yAxis: 1,
          color: '#d04027',
          tooltip: { valuePrefix: '$' },
          data: this.data.totalExpenses,
          marker: {
            enabled: false
          }
        },
        {
          name: 'Quantity',
          type: 'spline',
          color: '#45b7ff',
          data: this.data.itemQuantity
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                floating: false,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                x: 0,
                y: 0
              },
              yAxis: [{
                labels: {
                  align: 'right',
                  x: 0,
                  y: -6
                },
                showLastLabel: false
              }, {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -6
                },
                showLastLabel: false
              }, {
                visible: false
              }]
            }
          }]
        }
      }
    }
  }
}
</script>
