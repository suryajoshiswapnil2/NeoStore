
const host ='http://staging.php-dev.in:8844/trainingapp/api'

export const API = {
    
   //POST 
   login: 'http://staging.php-dev.in:8844/trainingapp/api/users/login',
   registration : 'http://staging.php-dev.in:8844/trainingapp/api/users/register',
   forgot: 'http://staging.php-dev.in:8844/trainingapp/api/users/forgot',
   changePassword: 'http://staging.php-dev.in:8844/trainingapp/api/users/change',
   setRatings: 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating',


   //GET
   accountDetails: 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',
   productList: 'http://staging.php-dev.in:8844/trainingapp/api/products/getList',
   productDetails: 'http://staging.php-dev.in:8844/trainingapp/api/products/getDetail',


};


export const apiCall = async (url, data) => {
   return await fetch(url, data).then(res => res.json() ).then( res => res );
}