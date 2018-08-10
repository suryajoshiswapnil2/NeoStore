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
  Image,
  TextInput,
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
import Header from "../../header/header";
import { user } from "../../../assets/images";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-navigation";
import { API } from "../../../lib/api";
import { validator, showError } from "../../../utils/validators";

export default class MyAccount extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = props.navigation.state.params;
  }

  _doUpdate = () => {};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={styles.mainContainer} source={background}>
        <Header
          title="Edit Profile"
          back={() => {
            this.props.navigation.goBack();
          }}
        />
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="light-content" hidden={false} />

          {/* <ScrollView> */}
          {/* <KeyboardAvoidingView style={ styles.container} behavior='position' enabled> */}

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={styles.containerHalf}>
                <View style={styles.imageHolder}>
                  {/* <Image style={styles.image} source={require('../../../assets/images/icon.png')}/> */}
                  <Image
                    style={styles.image}
                    source={
                      this.state.profile_pic == null
                        ? user
                        : { uri: this.state.profile_pic }
                    }
                  />
                </View>
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
                      placeholder="First Name"
                      maxLength={20}
                      value={this.state.first_name}
                      placeholderTextColor="#ffffff"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={text => this.setState({ first_name: text })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon
                      style={styles.icons}
                      name="user"
                      size={20}
                      color="white"
                    />
                    <TextInput
                      style={styles.input}
                      maxLength={20}
                      autoCorrect={false}
                      autoCapitalize="none"
                      value={this.state.last_name}
                      placeholder="Last Name"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      ref={input => {
                        this.passwordInput = input;
                      }}
                      // onSubmitEditing={() => { this.loginButton.press(); }}
                      onChangeText={text => this.setState({ last_name: text })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon
                      style={styles.icons}
                      name="envelope"
                      size={20}
                      color="white"
                    />
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Email"
                      maxLength={40}
                      value={this.state.email}
                      placeholderTextColor="#ffffff"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={text => this.setState({ email: text })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon
                      style={styles.icons}
                      name="mobile"
                      size={20}
                      color="white"
                    />
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Phone Number"
                      maxLength={10}
                      placeholderTextColor="#ffffff"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      value={this.state.phone_no}
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={text => this.setState({ phone_no: text })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon
                      style={styles.icons}
                      name="birthday-cake"
                      size={20}
                      color="white"
                    />
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="DOB"
                      maxLength={15}
                      placeholderTextColor="#ffffff"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={text => this.setState({ dob: text })}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={this._doUpdate}
                  ref={input => {
                    this.loginButton = input;
                  }}
                >
                  <Text style={{ color: "#e91c1a", fontSize: 20 }}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* </KeyboardAvoidingView> */}
          {/* </ScrollView> */}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
