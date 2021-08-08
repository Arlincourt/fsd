import Datepicker from './Datepicker'

$(document).ready(function() {
	$('.js-datepicker-item').each(function(idx, el) {
		new Datepicker(el)
	})
});