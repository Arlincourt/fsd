import Chart from '@components/chart/Chart'

const options = {
  type: 'doughnut',
  data: {
      datasets: [{
        data: [260, 260, 522],
        backgroundColor: [['#BC9CFF', '#8BA4F9'], ['#6FCF97', '#66D2EA'], ['#FFE39C', '#FFBA9C']],
        borderWidth: 2,
        borderColor: '#fff'
      }]
  },
  options: {
    cutout: 57,
    events: [''],
  }
}

$(() => {
  $('.room-details .js-chart').each((idx, el) => {
    new Chart(el, options)
  })
})