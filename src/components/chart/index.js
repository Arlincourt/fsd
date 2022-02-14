import Chart from './Chart';

$(() => {
  $('.js-chart').each((idx, el) => new Chart(el));
});
