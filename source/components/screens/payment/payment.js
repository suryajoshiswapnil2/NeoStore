import React, { Component } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
// import { PaymentCardTextField } from "tipsi-stripe";
import { CustomHeader } from "../../header/header";
import { styles } from "./styles";
import * as Device from "../../../lib/globals";

import { PaymentModes, PayMode } from "../../../utils/stripeAPI";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      valid: false,
      params: {}
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }
  device_pay = () => {
    Device.isIOS ? PaymentModes.PayWithApple() : PaymentModes.PayWithGoogle();
  };

  make_payment = () => {
    PaymentModes.PayWithCard();
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
      <View style={styles.container}>
        <CustomHeader
          leftIcon="angle-left"
          style={{ fontSize: 20 }}
          leftAction={() => {
            this.props.navigation.goBack();
          }}
          title="Payment"
          rightIcon="plus"
          rightAction={() => {
            this.props.navigation.navigate("AddAddress");
          }}
        />

        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
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
                this.make_payment();
              }}
            >
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                PAY WITH CARD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
