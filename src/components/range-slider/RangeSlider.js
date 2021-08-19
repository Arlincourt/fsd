import noUiSlider from 'nouislider'

class RangeSlider {
  constructor(el, options) {
    this.$el = el
    this.options = options
    this.$item = this.$el.querySelector('.range-slider__item')
    this.$input = this.$el.querySelector('.range-slider__input')
    this.$rangeSlider = null
    this.$info = this.$el.querySelector('.range-slider__info')
    this.init()
  }

  init() {
    this.$rangeSlider = noUiSlider.create(this.$item, this.options)
    this.initEvents()
  }

  initEvents() {
    this.$rangeSlider.on('update', this.onChange.bind(this))
  }

  onChange(values, handle, unencoded, tap, positions, noUiSlider) {
    const value = this.formatValue(values)
    this.$input.value = `${value[0]} ${value[1]}`
    this.$info.textContent = `${value[0]}₽ - ${value[1]}₽`
  }

  formatValue(values) {
    return values.map((val) => {
      return String(Math.round(val))
    })
  }
}


export default RangeSlider