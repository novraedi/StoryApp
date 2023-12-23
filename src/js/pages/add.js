import StoriesApi from '../network/StoriesAPI';
import CheckUserAuth from './auth/check-user-auth';

const Add = {
  init() {
    this._isUserSignedIn = CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      addBookForm.classList.add('was-validated');
      await this._sendPost();
    });
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        if (this._isUserSignedIn) {
          const response = await StoriesApi.addNewStory(formData);
          window.alert(response.data.message);
        } else {
          const response = await StoriesApi.addNewStoryWithGuest(formData);
          window.alert(response.data.message);
        }
        window.location.replace('/');
      } catch (error) {
        window.alert(error.response.data.message);
      }
    }
  },

  _getFormData() {
    const descriptionInput = document.querySelector('#validationCustomDescription');
    const imageInput = document.querySelector('#validationCustomImage');

    return {
      description: descriptionInput.value,
      photo: imageInput.files[0],
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
