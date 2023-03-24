import throttle from 'lodash.throttle';
import '../css/03-feedback.css';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(formInput, 1000));

function formInput() {
  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });

  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

window.addEventListener('load', () => {
  const feedbackFormState = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (feedbackFormState) {
    emailInput.value = feedbackFormState.email;
    messageInput.value = feedbackFormState.message;
  } else {
    emailInput.value = '';
    messageInput.value = '';
  }
  return feedbackFormState;
});
