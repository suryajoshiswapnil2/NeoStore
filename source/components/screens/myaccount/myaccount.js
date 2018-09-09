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
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { background } from "../../../assets/images";
import Header from "../../header/header";
import { user } from "../../../assets/images";
import { styles } from "./styles";
import Icon from "../../../utils/icon";
import { userData } from "../../../lib/serviceProvider";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return state;
};

class MyAccount extends Component {
  willFocusEventListener;

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      isLoading: true,
      force: 0
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    // this.willFocusEventListener = this.props.navigation.addListener(
    //   "willFocus",
    //   () => {
    //     console.log("will focus event", this.state);
    //     let { force } = this.state;
    //     this.setState({
    //       isLoading: false,
    //       force: force + 1
    //     });
    //   }
    // );
  }

  componentWillUnmount() {
    // this.willFocusEventListener.remove();
  }

  render() {
    // console.log("adasd");
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <ImageBackground
          style={[styles.mainContainer, { justifyContent: "flex-start" }]}
          source={background}
        >
          <Header
            title="My Account"
            back={() => {
              navigate("Home");
            }}
          />
          <View style={styles.mainContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground style={styles.mainContainer} source={background}>
        <Header
          title="My Account"
          back={() => {
            navigate("Home");
          }}
        />
        {/* <SafeAreaView style={styles.mainContainer}> */}
        {/* <ScrollView> */}
        {/* <KeyboardAvoidingView style={ styles.container} behavior='position' enabled> */}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.containerHalf}>
              <View style={styles.imageHolder}>
                <Image
                  style={styles.image}
                  source={
                    userData.user_data.profile_pic == null ||
                    userData.user_data.profile_pic == ""
                      ? user
                      : { uri: userData.user_data.profile_pic }
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
                    style={styles.input}
                    placeholder="First Name"
                    selectTextOnFocus={false}
                    editable={false}
                    // value={userData.user_data.first_name}
                    value={this.props.reducerss.name}
                    placeholderTextColor="#ffffff"
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
                    selectTextOnFocus={false}
                    editable={false}
                    placeholder="Last Name"
                    value={userData.user_data.last_name}
                    placeholderTextColor="#ffffff"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon
                    style={styles.icons}
                    name="email"
                    size={20}
                    color="white"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={userData.user_data.email}
                    selectTextOnFocus={false}
                    editable={false}
                    placeholderTextColor="#ffffff"
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
                    style={styles.input}
                    placeholder="Phone Number"
                    value={userData.user_data.phone_no}
                    selectTextOnFocus={false}
                    editable={false}
                    placeholderTextColor="#ffffff"
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
                    style={styles.input}
                    placeholder="DOB"
                    value={
                      userData.user_data.dob == null
                        ? " "
                        : userData.user_data.dob
                    }
                    selectTextOnFocus={false}
                    editable={false}
                    placeholderTextColor="#ffffff"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  navigate("EditProfile", userData.user_data);
                }}
                ref={input => {
                  this.loginButton = input;
                }}
              >
                <Text style={styles.text}>EDIT PROFILE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerHalfBottom}>
              <TouchableOpacity
                style={styles.loginButtonSquare}
                onPress={() => {
                  navigate("ResetPassword");
                }}
                ref={input => {
                  this.loginButton = input;
                }}
              >
                <Text style={styles.text}>RESET PASSWORD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </KeyboardAvoidingView> */}
        {/* </ScrollView> */}
        {/* </SafeAreaView> */}
      </ImageBackground>
    );
  }
}

export default connect(mapStateToProps)(MyAccount);
