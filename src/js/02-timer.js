import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDateTimePicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerId = null;

buttonStart.disabled = true;

let targetDate = null;

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      buttonStart.disabled = true;
      Notify.failure('Please choose a date in the future', { timeout: 2000 });
      return;
    }
    buttonStart.disabled = false;
    targetDate = selectedDates[0];
  },
};

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  inputDateTimePicker.disabled = true;

  timerId = setInterval(() => {
    const delta = targetDate - Date.now();
    const data = convertMs(delta);
    console.log(data);

    dataDays.textContent = addLeadingZero(data.days);
    dataHours.textContent = addLeadingZero(data.hours);
    dataMinutes.textContent = addLeadingZero(data.minutes);
    dataSeconds.textContent = addLeadingZero(data.seconds);

    if (delta <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);
});

flatpickr(inputDateTimePicker, options);
