import { Chart as Doughnut, registerables } from 'chart.js';
Doughnut.register(...registerables);

class Chart {
  constructor(el, options) {
    this.el = el
    this.ctx = el.querySelector('.js-chart-canvas').getContext('2d');
    this.text = el.querySelector('.js-chart-numbers')
    this._options = options
    this.setEvent()
    this.init()
  }

  setEvent() {
    this._options.options.onHover = this.onChartHover.bind(this)
  }

  onChartHover(evt, activeItem) {
    if(activeItem.length === 1) {
      const idx = activeItem[0].index
      this.$chart.data.datasets[0].hoverBorderColor = this._options.data.datasets[0].backgroundColor[idx]
      this.setText(idx)
      this.$chart.update()
    }
  }
  
  setText(idx) {
    this.text.textContent = this._options.data.datasets[0].data[idx]
    this.text.className = ''
    this.text.classList.add('chart__numbers')
    this.text.classList.add('js-chart-numbers')
    switch(idx) {
      case 0:
        this.text.classList.add('chart__numbers_color_purple')
        break
      case 1:
        this.text.classList.add('chart__numbers_color_green')
        break
      case 2:
        this.text.classList.add('chart__numbers_color_yellow')
        break
    }
  }

  init() {
    this._options.data.datasets[0].backgroundColor = this._options.data.datasets[0].backgroundColor.map((colorsArr) => {
      let canvasColor = this.ctx.createLinearGradient(0,0, 0,60)
      colorsArr.forEach((color, idx) => {
        canvasColor.addColorStop(idx, color)
      });
      return canvasColor
    })
    this.$chart = new Doughnut(this.ctx, this._options);
  }
}

export default Chart