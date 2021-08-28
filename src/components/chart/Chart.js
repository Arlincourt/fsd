import { Chart as Doughnut, registerables } from 'chart.js';
Doughnut.register(...registerables);

class Chart {
  constructor(el, options) {
    this.el = el
    this.ctx = el.querySelector('.js-chart-canvas').getContext('2d');
    this._options = options
    this.init()
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