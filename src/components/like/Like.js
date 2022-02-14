class Like {
  constructor(element) {
    this.init(element);
  }
  
  init(element) {
    this.$element = $(element);
    this.$icon = this.$element.find('.js-like__icon');
    this.addClickEvent();
  }

  addClickEvent() {
    this.$element.on('click', this.handleElementClick.bind(this));
  }

  handleElementClick() {
    if (this.$element.hasClass('like_activated')) {
      this.decrementValue();
    } else {
      this.incrementValue();
    }
    this.$element.toggleClass('like_activated');
    this.$icon.toggleClass('like__icon_activated');
    this.$icon.toggleClass('icon-favorite');
    this.$icon.toggleClass('icon-favorite_border');
  }

  decrementValue() {
    const index = this.$element.html().lastIndexOf('>') + 1;
    const value = Number(this.$element.html().substr(index)) - 1;
    this.$element.html('');
    this.$element.append(this.$icon);
    this.$element.append(value);
  }

  incrementValue() {
    const index = this.$element.html().lastIndexOf('>') + 1;
    const value = Number(this.$element.html().substr(index)) + 1;
    this.$element.html('');
    this.$element.append(this.$icon);
    this.$element.append(value);
  }
}

export default Like;
