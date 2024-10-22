const FORM_FEEDBACK_KEY = 'feedback-form-state';

const defaultFormData = {
  email: '',
  message: '',
};

const resetFormData = () => {
  return { ...defaultFormData };
};

const getFormData = () => {
  return (
    JSON.parse(localStorage.getItem(FORM_FEEDBACK_KEY)) || {
      ...defaultFormData,
    }
  );
};

const isFormDataValid = formData => {
  return Object.values(formData).every(Boolean);
};

const updateFormData = (feedbackForm, formData) => {
  Object.keys(formData).forEach(key => {
    if (feedbackForm.elements[key]) {
      feedbackForm.elements[key].value = formData[key];
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.querySelector('.feedback-form');
  let formData = getFormData();

  updateFormData(feedbackForm, formData);

  feedbackForm.addEventListener('input', event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(FORM_FEEDBACK_KEY, JSON.stringify(formData));
  });

  feedbackForm.addEventListener('submit', event => {
    event.preventDefault();

    if (isFormDataValid(formData)) {
      console.log(formData);
      localStorage.removeItem(FORM_FEEDBACK_KEY);
      feedbackForm.reset();
      formData = resetFormData();
    } else {
      alert('Please fill in all fields');
    }
  });
});
