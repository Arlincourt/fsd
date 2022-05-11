class Accordion {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    this._$expander = $(element);
    this._$list = this._$expander.siblings('.js-accordion__list');
    this._$icon = this._$expander.find('.js-accordion__icon');
    this._addClickEvent();
  }

  _addClickEvent() {
    this._$expander.on('click', this._handleExpanderClick.bind(this));
  }

  _handleExpanderClick() {
    this._$list.toggleClass('accordion__list_active');
    this._$icon.toggleClass('accordion__icon_active');
  }
}

export default Accordion;
