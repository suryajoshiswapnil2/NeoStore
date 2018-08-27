import { Alert, Platform, ToastAndroid } from "react-native";
import { Toast } from "native-base";

export let validator = {
  digitsOnly: text => !/[0-9*#+]{10,13}/.test(text),
  digitsOnlyZip: text => !/[0-9]{6}/.test(text),
  emptyField: text => (text.trim() === "" ? true : false),
  emailField: text =>
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text),
  passwordField: text => !/[0-9a-z]{7,15}/i.test(text),
  passConfirm: (text, confirm_text) => (text != confirm_text ? true : false)
};

let close = ref => {
  ref.focus();
};

export let showError = (text, ref, type = "default") => {
  //   Platform.OS == "android"
  //     ? ToastAndroid.show(text, ToastAndroid.SHORT)
  //     : Alert.alert(text);

  Toast.show({
    text: text,
    buttonText: "OK",
    duration: 2000,
    textStyle: { fontFamily: "Gotham-Book", fontSize: 12 },
    buttonStyle: { borderColor: "gray", borderWidth: 0.5 }
    // onClose: ref === undefined ? null : close(ref),
    // type: type
  });
  return false;
};
