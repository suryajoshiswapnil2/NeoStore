
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


   //GET
   accountDetails: host + '/users/getUserData',
   productList: host + '/products/getList',
   productDetails: host + '/products/getDetail',
   listCartItems: host + '/cart',
   orderList: host + '/orderList',
};


export const apiCall = 
    (url, data, callback)  => {
        console.log('api called')
      // check for internet connectivity   
    //   let status = NetInfo.isConnected.fetch().then( isConnected => isConnected ? 'online' : 'offline')
    //   console.log(status)  

      return fetch(url, data)
                .then( res => res.json() )
                  .then( res => callback == undefined ? res.data : callback(res) )
                    .catch(err => console.log(err))
}