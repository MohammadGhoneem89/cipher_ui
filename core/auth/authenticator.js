class Auth {
  static loggedIn() {
    return !!sessionStorage.token;
  }

  static logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
  //  window.location.reload();
    sessionStorage.selectedIndex=0;
  }
  static lockedUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('lastRequestTime');
    sessionStorage.selectedIndex=0;
    //document.location.href ='/Locked'
  }
}

export default Auth;
