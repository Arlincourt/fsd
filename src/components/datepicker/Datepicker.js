import 'air-datepicker'

class Calendar {
	constructor(element) {
		this.$element = $(element)
		this.$calendar = ''
		this.$inputs = this.$element.find('.js-dropdown-input')
		this.dates = []
		const that = this
		this.options = {
				range: true,
				multipleDates: true,
				prevHtml: '<i class="datepicker-item__icon_reverse icon-arrow_forward"></i>',
				nextHtml: '<i class="icon-arrow_forward"></i>',
				navTitles: {
					days: 'MM yyyy',
      	},
				onSelect(formattedDate, date, inst) {
					that.onSelect(formattedDate, date)
				}
		}

		this.init()
	}

	init() {
		this.initCalendar()
		this.initInputsEvents()
	}

	onSelect(formattedDate, date) {
		this.$inputs.val('')
		this.dates = this.separateInputValue(formattedDate)
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
		if(this.dates.length === 2) {
			this.$inputs.each((idx, input) => {
				input.value = this.dates[idx]
			})
			this.$calendar.hide()
		}
		})
		this.$clearBtn.on('click', () => {
			this.$calendar.clear()
			this.$calendar.hide()
		})
	}

	separateInputValue(value) {
		return value.split(',')
	}

	initInputsEvents() {
		this.$inputs.on('click', () => {
			this.$calendar.show()
		})
	}
}

export default Calendar