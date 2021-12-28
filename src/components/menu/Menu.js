import * as $ from 'jquery';

class Menu {
  constructor(menu) {
    this.menu = menu;
    const expanders = $(this.menu).find('.js-menu-expander');
    expanders.each(this.addClickListenersToExpanders.bind(this));
  }

  addClickListenersToExpanders(idx, element) {
    document.addEventListener('click', this.onDocumentClick.bind(this));
    $(element).on('click', this.onClickExpander.bind(this));
  }

  onClickExpander(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const submenu = $(evt.currentTarget).parent().find('.js-submenu');
    if (submenu.hasClass('menu__submenu_opened')) {
      this.hideMenus();
      return;
    }
    this.hideMenus();
    submenu.addClass('menu__submenu_opened');
  }

  onDocumentClick() {
    this.hideMenus();
  }

  hideMenus() {
    $('.js-submenu').removeClass('menu__submenu_opened');
  }
}

export default Menu;
