import axios from 'axios';


//!  Antipattern:
//!  Don't do this:
//!
//!    axios.defaults.validateStatus = function(status){ return true; };
//!
//!
//!  It will break the way React Query is set up to work.
//!  That is, errors will no longer go to the onError handler.


axios.defaults.validateStatus = function(status){ return status >= 200 && status < 300 }; // Default:


/* =============================================================================
                                GET Request
============================================================================= */


export function getData(url, config){
  config = config || { timeout: 1000 * 25 };
  return axios.get(url, config);
}


/* =============================================================================
                              POST Request
============================================================================= */


export function postData(url, data, config){
  config = config || { timeout: 1000 * 25 };
  return axios.post(url, data, config);
}


/* =============================================================================
                            PUT Request
============================================================================= */


export function putData(url, data, config){
  config = config || { timeout: 1000 * 25 };
  return axios.put(url, data, config);
}


/* =============================================================================
                            PATCH Request
============================================================================= */


export function patchData(url, data, config){
  config = config || { timeout: 1000 * 25 };
  return axios.patch(url, data, config);
}


/* =============================================================================
                              DELETE Request
============================================================================= */


export function deleteData(url, config){
  config = config || { timeout: 1000 * 25 };
  return axios.delete(url, config);
}
