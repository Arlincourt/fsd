import IMask from 'imask';

$(document).ready(() => {
  const maskOptions = {
    mask: Date,
    min: new Date(1900, 0, 1),
  };

  $('.js-dropdown__input_masked').each((_idx, el) => {
    IMask(el, maskOptions);
  });
});
