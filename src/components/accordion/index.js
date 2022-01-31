import Accordion from './Accordion';

$(() => {
  $('.js-accordion__expander').each((idx, el) => {
    new Accordion(el);
  });

  $('.form-elements__item_with_100_mb .js-accordion__expander').click();
});
