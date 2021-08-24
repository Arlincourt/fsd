import Header from './Header'
import * as $ from 'jquery'

$(document).ready(function() {
	$('.js-header').each(function(idx, el) {
		new Header(el)
	})
});