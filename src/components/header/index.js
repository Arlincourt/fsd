import * as $ from 'jquery';
import Header from './Header';

$(document).ready(() => {
  $('.js-header').each((idx, el) => {
    new Header(el);
  });
});
