class Like {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    this._$element = $(element);
    this._$icon = this._$element.find('.js-like__icon');
    this._addClickEvent();
  }

  _addClickEvent() {
    this._$element.on('click', this._handleElementClick.bind(this));
  }

  _handleElementClick() {
    if (this._$element.hasClass('like_activated')) {
      this._decrementValue();
    } else {
      this._incrementValue();
    }
    this._$element.toggleClass('like_activated');
    this._$icon.toggleClass('like__icon_activated');
    this._$icon.toggleClass('icon-favorite');
    this._$icon.toggleClass('icon-favorite_border');
  }

  _decrementValue() {
    const index = this._$element.html().lastIndexOf('>') + 1;
    const value = Number(this._$element.html().substr(index)) - 1;
    this._$element.html('');
    this._$element.append(this._$icon);
    this._$element.append(value);
  }

  _incrementValue() {
    const index = this._$element.html().lastIndexOf('>') + 1;
    const value = Number(this._$element.html().substr(index)) + 1;
    this._$element.html('');
    this._$element.append(this._$icon);
    this._$element.append(value);
  }
}

export default Like;
