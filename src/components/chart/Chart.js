import { Chart as Doughnut, registerables } from 'chart.js';

Doughnut.register(...registerables);

class Chart {
  constructor(el, options) {
    this.el = el;
    this.ctx = el.querySelector('.js-chart-canvas').getContext('2d');
    this.text = el.querySelector('.js-chart-numbers');
    this.options = options;
    this.allVoices = this.setAllVoices();
    this.setEvent();
    this.init();
    this.setText(4);
  }

  setEvent() {
    this.options.options.onHover = this.handleChartHover.bind(this);
    this.el.addEventListener('mousemove', this.handleParentMousemove.bind(this));
  }

  handleParentMousemove(evt) {
    if (evt.target.classList.contains('js-chart-canvas')) {
      return;
    }
    this.setText(4);
  }

  handleChartHover(evt, activeItem) {
    $('.js-chart-canvas').css('cursor', activeItem[0] ? 'pointer' : 'default');
    if (activeItem.length === 1) {
      const idx = activeItem[0].index;
      this.$chart.data.datasets[0].hoverBorderColor = this.options.data.datasets[0]
        .backgroundColor[idx];
      this.setText(idx);
      this.$chart.update();
      return;
    }
    this.setText(4);
  }

  setText(idx) {
    this.text.textContent = this.options.data.datasets[0].data[idx];
    this.text.className = '';
    this.text.classList.add('chart__numbers');
    this.text.classList.add('js-chart-numbers');
    switch (idx) {
      case 0:
        this.text.classList.add('chart__numbers_color_purple');
        break;
      case 1:
        this.text.classList.add('chart__numbers_color_green');
        break;
      case 2:
        this.text.classList.add('chart__numbers_color_yellow');
        break;
      default:
        this.text.textContent = this.allVoices;
    }
  }

  setAllVoices() {
    let voices = 0;
    this.options.data.datasets[0].data.forEach((voicesNumber) => {
      voices += voicesNumber;
    });
    return voices;
  }

  init() {
    this.options.data.datasets[0].backgroundColor = this.options.data.datasets[0].backgroundColor
      .map((colorsArr) => {
        const canvasColor = this.ctx.createLinearGradient(0, 0, 0, 60);
        colorsArr.forEach((color, idx) => {
          canvasColor.addColorStop(idx, color);
        });
        return canvasColor;
      });
    this.$chart = new Doughnut(this.ctx, this.options);
  }
}

export default Chart;
