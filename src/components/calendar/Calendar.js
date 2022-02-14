import 'air-datepicker';

class Calendar {
  constructor(element) {
    this.initOptions();
    this.init(element);
  }

  initOptions() {
    const that = this;
    this.options = {
      range: true,
      multipleDates: true,
      prevHtml: '<i class="datepicker-item__icon_direction_reverse icon-arrow_forward"></i>',
      nextHtml: '<i class="icon-arrow_forward"></i>',
      navTitles: {
        days: 'MM yyyy',
      },
      onSelect(formattedDate, date) {
        that.onSelect(formattedDate, date);
      },
    };

    if (this.$inputs.length === 1) {
      this.options.dateFormat = 'dd M';
    }
  }

  init() {
    this.element = element;
    this.$element = $(element).parent();
    this.$calendar = '';
    this.$inputs = this.$element.find('.js-dropdown__input');
    this.$contents = this.$element.find('.js-dropdown__content');
    this.dates = [];
    this.initCalendar();
  }

  onSelect(formattedDate) {
    this.clearInputValues();
    this.dates = this.separateInputValue(formattedDate);
  }

  initCalendar() {
    if (this.$inputs.length > 0) {
      this.$calendar = $(this.$inputs[0]).datepicker(this.options).data('datepicker');
      this.addCalendarButtons();
      this.initInputsEvents();
      this.initContentsEvents();
    } else {
      this.$calendar = $(this.element).datepicker(this.options).data('datepicker');
      this.addCalendarButtons();
    }
  }

  addCalendarButtons() {
    this.$applyBtn = $('<button class="small-button js-calendar__button" type="button">Применить</button>');
    this.$clearBtn = $(
      '<button class="small-button small-button_hidden js-calendar__button" type="button">Очистить</button>',
    );
    const buttonsWrapper = $('<div class="datepicker--actions"></div>');
    buttonsWrapper.append(this.$clearBtn);
    buttonsWrapper.append(this.$applyBtn);
    this.$calendar.$content.append(buttonsWrapper);
    this.initButtonsEvents();
  }

  initContentsEvents() {
    this.$contents.on('click', () => {
      this.$calendar.show();
    });
  }

  initButtonsEvents() {
    this.$applyBtn.on('click', () => {
      if (this.dates.length === 2 && this.$inputs.length === 2) {
        this.$inputs.each((idx, input) => {
          $(input).val(this.dates[idx]);
        });
        this.showClearButton();
        this.$calendar.hide();
      }
      if (this.$inputs.length === 1 && this.dates.length === 2) {
        this.$inputs.val(this.formatToFilter(this.dates));
        this.showClearButton();
        this.$calendar.hide();
      }
    });
    this.$clearBtn.on('click', () => {
      this.$calendar.clear();
      this.$calendar.hide();
      this.hideClearButton();
      this.clearInputValues();
    });
  }

  clearInputValues() {
    this.$inputs.val('');
  }

  hideClearButton() {
    this.$clearBtn.addClass('small-button_hidden');
  }

  showClearButton() {
    this.$clearBtn.removeClass('small-button_hidden');
  }

  separateInputValue(value) {
    return value.split(',');
  }

  formatToFilter(arr) {
    return `${arr[0]} - ${arr[1]}`;
  }

  initInputsEvents() {
    this.$inputs.on('click', () => {
      this.$calendar.show();
    });
  }
}

export default Calendar;
