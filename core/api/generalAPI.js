import 'whatwg-fetch'
import Cookies from 'js-cookie';
import {  browserHistory} from 'react-router'
class generalAPI{



  static getData(fetchURL,data) {
    let header;
    if(sessionStorage.token){
      header= new Headers({
        'Content-Type': 'application/json',
        'token':  Cookies.get('token')
      })
    } else
    {
      header= new Headers({
        'Content-Type': 'application/json'
      })
    }



    const request = new Request(fetchURL, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: header,
      body: JSON.stringify({...data})
    });


    return fetch(request).then(response => {
      if (fetchURL.includes('/login') && response.status === 200) {
        Cookies.set('login', 'yes');
      }

      if(response.status===403) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('lastRequestTime');
        sessionStorage.selectedIndex=0;
        Cookies.remove("login");
        Cookies.remove("token");
        setTimeout(() => {
          browserHistory.push('/cipher/login')
        }, 300);
      }

      return response.json();
    }).catch(error => {
      let errorJson={
        "responseMessage":{
          "action":"Connection Error",
          "data":{
            "message":{
              "status":"ERROR",
              "errorDescription":"Error connecting to server please check your internet connection!!",
              "routeTo":"success",
              "displayToUser":true
            }
          }
        }

      };

      return errorJson;
    });

  }


}

export default generalAPI;