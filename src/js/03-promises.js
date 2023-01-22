import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

let delayInp = null;
let stepInp = null;
let amountInp = null;
let count = 1;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay }); // Fulfill
    } else {
      reject({ position, delay }); // Reject
    }
  });
}

refs.form.addEventListener('submit', hendleEventOnSubmit);

function hendleEventOnSubmit(eve) {
  eve.preventDefault();

  const { delay, step, amount } = eve.currentTarget.elements;
  delayInp = +delay.value;
  stepInp = +step.value;
  amountInp = +amount.value;

  let intervalID = 0;

  setTimeout(() => {
    intervalID = setInterval(() => {
      if (amountInp >= count) {
        createPromise(count, delayInp)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
              timeout: 5000,
            });
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
              timeout: 5000,
            });
          })
          .finally(() => {
            if (amountInp < count) {
              setIntervalID(intervalID);
            }
          });
      }
      count++;
    }, stepInp);
  }, delayInp);

  eve.currentTarget.reset();
}

function setIntervalID(intervalID) {
  clearInterval(intervalID);
}
