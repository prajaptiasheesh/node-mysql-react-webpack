import Cookie from 'cookie-universal'


let cookieService = Cookie();

const isUserLoggedIn = ()=>{
    let token = cookieService.get("token");
    return !token ? false : true;
}

const parseJson = (json)=>{
    try{
        let result = JSON.parse(json);
        return result; 
    }catch(err){
        return false;
    }
}

const parseAxiosError = (error) => {
    let err = {};
    err.stack = error?.stack;
    let responseMsg = "API request failed to get/update/delete/add.";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      err.status = error?.response?.status;
      err.url = error?.response?.config?.url;
      let data = parseJson(error?.response?.config?.data);
      err.data = data ? data : null;
      err.error = error?.response?.data;
      err.message = error?.response?.statusText || responseMsg;
      return err;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      err.status = error.request.status;
      err.url = error.request.responseURL;
      err.message = error.request.statusText || responseMsg;
      return err;
    } else {
      // Something happened in setting up the request that triggered an Error
      err.message = error.message || responseMsg;
      return err;
    }
  };

export {
    isUserLoggedIn,
    parseJson,
    parseAxiosError,
    cookieService
}