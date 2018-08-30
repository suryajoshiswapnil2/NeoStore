import stripe from "tipsi-stripe";
import { userData, userDataService } from "../lib/serviceProvider";

export let source = null;

let initDone = false;

export const PUBLISHABLE_KEY = "pk_test_wIWeEpVEHRKtKXf6lS9sWX2V";
export const MERCHANT_ID = "NO_ID";
export const ANDROID_PAY_MODE = "test";

export const setOptions = {
  publishableKey: PUBLISHABLE_KEY,
  merchantId: MERCHANT_ID,
  androidPayMode: ANDROID_PAY_MODE
};

export const stripeInit = () => {
  stripe.setOptions(setOptions);
  initDone = true;
};

export var supportNativePay = null;

sendToBackend = token => {
  const url = "http://localhost:9000/charge";
  console.log(token);

  form = fetch(url, {
    method: "POST",
    body: token.tokenId
  }).then(res => {
    console.log(res);
  });
};

export const PaymentModes = {
  isNativePaySupported: async () => {
    isSupportNativePay = await stripe.deviceSupportsNativePay();
    return supportNativePay;
  },
  PayWithNative: () => {
    // Check for native pay support
    // stripe.deviceSupportsNativePay().then(res => {
    //   console.log(res);
    // });
    console.log(isSupportNativePay);
    stripe.openNativePaySetup();
  },

  AddCard: async () => {
    console.log("add card");
    if (!initDone) stripeInit();

    let token = null;

    try {
      token = await stripe.paymentRequestWithCardForm({});
      sendToBackend(token);
      console.log(token);
    } catch (e) {
      console.log(e);
      alert("user cancelled");
      return {
        error: true,
        success: false,
        error_msg: "Payment is unsuccessful, Please try again after some time!"
      };
    }

    userDataService.appendToken(token);
    return { success: true, error: false, error_msg: "" };
  }
};
