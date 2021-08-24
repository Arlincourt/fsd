import RangeSlider from './RangeSlider'


const options = {
  start: [5000, 10000],
  connect: true,
  range: {
      'min': 500,
      'max': 15500
  }
}

$(() => {
  $('.range-slider').each((idx, el) => {
    new RangeSlider(el, options)
  })
})