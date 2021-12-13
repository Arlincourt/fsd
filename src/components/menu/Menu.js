import * as $ from 'jquery';

class Menu {
  constructor(menu) {
    this.menu = menu;
    const expanders = $(this.menu).find('.js-menu-expander');
    expanders.each(this.addClickListenersToExpanders.bind(this));
  }

  addClickListenersToExpanders(idx, element) {
    $(element).on('click', this.onClickExpander.bind(this));
  }

  onClickExpander(e) {
    const submenu = $(e.currentTarget).parent().find('.js-submenu');
    submenu.toggleClass('menu__submenu_opened');
  }
}

export default Menu;
