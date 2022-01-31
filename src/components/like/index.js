import Like from './Like';

$(() => {
  $('.like').each((idx, el) => {
    new Like(el);
  });
});
