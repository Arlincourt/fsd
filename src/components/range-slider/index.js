import RangeSlider from './RangeSlider'


const options = {
  start: [5000, 10000],
  connect: true,
  range: {
      'min': 0,
      'max': 15000
  }
}

$(() => {
  $('.range-slider').each((idx, el) => {
    new RangeSlider(el, options)
  })
})