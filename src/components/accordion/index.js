import Accordion from './Accordion';

$(() => {
  $('.js-accordion-expander').each((idx, el) => {
    new Accordion(el);
  });

  $('.form-elements__item_with_100_mb .js-accordion-expander').click();
});
