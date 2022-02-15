class Accordion {
  constructor(element) {
    this.init(element);
  }

  init(element) {
    this.$expander = $(element);
    this.$list = this.$expander.siblings('.js-accordion__list');
    this.$icon = this.$expander.find('.js-accordion__icon');
    this.addClickEvent();
  }

  addClickEvent() {
    this.$expander.on('click', this.handleExpanderClick.bind(this));
  }

  handleExpanderClick() {
    this.$list.toggleClass('accordion__list_active');
    this.$icon.toggleClass('accordion__icon_active');
  }
}

export default Accordion;
