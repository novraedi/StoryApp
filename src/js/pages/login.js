/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import StoriesApi from '../network/StoriesAPI';
import Utils from '../utils/utils';
import CheckUserAuth from './auth/check-user-auth';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const valid = await this._getLogged();
        if (valid) {
          loginForm.classList.add('was-validated');
        }
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        const response = await StoriesApi.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken('token', response.data.loginResult.token);
        window.location.replace('/');
      } catch (error) {
        // window.alert(error.response.data.message)

        if (error.response && error.response.data) {
          const loginForm = document.querySelector('#loginForm');
          loginForm.classList.remove('was-validated');
          const errorMessage = error.response.data.message;

          // Check if the error message is related to the email or user
          if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('user')) {
            this._showValidationFeedback('validationCustomRecordEmail', errorMessage);
          } else if (errorMessage.toLowerCase().includes('password')) {
            this._showValidationFeedback('validationCustomPassword', errorMessage);
          }
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const { email, password } = formData;
    // Clear any existing validation feedback
    this._clearValidationFeedback();

    // Check if email is empty
    if (email === '') {
      this._showValidationFeedback('validationCustomRecordEmail', 'Email is required.');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this._showValidationFeedback('validationCustomRecordEmail', 'Invalid email address.');
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
    const inputElementContainer = document.querySelector(`#${inputId}Container`);
    const inputElementChild = document.querySelector(`#${inputId}`);
    inputElementChild.classList.add('is-invalid');
    inputElementContainer.invalidFeedbackMessage = message;
  },

  _clearValidationFeedback() {
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));

    const invalidFeedback = document.querySelectorAll('.invalid-feedback');
    invalidFeedback.forEach((feedback) => (feedback.parentElement.invalidFeedbackMessage = ''));
  },

};

export default Login;
