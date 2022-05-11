import noUiSlider from 'nouislider';

class RangeSlider {
  constructor(el, options) {
    this._init(el, options);
  }

  _init(el, options) {
    this._$el = el;
    this._options = options;
    this._$item = this._$el.querySelector('.js-range-slider__item');
    this._$input = this._$el.querySelector('.js-range-slider__input');
    this._$rangeSlider = null;
    this._$info = this._$el.querySelector('.js-range-slider__info');
    this._$rangeSlider = noUiSlider.create(this._$item, this._options);
    this._initEvents();
  }

  _initEvents() {
    this._$rangeSlider.on('update', this._handleSliderChange.bind(this));
  }

  _handleSliderChange(values) {
    const value = this._formatValue(values);
    this._$input.value = `${value[0]} ${value[1]}`;
    this._$info.textContent = `${value[0]}₽ - ${value[1]}₽`;
  }

  _formatValue(values) {
    return values.map((val) => String(Math.round(val)));
  }
}

export default RangeSlider;
