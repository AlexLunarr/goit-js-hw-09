import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
let timerId = null;
let dateNow;
let dateFuture = null;
let delta;


const refs = {
	startBtn: document.querySelector('button[data-start]'),
	days: document.querySelector('.value[data-days]'),
	hours: document.querySelector('.value[data-hours]'),
	minutes: document.querySelector('.value[data-minutes]'),
	seconds: document.querySelector('.value[data-seconds]'),
};

let selectedDatetime = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
	onClose(selectedDates) {
		dateFuture = selectedDates[0];
		console.log(dateFuture);
		dataSimile(dateFuture);
		refs.startBtn.addEventListener("click", startClick)
  },
};

flatpickr(document.querySelector("#datetime-picker"), options);

function dataSimile(a) {

	if (dateNow >= a) {
		window.alert("Please choose a date in the future");
		return;
	} 
	refs.startBtn.disabled = false;
};

function startClick() {
	refs.startBtn.disabled = true;
	document.querySelector("#datetime-picker").disabled = true;
	
	timerId = setInterval(() => {
		// dateFuture;
		dateNow = new Date();
		if (dateFuture - dateNow < 0) {
			clearInterval(timerId);
			window.alert("Bang bang! Please choose another date)");
			return;
		}
		delta = (dateFuture - dateNow);
		// console.log(delta);
		// const { days, hours, minutes, seconds } = convertMs(delta);
		// console.log(` ${days}, ${hours}, ${minutes}, ${seconds}`);
		OutputCountdown(convertMs(delta));
	}, 1000);
	
};

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
};

function OutputCountdown({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}