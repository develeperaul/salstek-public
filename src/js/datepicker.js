import { Datepicker } from 'vanillajs-datepicker';
const ru = {
  ru: {
    days: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthsShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    today: 'Сегодня',
    clear: 'Очистить',
    format: 'dd.mm.yyyy',
    weekStart: 1,
    monthsTitle: 'Месяцы',
  },
};
document.addEventListener('DOMContentLoaded', function () {
  Datepicker.locales.ru = ru.ru;

  const datepickerOptions = {
    autohide: true,
    locales: 'ru',
    language: 'ru',
    format: 'yyyy/mm/dd',
    weekStart: 1,
  };

  document.querySelectorAll('[datepicker]').forEach(function (datepickerEl) {
    const dp = new Datepicker(datepickerEl, datepickerOptions);
  });
});
