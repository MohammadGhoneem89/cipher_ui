import Cookies from 'js-cookie';

class Auth {
  static loggedIn() {
    // return !!sessionStorage.token;
    return !!Cookies.get('login');
  }

  static logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    window.location.reload();
    Cookies.remove("login");
    Cookies.remove("token");
    sessionStorage.selectedIndex=0;
  }
  static lockedUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    Cookies.remove("login");
    sessionStorage.selectedIndex=0;
    // document.location.href ='/Locked'
  }
}

export default Auth;