import * as $ from 'jquery';

class RoomCard {
  constructor(element) {
    this.init(element);
  }
  
  init(element) {
    this.$gallery = $(element);
    this.$line = this.$gallery.find('.room-card__gallery-line');
    this.$actions = this.$gallery.find('.room-card__actions');
    this.$pointsContainer = this.$gallery.find('.room-card__points');
    this.$buttons = this.$gallery.find('.room-card__button');
    this.step = 0;
    this.offsetStep = 271;
    this.offset = 0;
    this.initButtonsEvents();
    this.initGalleryEvents();
    this.initPointsEvents();
    this.renderStep();
  }

  initGalleryEvents() {
    this.$gallery.on('mouseenter', () => {
      if (this.isHidden()) {
        this.$actions.removeClass('room-card__actions_hidden');
      }
    });

    this.$gallery.on('mouseleave', () => {
      if (!this.isHidden()) {
        this.$actions.addClass('room-card__actions_hidden');
      }
    });
  }

  isHidden() {
    return this.$actions.hasClass('room-card__actions_hidden');
  }

  renderStep() {
    this.renderActivePoint();
    if (this.step === 0) {
      this.offset = 0;
    } else {
      this.offset = this.offsetStep * this.step;
    }

    this.$line.css('transform', `translateX(${`${-this.offset}px`})`);
  }

  renderActivePoint() {
    this.$pointsContainer.children().each((idx, point) => {
      point.classList.remove('room-card__point_background_filled');
    });
    this.$pointsContainer.children()[this.step].classList.add('room-card__point_background_filled');
  }

  initPointsEvents() {
    this.$pointsContainer.on('click', (evt) => {
      if (evt.target.dataset.id) {
        this.step = +evt.target.dataset.id;
        this.renderStep();
      }
    });
  }

  initButtonsEvents() {
    if (this.$buttons) {
      this.$buttons.on('click', (evt) => {
        if (evt.target.classList.contains('room-card__button_direction_reversed')) {
          this.next(evt);
        } else {
          this.prev(evt);
        }
      });
    }
  }

  next() {
    if (this.step === 3) {
      this.step = 0;
    } else {
      this.step += 1;
    }

    this.renderStep();
  }

  prev() {
    if (this.step === 0) {
      this.step = 3;
    } else {
      this.step -= 1;
    }

    this.renderStep();
  }
}

export default RoomCard;
