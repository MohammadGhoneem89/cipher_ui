import 'whatwg-fetch'

class generalAPI{
	
	
	
static getData(fetchURL,data) {
  let header;
  if(sessionStorage.token){
      header= new Headers({
        'Content-Type': 'application/json',
		    'Cache-Control': 'no-cache',
        'token':sessionStorage.token
      })
  }else
  {
      header= new Headers({
        'Content-Type': 'application/json',
		    'Cache-Control': 'no-cache'
        
      })
  }
    


    const request = new Request(fetchURL, {
      method: 'POST',
	    mode: "cors",
      headers: header, 
      body: JSON.stringify({...data})
    });
    

    return fetch(request).then(response => {
		  return response.json();
    }).catch(error => {
		      let errorJson={
		      "responseMessage":{
							"action":"Connection Error",
							"data":{ 
                          "message":{
										                "status":"ERROR",
										                "errorDescription":"Error conecting to server please check your internet connection!!", 
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