import * as $ from 'jquery';

class Menu {
  constructor(menu) {
    this._menu = menu;
    const expanders = $(this._menu).find('.js-menu__expander');
    expanders.each(this._addClickListenersToExpanders.bind(this));
  }

  _addClickListenersToExpanders(idx, element) {
    document.addEventListener('click', this._handleDocumentClick.bind(this));
    $(element).on('click', this._handleExpanderClick.bind(this));
  }

  _handleExpanderClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const submenu = $(evt.currentTarget).parent().find('.js-menu__submenu');
    if (submenu.hasClass('menu__submenu_opened')) {
      this._hideMenus();
      return;
    }
    this._hideMenus();
    submenu.addClass('menu__submenu_opened');
  }

  _handleDocumentClick() {
    this._hideMenus();
  }

  _hideMenus() {
    $('.js-menu__submenu').removeClass('menu__submenu_opened');
  }
}

export default Menu;
