import 'air-datepicker';

class Calendar {
  constructor(element) {
    this._initOptions();
    this._init(element);
  }

  _initOptions() {
    const that = this;
    this._options = {
      range: true,
      multipleDates: true,
      prevHtml: '<i class="datepicker-component__icon_direction_reverse icon-arrow_forward"></i>',
      nextHtml: '<i class="icon-arrow_forward"></i>',
      navTitles: {
        days: 'MM yyyy',
      },
      onSelect(formattedDate, date) {
        that.onSelect(formattedDate, date);
      },
    };
  }

  _init(element) {
    this._element = element;
    this._$element = $(element).parent();
    this._$calendar = '';
    this._$inputs = this._$element.find('.js-dropdown__input');
    this._$contents = this._$element.find('.js-dropdown__content');
    this._dates = [];
    if (this._$inputs.length === 1) {
      this._options.dateFormat = 'dd M';
    }
    this._initCalendar();
  }

  _onSelect(formattedDate) {
    this._clearInputValues();
    this._dates = this._separateInputValue(formattedDate);
  }

  _initCalendar() {
    if (this._$inputs.length > 0) {
      this._$calendar = $(this._$inputs[0]).datepicker(this._options).data('datepicker');
      this._addCalendarButtons();
      this._initInputsEvents();
      this._initContentsEvents();
    } else {
      this._$calendar = $(this._element).datepicker(this._options).data('datepicker');
      this._addCalendarButtons();
    }
  }

  _addCalendarButtons() {
    this._$applyBtn = $('<button class="small-button js-calendar__button" type="button">Применить</button>');
    this._$clearBtn = $(
      '<button class="small-button small-button_hidden js-calendar__button" type="button">Очистить</button>',
    );
    const buttonsWrapper = $('<div class="datepicker--actions"></div>');
    buttonsWrapper.append(this._$clearBtn);
    buttonsWrapper.append(this._$applyBtn);
    this._$calendar.$content.append(buttonsWrapper);
    this._initButtonsEvents();
  }

  _initContentsEvents() {
    this._$contents.on('click', this._handleContentsClick.bind(this));
  }

  _handleContentsClick() {
    this._$calendar.show();
  }

  _initButtonsEvents() {
    this._$applyBtn.on('click', this._handleApplyButtonClick.bind(this));
    this._$clearBtn.on('click', this._handleClearButtonClick.bind(this));
  }

  _handleClearButtonClick() {
    this._$calendar.clear();
    this._$calendar.hide();
    this._hideClearButton();
    this._clearInputValues();
  }

  _handleApplyButtonClick() {
    const isTwoDateSelected = this._dates.length === 2;
    const isTwoFields = this._$inputs.length === 2;
    const inOneField = this._$inputs.length === 1;
    if (isTwoDateSelected && isTwoFields) {
      this._$inputs.each((idx, input) => {
        $(input).val(this._dates[idx]);
      });
      this._showClearButton();
      this._$calendar.hide();
    }

    if (inOneField && isTwoDateSelected) {
      this._$inputs.val(this._formatToFilter(this._dates));
      this._showClearButton();
      this._$calendar.hide();
    }
  }

  _clearInputValues() {
    this._$inputs.val('');
  }

  _hideClearButton() {
    this._$clearBtn.addClass('small-button_hidden');
  }

  _showClearButton() {
    this._$clearBtn.removeClass('small-button_hidden');
  }

  _separateInputValue(value) {
    return value.split(',');
  }

  _formatToFilter(arr) {
    return `${arr[0]} - ${arr[1]}`;
  }

  _initInputsEvents() {
    this._$inputs.on('click', () => {
      this._$calendar.show();
    });
  }
}

export default Calendar;
