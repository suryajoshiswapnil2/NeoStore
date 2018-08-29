import stripe from "tipsi-stripe";

export let token = null;
export let source = null;

let initDone = false;

const BASE_URL = "https://api.stripe.com";

export const PUBLISHABLE_KEY = "pk_test_wIWeEpVEHRKtKXf6lS9sWX2V";
export const MERCHANT_ID = "NO_ID"; // Optional
export const ANDROID_PAY_MODE = "test"; // Android only ( test | production )

export const setOptions = {
  publishableKey: PUBLISHABLE_KEY,
  merchantId: MERCHANT_ID,
  androidPayMode: ANDROID_PAY_MODE
};

export const stripeInit = () => {
  stripe.setOptions(setOptions);
  initDone = true;
};

export const PayMode = () => {
  return stripe.deviceSupportsAndroidPay().then(res => {
    if (res) return true;
    else return false;
  })
    ? "Google Pay"
    : stripe.deviceSupportsApplePay().then(res => {
        if (res) return true;
        else false;
      })
      ? "Apple Pay"
      : "No Support";
};

export const PaymentModes = {
  PayWithApple: () => {
    console.log("Pay with apple");
  },
  PayWithGoogle: () => {
    console.log("Pay with Google");
  },
  PayWithCard: async billing_address => {
    console.log("called");
    if (!initDone) stripeInit();

    let billingAddress =
      billing_address == undefined
        ? {
            name: "swap surya",
            line1: "Rabale",
            line2: "Sigma IT park",
            city: "Mumbai",
            state: "Maharashtra",
            country: "IN",
            postalCode: "444604"
          }
        : billing_address;

    const options = {
      requiredBillingAddressFields: "full",
      prefilledInformation: {
        billingAddress: billingAddress
      }
    };

    token = await stripe.paymentRequestWithCardForm(options);

    console.log(token);
    return token;
  }
};
