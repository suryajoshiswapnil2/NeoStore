// Complete

import React, { Component } from "react";
import {
  View,
  BackHandler,
  Text,
  StatusBar,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground
} from "react-native";
import { userDataService } from "../lib/serviceProvider";
import styles from "./styles";
import { API, get } from "../lib/api";
import { background } from "../assets/images";

export default class Startup extends Component {
  constructor(props) {
    super(props);
    this.do_processing = this.do_processing.bind(this);
  }

  do_processing = async () => {
    let data = await AsyncStorage.getItem("access_token");

    // Check for the existence of Access Token
    if (data == null) {
      this.props.navigation.navigate("LoginStack");
      return;
    }

    // Validate the Access Token

    get(
      API.accountDetails,
      { access_token: data },
      res => {
        if (res.status == 200) {
          userDataService.setData(res.data);
          this.props.navigation.navigate("Home", res.data);
          return true;
        }

        alert(res.message);
        AsyncStorage.removeItem("access_token");
        this.props.navigation.navigate("LoginStack");
      },
      err => {
        Alert.alert(
          "Error",
          "No Internet connection available!",
          [
            { text: "Retry", onPress: () => this.do_processing() },
            { text: "Exit", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );

        // AsyncStorage.removeItem("access_token");
        // Network issue, Exit from app
        // this.props.navigation.navigate("LoginStack");
      }
    );

    return true;
  };

  componentWillMount() {
    // SplashScreen.hide()
    return this.do_processing();
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={background}>
        {StatusBar.setHidden(true)}
        <View style={styles.mainContainer}>
          <Text style={[styles.title, { fontSize: 30 }]}>Welcome to</Text>
          <Text style={[styles.title, { fontSize: 45, fontWeight: "700" }]}>
            NeoSTORE
          </Text>
        </View>
        <View style={[styles.mainContainer, { justifyContent: "center" }]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </ImageBackground>
    );
  }
}
