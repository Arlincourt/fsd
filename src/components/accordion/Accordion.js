class Accordion {
  constructor(element) {
    this.$element = $(element);
    this.$list = this.$element.siblings('.js-accordion-list');
    this.$icon = this.$element.find('.js-accordion-icon');
    this.init();
  }

  init() {
    this.addClickEvent();
  }
  
  addClickEvent() {
    this.$element.on('click', () => {
      if (this.$list.hasClass('accordion__list_active') && this.$icon.hasClass('accordion__icon_active')) {
        this.$icon.removeClass('accordion__icon_active');
        this.$list.removeClass('accordion__list_active');
      } else {
        this.$icon.addClass('accordion__icon_active');
        this.$list.addClass('accordion__list_active');
      }
    });
  }
}

export default Accordion;
