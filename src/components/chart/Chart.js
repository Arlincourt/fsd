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
    this.setText('none');
  }

  setEvent() {
    this.options.options.onHover = this.handleChartHover.bind(this);
    this.el.addEventListener('mousemove', this.handleParentMousemove.bind(this));
  }

  setDatasets() {
    const $element = $(this.el)
    this.options.data.datasets[0].backgroundColor = $element.data('colors');
    this.options.data.datasets[0].data = $element.data('voices');
    this.colors = $element.data('colors');
  }

  handleParentMousemove(evt) {
    if (evt.target.classList.contains('js-chart__canvas')) {
      return;
    }
    this.setText('none');
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
    this.setText('none');
  }

  setText(idx) {
    this.text.textContent = this.options.data.datasets[0].data[idx];
    if(idx === 'none') {
      this.text.textContent = this.allVoices;
      this.info.style.backgroundClip = '';
      this.info.style.webkitTextFillColor = '';
      this.info.style.backgroundImage = '';
      return
    }
    
    this.info.style.backgroundImage = `linear-gradient(180deg, ${this.colors[idx][0]} 0%, ${this.colors[idx][1]} 100%)`;
    this.info.style.webkitBackgroundClip = 'text';
    this.info.style.webkitTextFillColor = 'transparent';
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
