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
  StatusBar,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler
} from "react-native";

import { styles } from "./styles";
import SplashScreen from "react-native-splash-screen";
import Icon from "../../../utils/icon";
import { CustomHeader } from "../../header/header";

import * as Device from "../../../lib/globals";
import Swiper from "react-native-swiper";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.delay = 1500;
    this.backTime = 0;
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton = () => {
    // Alert.alert(
    //     'Exit App',
    //     'Exiting the application?', [{
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel'
    //     }, {
    //         text: 'OK',
    //         onPress: () => {
    //             BackHandler.exitApp()
    //         }
    //     }, ], {
    //         cancelable: false
    //     }
    //  )

    if (!this.props.navigation.isFocused()) return false;

    if (this.delay + this.backTime > new Date().getTime())
      BackHandler.exitApp();
    else {
      ToastAndroid.show("Press again to exit App.", ToastAndroid.SHORT);
      this.backTime = new Date().getTime();
    }
    return true;
  };

  componentDidMount() {
    SplashScreen.hide();

    Platform.OS == "android" &&
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.setState({
      isLoading: false
    });
  }

  componentWillUnmount() {
    Platform.OS == "android" &&
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackPress
      );
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading)
      return (
        <View style={styles.mainContainer}>
          {/* <StatusBar barStyle="dark-content" hidden={false} /> */}
          {StatusBar.setHidden(true)}
          <CustomHeader
            leftIcon="menu"
            leftAction={this.props.navigation.openDrawer}
            title="NeoSTORE"
            rightIcon="search"
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </View>
      );

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <CustomHeader
          leftIcon="menu"
          leftAction={this.props.navigation.openDrawer}
          title="NeoSTORE"
          rightIcon="search"
        />

        {/* {this.state.isLoading && <ActivityIndicator size='large' color='blue' />} */}

        <View style={styles.containerHalf}>
          <Swiper
            dotColor="red"
            activeDotColor="black"
            style={Device.isAndroid ? { width: Device.window.width } : null}
            showsButtons={false}
          >
            {this.props.navigation.state.params.product_categories.map(
              (elem, key) => {
                return (
                  <View key={key}>
                    <Image
                      source={{ uri: elem.icon_image }}
                      style={styles.imageContent}
                    />
                  </View>
                );
              }
            )}
          </Swiper>
        </View>
        <View style={styles.containerHalfBottom}>
          <View style={styles.rowContainerBox}>
            <View style={styles.containerBox}>
              <TouchableOpacity
                style={[styles.box1, { backgroundColor: "#e91b1a" }]}
                onPress={() =>
                  navigate("ProductList", { title: "Tables", _id: 1 })
                }
              >
                <Text style={styles.__right}>Tables</Text>
                <Icon
                  name="table"
                  style={styles._left}
                  color="#ffffff"
                  size={70}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box1, { backgroundColor: "#bb0100" }]}
                onPress={() =>
                  navigate("ProductList", { title: "Sofas", _id: 2 })
                }
              >
                <Icon
                  style={styles._right}
                  name="sofa"
                  color="#ffffff"
                  size={70}
                />
                <Text style={styles.__left}>Sofas</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBox}>
              <TouchableOpacity
                style={[styles.box2, { backgroundColor: "#fe3f3f" }]}
                onPress={() =>
                  navigate("ProductList", { title: "Chairs", _id: 3 })
                }
              >
                <Text style={styles.__left}>Chairs</Text>
                <Icon
                  name="chair"
                  color="#ffffff"
                  style={styles._right}
                  size={70}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box2, { backgroundColor: "#9e0100" }]}
                onPress={() =>
                  navigate("ProductList", { title: "Cupboards", _id: 4 })
                }
              >
                <Icon
                  name="cupboard"
                  style={styles._left}
                  color="#ffffff"
                  size={70}
                />
                <Text style={styles.__right}>Cupboards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
