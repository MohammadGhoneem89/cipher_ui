import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
class Auth {
  static loggedIn() {
    return sessionStorage.token || Cookies.get('login')
  }

  static logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    Cookies.remove("login");
    Cookies.remove("token");
    sessionStorage.removeItem('firstScreen');
    sessionStorage.selectedIndex = 0;
    // browserHistory.push('/cipher/login');
    setTimeout(() => {
      document.location.href = '/cipher/login'
    }, 1500);
   
  }

  static lockedUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    Cookies.remove("login");
    sessionStorage.selectedIndex = 0;
    setTimeout(() => {
      document.location.href = '/Locked'
    }, 1500);
    // node document.location.href = '/Locked'
  }
}

export default Auth;