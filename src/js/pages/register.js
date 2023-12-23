/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import StoriesApi from '../network/StoriesAPI';
import CheckUserAuth from './auth/check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const valid = await this._getRegistered();
        if (valid) {
          registerForm.classList.add('was-validated');
        }
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        await StoriesApi.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        window.location.replace('/auth/login.html');
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data) {
          const registerForm = document.querySelector('#registerForm');
          registerForm.classList.remove('was-validated');
          const errorMessage = error.response.data.message;

          // Check if the error message is related to the email or user
          if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('user')) {
            this._showValidationFeedback('validationCustomEmail', errorMessage);
          } else if (errorMessage.toLowerCase().includes('password')) {
            this._showValidationFeedback('validationCustomPassword', errorMessage);
          }
          return false;
        }
      }
    } else {
      return false;
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const { name, email, password } = formData;
    // Clear any existing validation feedback
    this._clearValidationFeedback();

    // check if name is empty
    if (name === '') {
      this._showValidationFeedback('validationCustomRecordName', 'name is required');
      return false;
    }

    // Check if email is empty
    if (email === '') {
      this._showValidationFeedback('validationCustomEmail', 'Email is required.');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this._showValidationFeedback('validationCustomEmail', 'Invalid email address.');
      return false;
    }

    // Check if password is empty
    if (password === '') {
      this._showValidationFeedback('validationCustomPassword', 'Password is required.');
      return false;
    }

    // Check if password is at least 8 characters long
    if (password.length < 8) {
      this._showValidationFeedback('validationCustomPassword', 'Password must be at least 8 characters long.');
      return false;
    }

    return true;
  },

  _showValidationFeedback(inputId, message) {
    const inputElement = document.querySelector(`#${inputId}`);
    inputElement.classList.add('is-invalid');
    inputElement.parentElement.invalidFeedbackMessage = message;
  },

  _clearValidationFeedback() {
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));

    const invalidFeedback = document.querySelectorAll('.invalid-feedback');
    invalidFeedback.forEach((feedback) => (feedback.parentElement.invalidFeedbackMessage = ''));
  },

};

export default Register;
