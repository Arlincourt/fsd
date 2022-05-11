import { Chart, registerables } from 'chart.js';
import { boundMethod } from 'autobind-decorator';

Chart.register(...registerables);

class Graph {
  constructor(el) {
    this._options = {
      type: 'doughnut',
      data: {
        datasets: [{
          hoverBorderWidth: 2,
        }],
      },
      options: {
        cutout: 53,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    };
    this._el = el;
    this._ctx = el.querySelector('.js-graph__canvas').getContext('2d');
    this._text = el.querySelector('.js-graph__numbers');
    this._info = el.querySelector('.js-graph__info');
    this._setDatasets();
    this._allVoices = this._setAllVoices();
    this._setEvent();
    this._init();
    this._setText('none');
  }

  _setEvent() {
    this._options.options.onHover = this._handleGraphHover;
    this._el.addEventListener('mousemove', this._handleParentMousemove);
  }

  _setDatasets() {
    const $element = $(this._el);
    this._options.data.datasets[0].backgroundColor = $element.data('colors');
    this._options.data.datasets[0].data = $element.data('voices');
    this._colors = $element.data('colors');
  }

  @boundMethod
  _handleParentMousemove(evt) {
    if (evt.target.classList.contains('js-graph__canvas')) {
      return;
    }
    this._setText('none');
  }

  @boundMethod
  _handleGraphHover(evt, activeItem) {
    $('.js-graph__canvas').css('cursor', activeItem[0] ? 'pointer' : 'default');
    if (activeItem.length === 1) {
      const idx = activeItem[0].index;
      this._$chart.data.datasets[0].hoverBorderColor = this._options.data.datasets[0]
        .backgroundColor[idx];
      this._setText(idx);
      this._$chart.update();
      return;
    }
    this._setText('none');
  }

  _setText(idx) {
    this._text.textContent = this._options.data.datasets[0].data[idx];
    if (idx === 'none') {
      this._text.textContent = this._allVoices;
      this._info.style.backgroundClip = '';
      this._info.style.webkitTextFillColor = '';
      this._info.style.backgroundImage = '';
      return;
    }

    this._info.style.backgroundImage = `linear-gradient(180deg, ${this._colors[idx][0]} 0%, ${this._colors[idx][1]} 100%)`;
    this._info.style.webkitBackgroundClip = 'text';
    this._info.style.webkitTextFillColor = 'transparent';
  }

  _setAllVoices() {
    let voices = 0;
    this._options.data.datasets[0].data.forEach((voicesNumber) => {
      voices += voicesNumber;
    });
    return voices;
  }

  _init() {
    this._options.data.datasets[0].backgroundColor = this._options.data.datasets[0].backgroundColor
      .map((colorsArr) => {
        const canvasColor = this._ctx.createLinearGradient(0, 0, 0, 60);
        colorsArr.forEach((color, idx) => {
          canvasColor.addColorStop(idx, color);
        });
        return canvasColor;
      });
    this._$chart = new Chart(this._ctx, this._options);
  }
}

export default Graph;
