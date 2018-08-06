import {Alert} from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message";


export let validator= {
    digitsOnly: text => ! /[0-9*#+]{10,13}/.test(text) ,
    emptyField: text  =>  text.trim() === '' ? true : false ,
    emailField: text =>  ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text),
    passwordField: text => ! /[0-9a-z]{7,15}/i.test(text),
    passConfirm: (text, confirm_text) => text != confirm_text ? true: false,
}


export let showError = (text, desc, ref) => {
    Alert.alert(text) 
    // showMessage( {
    //     message: text,
    //     description: desc == undefined ? '' : desc ,
    //     type: "danger",
    //     icon: 'danger',
    //     floating: true,
    //     onPress : ()=> {
    //         ref == undefined ? false :  ref.focus()
    //     },
    //     // color:'#000000'
    //   })
    return false
}
