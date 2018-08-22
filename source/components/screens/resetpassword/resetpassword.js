/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from "react-native";
import { background } from "../../../assets/images";
import { styles } from "./styles";
import Icon from "../../../utils/icon";
import Header from "../../header/header";
import { API, post } from "../../../lib/api";
import { validator, showError } from "../../../utils/validators";
import { userData } from '../../../lib/serviceProvider';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,  
      old_password: "",
      password: "",
      confirm_password: ""
    };
  }

  _resetPassword = async () => {

    if (validator.emptyField(this.state.old_password))
      return showError("Old password is empty!");
    else if (validator.emptyField(this.state.password))
      return showError("Password is empty!");
    else if (validator.emptyField(this.state.confirm_password))
      return showError("Confirm password field is empty!");
    else if (
      validator.passConfirm(this.state.password, this.state.confirm_password)
    )
      return showError("New password and confirm password mismatched!");

    this.setState({
        isLoading: true,
    })

    let formData = new FormData();

    formData.append("old_password", this.state.old_password);
    formData.append("password", this.state.password);
    formData.append("confirm_password", this.state.confirm_password);


    post(API.changePassword, { access_token: userData.user_data.access_token},
        formData, 
        (res) => {
            if (res.status == 200) {
                alert(res.user_msg);
                this.props.navigation.goBack();
            } 
            else {
                alert(res.user_msg);
            }
            this.setState({
                isLoading: false,
            })    
        }, 
        err => {

            alert(err.message)
            this.setState({
                isLoading: false,
            })
        }
    )

  };

  render() {

    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={styles.mainContainer} source={background} >
        <Header
          title="Reset Password"
          back={() => {
            this.props.navigation.goBack();
          }}
        />
        <StatusBar barStyle="light-content" hidden={false} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container} pointerEvents={this.state.isLoading ? "none" : 'auto'}>
            <View style={styles.containerHalf}>
              <Text style={styles.logoTitle}>NeoSTORE</Text>
              <View style={styles.inputBoxes}>
                <View style={styles.inputContainer}>
                  <Icon
                    style={styles.icons}
                    name="lock"
                    size={20}
                    color="white"
                  />
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder="Current Password"
                    maxLength={15}
                    placeholderTextColor="#ffffff"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.passwordInput.focus();
                    }}
                    blurOnSubmit={false}
                    onChangeText={text => this.setState({ old_password: text })}
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
                    maxLength={15}
                    placeholder="New Password"
                    placeholderTextColor="#ffffff"
                    // keyboardType= 'email-address'
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.confirmPasswordInput.focus();
                    }}
                    blurOnSubmit={false}
                    ref={input => {
                      this.passwordInput = input;
                    }}
                    onChangeText={text => this.setState({ password: text })}
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
                    maxLength={15}
                    placeholder="Confirm Password"
                    placeholderTextColor="#ffffff"
                    returnKeyType="done"
                    ref={input => {
                      this.confirmPasswordInput = input;
                    }}
                    onChangeText={text =>
                      this.setState({ confirm_password: text })
                    }
                  />
                </View>
              </View>
              <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this._resetPassword}>
                    {this.state.isLoading ? <ActivityIndicator size="small" color="#0000ff" />  : <Text style={{ color: "#e91c1a", fontSize: 20, fontWeight: "bold" }}>RESET</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}
