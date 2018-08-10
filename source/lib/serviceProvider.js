export let userData = { 
    email: '',
    first_name : '', 
    last_name : '',
    my_cart: 0,
}

export const userDataService = {
    setUserData : (key, value) => {
        userData[key] = value;
    }
};