import 'whatwg-fetch'
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router'
import backOffices from '../../applications/backOffices';
let baseUrl = backOffices.baseUrl;
var lasterrorreporttime = 0;
const config = require('../../config.js')

var errorLog = []
class generalAPI {
  static getData(fetchURL, data, retryCount = 0) {
    let header;
    if (sessionStorage.token) {
      header = new Headers({
        'Content-Type': 'application/json',
        'token': sessionStorage.token
      })
    } else {
      header = new Headers({
        'Content-Type': 'application/json'
      })
    }



    return new Promise(async (resolve, reject) => {
      try {
        let dataRecv = {}
        for (let i = 0; i <= config.default.retryCount; i++) {
          console.log(fetchURL, "RetrySeek: ", i)
          const request = new Request(fetchURL, {
            method: 'POST',
            mode: "cors",
            credentials: "include",
            headers: header,
            body: JSON.stringify({ ...data })
          });

          dataRecv = await fetch(request);

          if (dataRecv.status == 200) {
            break;
          }
        }
        if (dataRecv.status == 200 || dataRecv.status == 429 || dataRecv.status == 401 || dataRecv.status == 403 || dataRecv.status == 201) {
          let jsonData = await dataRecv.json().then((json) => {
            if (dataRecv.status === 201) {
              setTimeout(() => {
                browserHistory.push('/PermissionAdd/' + json.uri)
              }, 300);
            }
            return json;
          });
          dataRecv.data = jsonData;
          resolve(dataRecv);
        } else {
          errorLog.push({
            url: fetchURL,
            errorMessage: 'some error occurred',
            exp: '',
            code: dataRecv.status || -1,
            username: sessionStorage.userID || 'unknown'
          });
          reportErrorToDiagnostics()

          console.log('Rejection RECIVED!!!')
          reject({})
        }

      } catch (e) {
        console.log('exp', e);
        reject(e);
      }
    }).then(async response => {
      if (fetchURL.includes('/login') && response.status === 200) {
        Cookies.set('login', 'yes');
      }
      if (response.status === 403) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('lastRequestTime');
        sessionStorage.selectedIndex = 0;
        Cookies.set('login', '');
        Cookies.remove("token");
        sessionStorage.selectedIndex = 0;
        this.props.actions.generalProcess(constants.logout, {});


        const request = new Request(`${baseUrl}/logout`, {
          method: 'POST',
          mode: "cors",
          credentials: "include",
          headers: header,
          body: JSON.stringify({})
        });

        dataRecv = await fetch(request);

        browserHistory.push('/cipher/login')
        return {};
      }

      return response.data;

    }).catch(error => {
      errorLog.push({
        url: fetchURL,
        errorMessage: error.message,
        exp: error,
        code: 408,
        username: sessionStorage.userID || 'unknown'
      });
      // reportErrorToDiagnostics()
      let errorJson = {
        "responseMessage": {
          "action": "Connection Error",
          "data": {
            "message": {
              "status": "ERROR",
              "errorDescription": "Error connecting to server please check your internet connection!!",
              "routeTo": "success",
              "displayToUser": true
            }
          }
        }

      };

      return errorJson;
    });
  }
}
async function reportErrorToDiagnostics() {
  let nowtime = Math.round((new Date()).getTime() / 1000)

  if (errorLog.length > 0 && lasterrorreporttime < nowtime) {
    let header = new Headers({
      'Content-Type': 'application/json',
      'token': sessionStorage.token
    })
    const request = new Request(baseUrl + "/API/core/logErrors", {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: header,
      body: JSON.stringify({ logList: errorLog })
    });
    let dataRecv = await fetch(request);
    lasterrorreporttime = nowtime + 300000
    errorLog = [];
    console.log(dataRecv)
  }
}

// window.onbeforeunload = async function () {
//   if (errorLog.length > 0) {
//     let header = new Headers({
//       'Content-Type': 'application/json'
//     })
//     const request = new Request(baseUrl + "/API/core/logErrors", {
//       method: 'POST',
//       mode: "cors",
//       credentials: "include",
//       headers: header,
//       body: JSON.stringify({ logList: errorLog })
//     });
//     let dataRecv = await fetch(request);
//     errorLog = [];
//     console.log(dataRecv)
//   }
//   Cookies.remove('login')
//   return undefined;
// }

export default generalAPI;