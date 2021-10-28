import * as $ from 'jquery';


class RoomCard {
	constructor(element) {
		this.$gallery = $(element);
		this.$line = this.$gallery.find('.room-card__gallery-line');
		this.$pointsContainer = this.$gallery.find('.room-card__points');
		this.$buttons = this.$gallery.find('.room-card__button');
		this._step = 0;
		this._offsetStep = 271;
		this._offset = 0;

		this.init();
	}

	init() {
		this.initButtonsEvents();
		this.initPointsEvents();
		this.renderStep();
	}

	renderStep() {
		this.renderActivePoint();
		if(this._step === 0) {
			this._offset = 0;
		} else {
			this._offset = this._offsetStep * this._step;
		}

		this.$line.css('transform', `translateX(${-this._offset + 'px'})`);
	}

	renderActivePoint() {
		this.$pointsContainer.children().each((idx, point) => {
			point.classList.remove('room-card__point_background_filled');
		})
		this.$pointsContainer.children()[this._step].classList.add('room-card__point_background_filled');
	}

	initPointsEvents() {
		this.$pointsContainer.on('click', (evt) => {
			if(evt.target.dataset.id) {
				this._step = +evt.target.dataset.id;
				this.renderStep();
			}
		})
	}

	initButtonsEvents() {
		if(this.$buttons) {
			this.$buttons.on('click', (evt) => {
				if(evt.target.classList.contains('room-card__button_reversed')) {
					this.next(evt);
				} else {
					this.prev(evt);
				}
			})
		}
	}

	next() {
		if(this._step === 3) {
			this._step = 0;
		} else {
			this._step++;
		}

		this.renderStep();
	}

	prev() {
		if(this._step === 0) {
			this._step = 3;
		} else {
			this._step--;
		}
		
		this.renderStep();
	}
}

export default RoomCard