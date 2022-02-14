import Datepicker from './Calendar';

$(document).ready(() => {
  $('.js-calendar').each((idx, el) => new Datepicker(el));
});
