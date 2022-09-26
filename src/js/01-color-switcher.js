
const bodyEl = document.querySelector("body");
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener("click", startClick);
stopBtn.addEventListener("click", stopClick);

let timerId = null;

function startClick() {
	console.log("Button was clicked");
	this.disabled = true;
	timerId = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
	
};
function stopClick() {
	clearInterval(timerId);
	startBtn.disabled = false;
	
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}