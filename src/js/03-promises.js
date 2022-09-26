
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form')
}
refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: {
      delay,
      step,
      amount,
    }
  } = event.target;

  let promiseDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, promiseDelay).then(onPromiseSuccess).catch(onPromiseError)
    promiseDelay += Number(step.value);
  }
//
  // event.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

function onPromiseSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}




// далі не перевіряйте.
// function createPromise(position, delay) {
// return new Promise((resolve, reject) =>
//  {    setTimeout(() => {
// const shouldResolve = Math.random() > 0.3;


// // function createPromise(position, delay) {
// //   const shouldResolve = Math.random() > 0.3;
// //   if (shouldResolve) {
// //     return new Promise(resolve => {
// //     setTimeout(() => resolve(position), delay);
// //   });
// //     console.log("OK");
// //     console.log(`position: ${position}, delay:${delay}`);
// //     // resolve("Success! Value passed to resolve function");
// //   } else {
// //     console.log("ERROR")
// //     console.log(`position: ${position}, delay:${delay}`);
// //     // reject("Error! Error passed to reject function");
// //   }
// // }

// let timerId = null;
// let amountId = null;
//    let position = null;

// const formEl = document.querySelector(".form");
// formEl.addEventListener("submit", formElSubmit);

// function formElSubmit(event) {
//   event.preventDefault();
//   const { elements: { delay, step, amount } } = event.currentTarget;
//   console.log(`delay: ${delay.value}, step: ${step.value} , amount: ${amount.value}`);
//   amountId = amount.value;
//   // console.log(amountId)
//   timerId = setInterval(() => {

//     if (amountId === 0) {
//       position = amountId;
//       clearInterval(timerId);
//       window.alert("Bang bang!");
   
// 			return;
// 		}
//     amountId -= 1;
//     console.log(amountId)
//   createPromise(`${position+=1}`,`${delay.value}`);
//   }, delay.value);
     

//   // event.currentTarget.reset();
// }