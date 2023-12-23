import Utils from '../../utils/utils';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  checkLoginState() {
    const userToken = Utils.getUserToken('token');
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    }
    return isUserSignedIn;
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');

    if (!userLoginState) {
      loginMenu?.classList.add('d-block');
      userLoggedMenu?.classList.add('d-none');

      loginMenu?.classList.remove('d-none');
      userLoggedMenu?.classList.remove('d-block');

      return;
    }

    loginMenu?.classList.add('d-none');
    userLoggedMenu?.classList.add('d-block');

    loginMenu?.classList.remove('d-block');
    userLoggedMenu?.classList.remove('d-none');
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
