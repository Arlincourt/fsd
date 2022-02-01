import { Chart as Doughnut, registerables } from 'chart.js';

Doughnut.register(...registerables);

class Chart {
  options = {
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

  constructor(el) {
    this.el = el;
    this.ctx = el.querySelector('.js-chart__canvas').getContext('2d');
    this.text = el.querySelector('.js-chart__numbers');
    this.info = el.querySelector('.js-chart__info');
    this.setDatasets()
    this.allVoices = this.setAllVoices();
    this.setEvent();
    this.init();
    this.setText(4);
  }

  setEvent() {
    this.options.options.onHover = this.handleChartHover.bind(this);
    this.el.addEventListener('mousemove', this.handleParentMousemove.bind(this));
  }

  setDatasets() {
    const $element = $(this.el)
    this.options.data.datasets[0].backgroundColor = $element.data('colors');
    this.options.data.datasets[0].data = $element.data('voices');
  }

  handleParentMousemove(evt) {
    if (evt.target.classList.contains('js-chart__canvas')) {
      return;
    }
    this.setText(4);
  }

  handleChartHover(evt, activeItem) {
    $('.js-chart__canvas').css('cursor', activeItem[0] ? 'pointer' : 'default');
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
    this.info.className = '';
    this.info.classList.add('chart__info');
    this.info.classList.add('js-chart__info');
    switch (idx) {
      case 0:
        this.info.classList.add('chart__info_color_purple');
        break;
      case 1:
        this.info.classList.add('chart__info_color_green');
        break;
      case 2:
        this.info.classList.add('chart__info_color_yellow');
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
