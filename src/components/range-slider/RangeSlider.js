import noUiSlider from 'nouislider';

class RangeSlider {
  constructor(el, options) {
    this.init(el, options);
  }
  
  init(el, options) {
    this.$el = el;
    this.options = options;
    this.$item = this.$el.querySelector('.js-range-slider__item');
    this.$input = this.$el.querySelector('.js-range-slider__input');
    this.$rangeSlider = null;
    this.$info = this.$el.querySelector('.js-range-slider__info');
    this.$rangeSlider = noUiSlider.create(this.$item, this.options);
    this.initEvents();
  }

  initEvents() {
    this.$rangeSlider.on('update', this.handleSliderChange.bind(this));
  }

  handleSliderChange(values) {
    const value = this.formatValue(values);
    this.$input.value = `${value[0]} ${value[1]}`;
    this.$info.textContent = `${value[0]}₽ - ${value[1]}₽`;
  }

  formatValue(values) {
    return values.map((val) => String(Math.round(val)));
  }
}

export default RangeSlider;
