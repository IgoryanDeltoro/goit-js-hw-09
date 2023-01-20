const refs = {
  otput: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalID = 0;

/**----------------- Listening events------------------------------------- */
refs.btnStart.addEventListener('click', hendleEveOnStart);
refs.btnStop.addEventListener('click', hendleEveOnStop);

/**----------------- hendle event click on button start----------------- */
function hendleEveOnStart() {
  refs.btnStart.setAttribute('disabled', '');

  intervalID = setInterval(() => {
    refs.otput.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

/**----------------- hendle event click on button start----------------- */
function hendleEveOnStop() {
  refs.btnStart.removeAttribute('disabled');
  clearInterval(intervalID);
}

/* --------------------- creating random colors------------------------  */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
