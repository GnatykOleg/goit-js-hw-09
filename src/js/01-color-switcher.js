function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    buttonStart.setAttribute('disabled', 'disabled');
    console.log('in progress...');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.removeAttribute('disabled');
  console.log('stop progress');
  clearInterval(timerId);
});
