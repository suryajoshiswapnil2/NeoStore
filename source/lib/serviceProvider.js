import {apiCall, API} from './api'

export let userData = { 
    user_data: {
        profile_pic: null,
        first_name: '',
        last_name: '',
        email: '',
        phone_no: '',
        dob: '',
        access_token: '',
    },
    product_categories: [],
    total_carts: 0,
    total_orders: 0,
}

export const userDataService = {
    setUserData : (key, value) => {
        userData[key] = value;
    },
    setData : (obj) => {
        userData = obj
    } 
};


export const getCategory = (id) => {

    if(userData.product_categories.length == 0)
        return null

    return userData.product_categories.find(elem => elem.id == id ).name
} 




// export const sync = (access_token) => {

//     // console.log('sync called')
//     // console.log(userData)
//     apiCall(API.accountDetails, {
//         method: 'GET',
//         headers:  {
//             access_token: access_token,
//         }
//     }, (res) => {
//         if(res.status == 200)
//             userData = res.data
//     })
    

// }