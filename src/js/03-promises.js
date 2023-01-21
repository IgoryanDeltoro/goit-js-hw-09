import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

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
  let count = 1;

  setTimeout(() => {
    setInterval(() => {
      if (amount.value >= count) {
        createPromise(count, delay.value)
          .then(({ position, delay }) => {
            Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`, {
              timeout: 5000,
            });
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
              timeout: 5000,
            });
          });
      }
      count++;
    }, step.value);
  }, delay.value);
}
