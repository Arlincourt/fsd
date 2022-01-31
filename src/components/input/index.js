import * as $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';

$(document).ready(() => {
  $('.js-input__masked').mask('99.99.9999');
});
