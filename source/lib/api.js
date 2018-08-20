
import {NetInfo} from 'react-native'

const host ='http://staging.php-dev.in:8844/trainingapp/api'

export const API = {
    
   //POST 
   login: host + '/users/login',
   registration : host + '/users/register',
   forgot: host + '/users/forgot',
   changePassword: host + '/users/change',
   setRatings: host + '/products/setRating',
   addToCart: host + '/addToCart',
   editCart: host + '/editCart',
   deleteCart: host + '/deleteCart',
   updateDetails: host + '/users/update',
   order: host + '/order',


   //GET
   accountDetails: host + '/users/getUserData',
   productList: host + '/products/getList',
   productDetails: host + '/products/getDetail',
   listCartItems: host + '/cart',
   orderList: host + '/orderList',
   orderDetail: host + '/orderDetail',
   
};


export const apiCall = 
    (url, data, callback)  => {
   
      // check for internet connectivity   
    //   let status = NetInfo.isConnected.fetch().then( isConnected => isConnected ? 'online' : 'offline')
    //   console.log(status)  

      return fetch(url, data)
                .then( res => res.json() )
                  .then( res => callback == undefined ? res.data : callback(res) )
                    .catch(err => console.log(err))
}


export const get = (url, headers, callback, err ) => {

    let init = { method: 'GET' }
    headers != null ? init['headers'] = headers : null
    
    fetch( url, init ).then((res) => {
        // console.log(res)

        // if (res.ok) {
        //   return res.json();
        // } else {
        //   return res.json();
           
        //   throw new Error('Something went wrong');
        // }
        
        return res.json()
        
      })
      .then( res => callback == undefined ? res : callback(res) )
      .catch( error => err == undefined ? console.log(err) : err(error) );
} 

export const post = (url, headers, body, callback, err ) => {

    let init = { method: 'POST' }
    headers != null ? init['headers'] = headers : null
    body != null ? init['body'] = body : null

    fetch( url, init ).then((res) => {
        // console.log(res)

        // if (res.ok) {
        //   return res.json();
        // } else {
        //   return res.json()
        //   throw new Error('Something went wrong');
        // }

        return res.json()
      })
      .then( res => callback == undefined ? res : callback(res) )
      .catch( error => err == undefined ? console.log(err) : err(error) );
}