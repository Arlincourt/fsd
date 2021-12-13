import * as $ from 'jquery';
import Menu from './Menu';

$(document).ready(() => {
  $('.js-menu').each((idx, el) => {
    new Menu(el);
  });
});
