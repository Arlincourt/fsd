import * as $ from 'jquery';

class RoomCard {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    this._$gallery = $(element);
    this._$line = this._$gallery.find('.room-card__gallery-line');
    this._$actions = this._$gallery.find('.room-card__actions');
    this._$pointsContainer = this._$gallery.find('.room-card__points');
    this._$buttons = this._$gallery.find('.room-card__button');
    this._step = 0;
    this._offsetStep = 271;
    this._offset = 0;
    this._initButtonsEvents();
    this._initGalleryEvents();
    this._initPointsEvents();
    this._renderStep();
  }

  _initGalleryEvents() {
    this._$gallery.on('mouseenter', this._handleGalleryEnter.bind(this));

    this._$gallery.on('mouseleave', this._handleGalleryLeave.bind(this));
  }

  _handleGalleryEnter() {
    if (this._isHidden()) {
      this._$actions.removeClass('room-card__actions_hidden');
    }
  }

  _handleGalleryLeave() {
    if (!this._isHidden()) {
      this._$actions.addClass('room-card__actions_hidden');
    }
  }

  _isHidden() {
    return this._$actions.hasClass('room-card__actions_hidden');
  }

  _renderStep() {
    this._renderActivePoint();
    if (this._step === 0) {
      this._offset = 0;
    } else {
      this._offset = this._offsetStep * this._step;
    }

    this._$line.css('transform', `translateX(${`${-this._offset}px`})`);
  }

  _renderActivePoint() {
    this._$pointsContainer.children().each((idx, point) => {
      point.classList.remove('room-card__point_background_filled');
    });
    this._$pointsContainer.children()[this._step].classList.add('room-card__point_background_filled');
  }

  _initPointsEvents() {
    this._$pointsContainer.on('click', this._handlePointsContainerClick.bind(this));
  }

  _handlePointsContainerClick(evt) {
    if (evt.target.dataset.id) {
      this._step = +evt.target.dataset.id;
      this._renderStep();
    }
  }

  _handleButtonsContainerClick(evt) {
    if (evt.target.classList.contains('room-card__button_direction_reversed')) {
      this._next(evt);
    } else {
      this._prev(evt);
    }
  }

  _initButtonsEvents() {
    if (this._$buttons) {
      this._$buttons.on('click', this._handleButtonsContainerClick.bind(this));
    }
  }

  _next() {
    if (this._step === 3) {
      this._step = 0;
    } else {
      this._step += 1;
    }

    this._renderStep();
  }

  _prev() {
    if (this._step === 0) {
      this._step = 3;
    } else {
      this._step -= 1;
    }

    this._renderStep();
  }
}

export default RoomCard;
