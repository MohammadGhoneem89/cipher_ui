import Cookies from 'js-cookie';

class Auth {
  static loggedIn() {
    // return !!sessionStorage.token;
    return (!!sessionStorage.getItem('token') || !!Cookies.get('login'))
  }

  static logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    Cookies.remove("login");
    Cookies.remove("token");
    sessionStorage.removeItem('firstScreen');
    sessionStorage.selectedIndex = 0;
    // window.location.reload();
    sessionStorage.selectedIndex = 0;
    document.location.href ='/cipher/login'
  }

  static lockedUser() {
    sessionStorage.removeItem('token');
    Cookies.remove("login");
    sessionStorage.removeItem('lastRequestTime');

    Cookies.remove("login");
    sessionStorage.selectedIndex = 0;

    // node document.location.href = '/Locked'
  }
}

export default Auth;