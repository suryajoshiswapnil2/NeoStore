
const host ='http://staging.php-dev.in:8844/trainingapp/api'

export const API = {
    
   //POST 
   login: 'http://staging.php-dev.in:8844/trainingapp/api/users/login',
   registration : 'http://staging.php-dev.in:8844/trainingapp/api/users/register',
   forgot: 'http://staging.php-dev.in:8844/trainingapp/api/users/forgot',
   changePassword: 'http://staging.php-dev.in:8844/trainingapp/api/users/change',
   setRatings: 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating',
   addToCart: 'http://staging.php-dev.in:8844/trainingapp/api/addToCart',
   editCart: 'http://staging.php-dev.in:8844/trainingapp/api/editCart',
   deleteCart: 'http://staging.php-dev.in:8844/trainingapp/api/deleteCart',


   //GET
   accountDetails: 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',
   productList: 'http://staging.php-dev.in:8844/trainingapp/api/products/getList',
   productDetails: 'http://staging.php-dev.in:8844/trainingapp/api/products/getDetail',
   listCartItems: 'http://staging.php-dev.in:8844/trainingapp/api/cart',
   orderList: 'http://staging.php-dev.in:8844/trainingapp/api/orderList',
};


export const apiCall = 
    (url, data, callback)  => {
      return fetch(url, data)
                .then( res => res.json() )
                  .then( res => callback == undefined ? res.data : callback(res) )
                    .catch(err => console.log(err))
}