import Accordion from './Accordion';

$(() => {
  $('.js-accordion__expander').each((idx, el) => {
    new Accordion(el);
  });
});
