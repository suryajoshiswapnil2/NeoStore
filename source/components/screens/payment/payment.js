import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

// import { PaymentCardTextField } from "tipsi-stripe";
import { CustomHeader } from "../../header/header";
import { styles } from "./styles";
import * as Device from "../../../lib/globals";
import { userData, userDataService } from "../../../lib/serviceProvider";

import { PaymentModes, PayMode } from "../../../utils/stripeAPI";
import { post, API } from "../../../lib/api";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      valid: false,
      params: {},
      nativeSupported: false,
      success: false,
      error: false,
      error_msg: "Payment is unsuccessful, Please try again after some time!"
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: false,
      nativeSupported: await PaymentModes.isNativePaySupported()
    });
  }

  device_pay = () => {
    console.log("native pay supported", this.state.nativeSupported);
    PaymentModes.PayWithNative();
  };

  add_card = async () => {
    let va = await PaymentModes.AddCard();
    console.log(va);

    if (va.success) {
      console.log("i am in");
      post(
        API.order,
        { access_token: userData.user_data.access_token },
        this.props.navigation.state.params.address,
        res => {
          console.log("response", res);
          if (res.status == 200) {
            userDataService.setUserData("total_carts", 0);
            // Alert.alert("Info", res.user_msg, [
            //   {
            //     text: "Ok",
            //     onPress: () => {
            //       this.props.navigation.navigate("Home");
            //     }
            //   }
            // ]);
          } else {
            // alert(res.user_msg);
            console.log(res.user_msg);
            this.setState({ loading: false });
          }
        },
        err => {
          alert(err.message);
          this.setState({
            loading: false
          });
        }
      );
    }
    this.setState({
      success: va.success,
      error: va.error,
      error_msg: va.error_msg
    });
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid: valid,
      params: params
    });

    console.log(`
      Valid: ${valid}
      Number: ${params.number || "-"}
      Month: ${params.expMonth || "-"}
      Year: ${params.expYear || "-"}
      CVC: ${params.cvc || "-"}
    `);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.goBack();
            }}
            title="Payment"
            rightIcon="plus"
          />
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          (this.state.success || this.state.error) && {
            backgroundColor: "#002",
            opacity: 0.7
          }
        ]}
      >
        <CustomHeader
          leftIcon="angle-left"
          style={{ fontSize: 20 }}
          leftAction={() => {
            this.props.navigation.goBack();
          }}
          title="Payment"
          //   rightIcon="plus"
          //   rightAction={() => {
          //     this.props.navigation.navigate("AddAddress");
          //   }}
        />

        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={true}
              style={[styles.button]}
              onPress={() => {
                this.device_pay();
              }}
            >
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                {Device.isIOS ? "Apple Pay" : "Google Pay"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.payCard}>Pay with card</Text>
          <PaymentCardTextField
            style={styles.field}
            cursorColor="black"
            textErrorColor="red"
            placeholderColor="gray"
            numberPlaceholder="4545 1245 1112 4587"
            expirationPlaceholder="MM/YY"
            cvcPlaceholder="CVV"
            disabled={false}
            onParamsChange={this.handleFieldParamsChange}
          /> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#451245" }]}
              onPress={() => {
                this.add_card();
              }}
            >
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                ADD CARD
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#451245" }]}
              onPress={() => {
                this.setState({
                  error: true
                });
              }}
            >
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                OPEN ERROR BOX
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={this.state.success}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            // this.setState({
            //   success: false
            // });
            return false;
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "60%",
                width: "90%",
                borderRadius: 10,
                backgroundColor: "white",
                opacity: 1,
                justifyContent: "center",
                alignItems: "center"
                // zIndex: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Gotham-Bold",
                  fontSize: 20,
                  marginBottom: 20
                }}
              >
                &#10004;Success
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Gotham-Medium",
                  fontSize: 19,
                  marginBottom: 10
                }}
              >
                Your payment is successful!
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "Gotham-Book",
                  fontSize: 18,
                  marginBottom: 40,
                  width: "70%",
                  textAlign: "center"
                }}
              >
                Your can find your order details in order detail page!
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#101295", height: 50, width: 200 }
                ]}
                onPress={() => {
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: "MyCart" })
                    ]
                  });
                  this.props.navigation.dispatch(resetAction);

                  //   this.props.navigation.reset("Home");
                  this.setState({
                    success: false
                  });
                }}
              >
                <Text style={[styles.buttonText, { textAlign: "center" }]}>
                  DONE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={this.state.error}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            // this.setState({
            //   success: false
            // });
            return false;
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "60%",
                width: "90%",
                borderRadius: 10,
                backgroundColor: "white",
                opacity: 1,
                justifyContent: "center",
                alignItems: "center"
                // zIndex: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Gotham-Bold",
                  fontSize: 20,
                  marginBottom: 20
                }}
              >
                &#10008;Bad Luck
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Gotham-Medium",
                  fontSize: 19,
                  marginBottom: 10
                }}
              >
                Your payment is unsuccessful!
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "Gotham-Book",
                  fontSize: 18,
                  marginBottom: 40,
                  width: "70%",
                  textAlign: "center"
                }}
              >
                {this.state.error_msg}
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#ff8f00", height: 50, width: 200 }
                ]}
                onPress={() => {
                  this.setState({
                    error: false
                  });
                }}
              >
                <Text style={[styles.buttonText, { textAlign: "center" }]}>
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
