import * as $ from 'jquery';

class Header {
  constructor(header) {
    this.header = header;
    this.btn = $(this.header).find('.js-header-burger');
    this.btn.on('click', this.onButtonClick.bind(this));
    this.headerMenu = $(this.header).find('.js-header-menu');
  }

  onButtonClick(e) {
    this.btn.toggleClass('header__burger_active');
    this.headerMenu.toggleClass('header__menu_active');
  }
}

export default Header;
