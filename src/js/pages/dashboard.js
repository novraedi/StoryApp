import StoriesApi from '../network/StoriesAPI';
import CheckUserAuth from './auth/check-user-auth';

const Dashboard = {
  async init() {
    this._isUserSignedIn = CheckUserAuth.checkLoginState();
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    if (!this._isUserSignedIn) {
      const guestText = document.querySelector('guest-text h1');
      guestText.classList.remove('d-none');
      return;
    }
    const fetchBooks = await StoriesApi.getAllStories();
    this._userBooks = fetchBooks.data.listStory;
    this._populateBooksDataToCard(this._userBooks);
  },

  _initialListener() {
    const bookDetailModal = document.getElementById('bookDetailModal');
    bookDetailModal.addEventListener('show.bs.modal', async (event) => {
      const button = event.relatedTarget;
      const dataBook = await StoriesApi.getDetailStories(button.dataset.recordId);
      console.log(dataBook);

      this._populateBooksDataToModal(dataBook.data.story);
    });
  },

  _populateBooksDataToCard(booksData) {
    if (!(typeof booksData === 'object')) {
      throw new Error(`Parameter booksData should be an object. The value is ${booksData}`);
    }

    if (!Array.isArray(booksData)) {
      throw new Error(`Parameter booksData should be an array. The value is ${booksData}`);
    }

    document.querySelector('card-list').setAttribute('cardArray', JSON.stringify(booksData));
  },

  _populateBooksDataToModal(booksData) {
    if (!(typeof booksData === 'object')) {
      throw new Error(`Parameter booksData should be an object. The value is ${booksData}`);
    }

    const imgDetailBook = document.querySelector('#imgDetailBook');
    const nameDetailBook = document.querySelector('#nameDetailBook');
    const dateDetailBook = document.querySelector('#dateDetailBook');
    const descriptionDetailBook = document.querySelector('#descriptionDetailBook');

    imgDetailBook.setAttribute('src', booksData.photoUrl);
    imgDetailBook.setAttribute('alt', booksData.name);
    nameDetailBook.innerText = booksData.name;

    const options = {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    };
    const language = new URL(window.location.href).searchParams.get('lang') || 'en';
    dateDetailBook.innerText = new Date(booksData.createdAt).toLocaleDateString(language, options);
    descriptionDetailBook.innerText = booksData.description;
  },
};

export default Dashboard;
