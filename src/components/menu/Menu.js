import * as $ from 'jquery';

class Menu {
  constructor(menu) {
    this.menu = menu;
    const expanders = $(this.menu).find('.js-menu__expander');
    expanders.each(this.addClickListenersToExpanders.bind(this));
  }

  addClickListenersToExpanders(idx, element) {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    $(element).on('click', this.handleExpanderClick.bind(this));
  }

  handleExpanderClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const submenu = $(evt.currentTarget).parent().find('.js-menu__submenu');
    if (submenu.hasClass('menu__submenu_opened')) {
      this.hideMenus();
      return;
    }
    this.hideMenus();
    submenu.addClass('menu__submenu_opened');
  }

  handleDocumentClick() {
    this.hideMenus();
  }

  hideMenus() {
    $('.js-menu__submenu').removeClass('menu__submenu_opened');
  }
}

export default Menu;
