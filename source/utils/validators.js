import {Alert, Platform, ToastAndroid,} from 'react-native'



export let validator= {
    digitsOnly: text => ! /[0-9*#+]{10,13}/.test(text) ,
    digitsOnlyZip: text => ! /[0-9]{6}/.test(text) ,
    emptyField: text  =>  text.trim() === '' ? true : false ,
    emailField: text =>  ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text),
    passwordField: text => ! /[0-9a-z]{7,15}/i.test(text),
    passConfirm: (text, confirm_text) => text != confirm_text ? true: false,
}


export let showError = (text, desc, ref) => {

    Platform.OS == 'android' ? ToastAndroid.show(text, ToastAndroid.SHORT) : Alert.alert(text) 

    return false
}
