import 'air-datepicker'

class Calendar {
	constructor(element) {
		this.$element = $(element)
		this.$calendar = ''
		this.$inputs = this.$element.find('.js-dropdown-input')
		this.options = {
				range: true,
				multipleDates: true,
				prevHtml: '<i class="datepicker-item__icon_reverse icon-arrow_forward"></i>',
				nextHtml: '<i class="icon-arrow_forward"></i>',
				navTitles: {
					days: 'MM yyyy',
      	},
		}

		this.init()
	}

	init() {
		this.initCalendar()
		this.initInputsEvents()
	}

	initCalendar() {
		this.$calendar = $(this.$inputs[0]).datepicker(this.options).data('datepicker')
		this.addCalendarButtons()
	}

	addCalendarButtons() {
		this.$applyBtn = $('<button class="btn_transparent js-calendar-button" type="button">Применить</button>') 
		this.$clearBtn = $('<button class="btn_transparent js-calendar-button" type="button">Очистить</button>') 
		const buttonsWrapper = $('<div class="datepicker--actions"></div>')
		buttonsWrapper.append(this.$clearBtn)
		buttonsWrapper.append(this.$applyBtn)
		this.$calendar.$content.append(buttonsWrapper)
		this.initCalendarEvents()
	}

	initCalendarEvents() {
		this.initButtonsEvents()
	}

	initButtonsEvents() {
		this.$applyBtn.on('click', () => {
			
		})
		this.$clearBtn.on('click', () => {
			this.$calendar.clear()
			this.$calendar.hide()
		})
	}

	separateInputValue() {
		
	}

	initInputsEvents() {
		this.$inputs.on('click', () => {
			this.$calendar.show()
		})
	}
}

export default Calendar