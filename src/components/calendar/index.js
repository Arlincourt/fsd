import Datepicker from './Calendar'

$(document).ready(function() {
	$('.js-calendar').each(function(idx, el) {
		new Datepicker(el)
	})
});