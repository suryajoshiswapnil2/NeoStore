/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// Complete

import React, { Component } from "react";
import * as Device from "../../../lib/globals";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  DatePickerIOS,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  DatePickerAndroid,
  ActivityIndicator
} from "react-native";

import { background } from "../../../assets/images";
import Header from "../../header/header";
import { user } from "../../../assets/images";
import { styles } from "./styles";
import Icon from "../../../utils/icon";
import { SafeAreaView } from "react-navigation";
import { API, post, get } from "../../../lib/api";
import { userData, userDataService } from "../../../lib/serviceProvider";
import ImagePicker from "react-native-image-picker";
import { validator, showError } from "../../../utils/validators";

export default class MyAccount extends Component {
  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
      ...props.navigation.state.params,
      isLoading: true,
      chosenDate: this.toDate(props.navigation.state.params.dob),
      openIOSPicker: false,
      imagePicked: false,
      dataLoading: false,
      loading: true,
      imageLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      imageLoading: false
    });
  }

  // Convert string to Date
  toDate = str => {
    let arr = str.split("-");
    arr[1] = Number.parseInt(arr[1]) - 1;
    return new Date(arr.reverse());
  };

  // Date to String
  toStr = date => {
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };

  openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({
          dob: "" + day + "-" + (month + 1) + "-" + year
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  getImages = () => {
    // ActionSheetIOS.showActionSheetWithOptions({
    //     options: ['Cancel', 'Remove'],
    //     destructiveButtonIndex: 1,
    //     cancelButtonIndex: 0,
    //   },
    //   (buttonIndex) => {
    //     if (buttonIndex === 1) { /* destructive action */ }
    //   });

    // this.setState({
    //     imageLoading: true,
    // })

    var options = {
      title: "Select Avatar",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
      cameraType: "front",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        //   let source = { uri: response.uri };
        //   let source = { uri: 'data:image/jpeg;base64,' + response.data };

        //   this.setState({
        //      imageLoading: true,
        //   })

        let source = "data:image/jpeg;base64," + response.data;

        this.setState({
          imagePicked: true,
          profile_pic: source
          // imageLoading: false,
        });
      }
      this.setState({
        imageLoading: false
      });
    });
  };

  setDate = () => {
    this.setState({
      dob: this.toStr(this.state.chosenDate),
      openIOSPicker: false
    });
  };

  _validate_form = () => {
    if (validator.emptyField(this.state.first_name))
      showError(
        "First Name field should not be Empty!",
        this.firstName,
        "danger"
      );
    else if (validator.emptyField(this.state.last_name))
      showError(
        "Last Name field should not be Empty!",
        this.lastName,
        "danger"
      );
    else if (validator.emptyField(this.state.email))
      showError("Please Enter Email Address!", this.emailInput, "danger");
    else if (
      validator.emptyField(this.state.phone_no) ||
      validator.digitsOnly(this.state.phone_no)
    )
      showError(
        "Please Enter 10 Digit Mobile Number!",
        this.phoneInput,
        "danger"
      );
    else return false;

    this.setState({
      dataLoading: false
    });
    return true;
  };

  _doUpdate = () => {
    this.setState({
      dataLoading: true
    });

    if (this._validate_form()) return false;

    // let image = null
    //
    // if( !this.state.imagePicked ){
    //    image =  fetch(this.state.profile_pic, {
    //         method: 'GET',
    //         headers: {}
    //     })
    //     .then( res => res.blob())
    //     .then(res => {

    //         var reader = new FileReader();
    //         reader.readAsDataURL(res);
    //         reader.onloadend = function() {
    //             return reader.result
    //         }
    //         }
    //     )
    // }

    let formData = new FormData();
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("email", this.state.email);
    formData.append("dob", this.state.dob);
    formData.append("phone_no", this.state.phone_no);
    formData.append(
      "profile_pic",
      this.state.imagePicked ? this.state.profile_pic : null
    );

    post(
      API.updateDetails,
      { access_token: userData.user_data.access_token },
      formData,
      res => {
        if (res.status == 200) {
          alert(res.user_msg);
          userDataService.setUserData("user_data", res.data);

          this.setState({
            dataLoading: false
          });
        } else {
          alert(res.user_msg);
          this.setState({
            dataLoading: false
          });
        }
      },
      err => {
        alert(err.message);
        this.setState({
          dataLoading: false
        });
      }
    );

    // this.setState({
    //     dataLoading: false,
    //   })
  };

  render() {
    const { goBack } = this.props.navigation;

    if (this.state.loading) {
      return (
        <ImageBackground style={styles.mainContainer} source={background}>
          <Header
            title="Edit Profile"
            back={() => {
              goBack();
            }}
          />
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground style={styles.mainContainer} source={background}>
        <Header
          title="Edit Profile"
          back={() => {
            goBack();
          }}
        />
        <SafeAreaView style={styles.anMainContainer}>
          <ScrollView>
            <KeyboardAvoidingView
              style={styles.container}
              behavior="position"
              enabled
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{ flex: 1 }}
                  pointerEvents={this.state.dataLoading ? "none" : "auto"}
                >
                  <View style={styles.containerHalf}>
                    <View style={styles.imageHolder}>
                      {/* <Image style={styles.image} source={require('../../../assets/images/icon.png')}/> */}
                      <TouchableOpacity
                        style={styles.imageTouch}
                        onPress={() => this.getImages()}
                      >
                        {this.state.imageLoading ? (
                          <ActivityIndicator size="small" color="blue" />
                        ) : (
                          <Image
                            style={styles.image}
                            source={
                              this.state.profile_pic == null ||
                              this.state.profile_pic == ""
                                ? user
                                : { uri: this.state.profile_pic }
                            }
                          />
                        )}
                      </TouchableOpacity>
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
                          //   editable={false}
                          value={this.state.first_name}
                          placeholderTextColor="#ffffff"
                          keyboardType="email-address"
                          returnKeyType="next"
                          ref={input => (this.firstName = input)}
                          onSubmitEditing={() => {
                            this.lastName.focus();
                          }}
                          blurOnSubmit={false}
                          onChangeText={text =>
                            this.setState({ first_name: text })
                          }
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
                            this.lastName = input;
                          }}
                          onSubmitEditing={() => {
                            this.emailInput.focus();
                          }}
                          onChangeText={text =>
                            this.setState({ last_name: text })
                          }
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
                          autoCorrect={false}
                          autoCapitalize="none"
                          style={styles.input}
                          placeholder="Email"
                          maxLength={40}
                          value={this.state.email}
                          placeholderTextColor="#ffffff"
                          keyboardType="email-address"
                          returnKeyType="next"
                          ref={input => {
                            this.emailInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.phoneInput.focus();
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
                          ref={input => {
                            this.phoneInput = input;
                          }}
                          value={this.state.phone_no}
                          blurOnSubmit={false}
                          onChangeText={text =>
                            this.setState({ phone_no: text })
                          }
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <Icon
                          style={styles.icons}
                          name="birthday-cake"
                          size={20}
                          color="white"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            Device.isIOS
                              ? this.setState({ openIOSPicker: true })
                              : this.openDatePicker();
                          }}
                        >
                          <Text style={styles.input}>{this.state.dob}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={this._doUpdate}
                      ref={input => {
                        this.loginButton = input;
                      }}
                    >
                      {this.state.dataLoading ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <Text style={{ color: "#e91c1a", fontSize: 20 }}>
                          SUBMIT
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              {Device.isIOS ? (
                <Modal
                  visible={this.state.openIOSPicker}
                  transparent={true}
                  animationType="slide"
                >
                  <View style={styles.modalContainer}>
                    <View
                      style={{ flex: 1 }}
                      onTouchEnd={() => this.setState({ openIOSPicker: false })}
                    />
                    <View style={styles.modelContent}>
                      <TouchableOpacity
                        onPress={() => this.setState({ openIOSPicker: false })}
                        style={styles.button}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setDate()}
                        style={styles.button}
                      >
                        <Text>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DatePickerIOS
                      style={styles.datePicker}
                      date={this.state.chosenDate}
                      maximumDate={new Date()}
                      onDateChange={date => {
                        this.setState({ chosenDate: date });
                      }}
                      mode="date"
                    />
                  </View>
                </Modal>
              ) : null}
            </KeyboardAvoidingView>
          </ScrollView>

          {/* {this.state.dataLoading && <Modal visible={true} ><ActivityIndicator size='large'/></Modal>} */}

          {/* <Modal
            visible={this.state.dataLoading}
            transparent={true}
            style={{justifyContent:'center', alignItems: 'center',}}
            >
            <ActivityIndicator size="large" color="#0000ff" />

          </Modal>   */}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
