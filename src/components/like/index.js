import Like from './Like'

$(() => {
  $('.like').each((idx, el) => {
    new Like(el)
  })

  $('.form-elements__item_with_100_mb .js-accordion-expander').click()
})