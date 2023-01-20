import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  outDays: document.querySelector('[data-days]'),
  outHours: document.querySelector('[data-hours]'),
  outMinutes: document.querySelector('[data-minutes]'),
  outSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validDateCheck(selectedDates[0]);
  },
};

/* ---------------- the library of flatpickr---------- */
flatpickr('#datetime-picker', options);

/* ------- disabled the start button until the correct date is selected------ */
setAttributeOnTag();

/*--------------------checking the selected valid date -------------------- */
function validDateCheck(date) {
  if (options.defaultDate.getTime() > date.getTime()) {
    Notify.failure('Please choose a date in the future', {
      timeout: 5000,
    });
    return;
  }

  refs.btnStart.removeAttribute('disabled');
  refs.btnStart.addEventListener('click', () => hendleEventClickOnStart(date));
}

/* --------- hendle event click on start button --------------------- */
function hendleEventClickOnStart(unix) {
  setAttributeOnTag();

  setInterval(() => {
    const getUnixDate = Date.now();
    const subtractionValue = unix.getTime() - getUnixDate;
    const { days, hours, minutes, seconds } = convertMs(subtractionValue);
    refs.outDays.textContent = addLeadingZero(days);
    refs.outHours.textContent = addLeadingZero(hours);
    refs.outMinutes.textContent = addLeadingZero(minutes);
    refs.outSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

/*---------------------seting atribut disabled ------------------------*/
function setAttributeOnTag() {
  refs.btnStart.setAttribute('disabled', '');
}
/* ---------------------------- adding zero to string---------------- */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/* ------------processing and transformation date -----------*/
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
