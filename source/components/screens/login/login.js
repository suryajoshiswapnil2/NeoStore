/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// Complete

import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  BackHandler,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from "react-native";
import { background } from "../../../assets/images";
import SplashScreen from "react-native-splash-screen";

import { styles } from "./styles";
import Icon from "../../../utils/icon";
import { API, get, post } from "../../../lib/api";
import { validator, showError } from "../../../utils/validators";
import { userDataService } from "../../../lib/serviceProvider";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: true,
      loading: false
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.setState({
      isLoading: false
    });
  }

  _validate = () => {
    if (validator.emptyField(this.state.email))
      showError("Username is empty!", "", this.usernameInput);
    else if (validator.emptyField(this.state.password))
      showError("Password is empty!", "", this.passwordInput);
    else if (validator.emailField(this.state.email))
      showError("Email is invalid!!", "", this.usernameInput);
    else if (validator.passwordField(this.state.password))
      showError(
        "Password should be 7-15 alpha-numeric characters!",
        "",
        this.passwordInput
      );
    else return false;

    this.setState({
      loading: false
    });
    return true;
  };

  _doLogin = async e => {
    this.setState({
      loading: true
    });

    if (this._validate()) return false;

    let formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    post(
      API.login,
      {},
      formData,
      res => {
        if (res.status != 200) {
          this.setState({
            loading: false
          });
          Alert.alert("Error", res.user_msg);
        } else {
          AsyncStorage.setItem("access_token", res.data.access_token);

          get(
            API.accountDetails,
            { access_token: res.data.access_token },
            res => {
              if (res.status == 200) {
                userDataService.setData(res.data);
                this.props.navigation.navigate("Home", res.data);
              } else {
                this.setState({
                  loading: false
                });
                Alert.alert("Error", res.user_msg);
              }
            },
            err => {
              console.log(err);
              Alert.alert(
                "Error",
                "No Internet connection available!",
                [
                  { text: "Retry", onPress: () => this._doLogin() },
                  { text: "Exit", onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false }
              );
            }
          );
        }
      },
      err => {
        console.log(err);
        Alert.alert(
          "Error",
          "No Internet connection available!",
          [
            { text: "Retry", onPress: () => this._doLogin() },
            { text: "Exit", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
      }
    );

    // this.setState({
    //     loading: false,
    // })
  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading)
      return (
        <ImageBackground style={styles.mainContainer} source={background}>
          <StatusBar hidden={true} />
          <ActivityIndicator size="large" color="#0000ff" />
        </ImageBackground>
      );

    return (
      <ImageBackground style={styles.mainContainer} source={background}>
        <StatusBar hidden={true} />
        <View
          style={styles.mainContainer}
          pointerEvents={this.state.loading ? "none" : "auto"}
        >
          {/* <ScrollView> */}
          {/* <KeyboardAvoidingView style={ styles.container} behavior='position' enabled> */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerHalf}>
              <Text style={styles.logoTitle}>NeoSTORE</Text>
              <View style={styles.inputBoxes}>
                <View style={styles.inputContainer}>
                  <Icon
                    style={styles.icons}
                    name="user"
                    size={20}
                    color="white"
                  />
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder="Username"
                    // maxLength= {15}
                    placeholderTextColor="#ffffff"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.passwordInput.focus();
                    }}
                    blurOnSubmit={false}
                    onChangeText={text => this.setState({ email: text })}
                    ref={input => {
                      this.usernameInput = input;
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon
                    style={styles.icons}
                    name="lock"
                    size={20}
                    color="white"
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    // maxLength= {15}
                    placeholder="Password"
                    placeholderTextColor="#ffffff"
                    returnKeyType="done"
                    ref={input => {
                      this.passwordInput = input;
                    }}
                    // onSubmitEditing={() => { this.loginButton.press(); }}
                    onChangeText={text => this.setState({ password: text })}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this._doLogin}
                ref={input => {
                  this.loginButton = input;
                }}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="blue" />
                ) : (
                  <Text style={styles.loginText}>LOGIN</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate("Forgot")}>
                <Text style={styles.text}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          {/* </KeyboardAvoidingView> */}

          <View style={styles.bottomContainer}>
            <Text style={styles.text}>DONT HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => navigate("Register")}>
              <Icon
                name="plus-bold"
                style={{ backgroundColor: "#E31616", padding: 10 }}
                color="#ffffff"
                size={25}
              />
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </View>
      </ImageBackground>
    );
  }
}
