import * as $ from 'jquery';
import { boundMethod } from 'autobind-decorator';

class Header {
  constructor(header) {
    this._header = header;
    this._btn = $(this._header).find('.js-header__burger');
    this._btn.on('click', this._handleButtonClick);
    this._headerMenu = $(this._header).find('.js-header__menu');
  }

  @boundMethod
  _handleButtonClick() {
    this._btn.toggleClass('header__burger_active');
    this._headerMenu.toggleClass('header__menu_active');
  }
}

export default Header;
