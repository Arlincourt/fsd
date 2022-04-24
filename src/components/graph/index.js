import Graph from './graph';

$(() => {
  $('.js-graph').each((idx, el) => new Graph(el));
});
