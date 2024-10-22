const FORM_FEEDBACK_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const resetFormData = data => {
  Object.keys(data).forEach(key => {
    data[key] = '';
  });
};

const getFormData = () => {
  const data = JSON.parse(localStorage.getItem(FORM_FEEDBACK_KEY));
  if (!data) return formData;

  Object.keys(data).forEach(key => {
    formData[key] = data[key];
  });

  return formData;
};

const isFormDataIsValid = () => {
  const data = getFormData();
  return Object.values(data).every(value => value);
};

const updateFormData = feedbackForm => {
  const data = getFormData();
  Object.keys(data).forEach(key => {
    feedbackForm[key].value = data[key];
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.querySelector('.feedback-form');

  feedbackForm.addEventListener('input', event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(FORM_FEEDBACK_KEY, JSON.stringify(formData));
  });

  updateFormData(feedbackForm);

  feedbackForm.addEventListener('submit', event => {
    event.preventDefault();

    if (isFormDataIsValid()) {
      console.log(formData);
      localStorage.removeItem(FORM_FEEDBACK_KEY);
      feedbackForm.reset();
      resetFormData(formData);
    } else {
      alert('Fill please all fields');
    }
  });
});
