import React, { Component } from "react";

import { View, ActivityIndicator, AsyncStorage } from "react-native";

import { userDataService } from "../lib/serviceProvider";

import styles from "./styles";

import { API, apiCall } from "../lib/api";

export default class Startup extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {

    let data = await AsyncStorage.getItem("access_token");

    // Check for the existence of Access Token
    if (data == null) {
      this.props.navigation.navigate("LoginStack");
      return;
    }

    // Validate the Access Token
    try {
        apiCall(API.accountDetails, {
            method: "GET",
            headers: {
            access_token: data
            }
        }, (res) => {
            if (res.status == 200) {
                // console.log(res)
                userDataService.setData(res.data)
                this.props.navigation.navigate("Home", res.data);
                return true;
            }
            AsyncStorage.removeItem("access_token");
            this.props.navigation.navigate("LoginStack");
        })
    }
    catch(err){ // Network related issues
        AsyncStorage.removeItem("access_token");
        this.props.navigation.navigate("LoginStack");
        console.log(err)
    }

    // await fetch(API.accountDetails, {
    //   method: "GET",
    //   headers: {
    //     access_token: data
    //   }
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.status == 200) {
    //       //   userDataService.setUserData("email", res.data.user_data.email);
    //       //   userDataService.setUserData(
    //       //     "first_name",
    //       //     res.data.user_data.first_name
    //       //   );
    //       //   userDataService.setUserData(
    //       //     "last_name",
    //       //     res.data.user_data.last_name
    //       //   );
    //       this.props.navigation.navigate("Home", res.data);
    //       return true;
    //     }
    //     AsyncStorage.removeItem("access_token");
    //     this.props.navigation.navigate("LoginStack");
    //   })
    //   .catch(err => {
    //     AsyncStorage.removeItem("access_token");
    //     this.props.navigation.navigate("LoginStack");
    //     console.log(err);
    //   });

    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
