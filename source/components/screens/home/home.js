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
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";

import { styles } from "./styles";
import Icon from '../../../utils/icon'
import { CustomHeader } from "../../header/header";

// import {Header} from 'react-native-elements';
import * as Device from "../../../lib/globals";
import Swiper from "react-native-swiper";


export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
    }
  }

 

  componentDidMount(){
    //   setTimeout(() => {
        this.setState({
            isLoading: false,
        })
 
    //   }, 2000)
  }

  render() {
    const { navigate } = this.props.navigation;

    
    if(this.state.isLoading)
        return(
            <View style={styles.mainContainer}>
                <CustomHeader
                    leftIcon="menu"
                    leftAction={this.props.navigation.openDrawer}
                    title="NeoSTORE"
                    rightIcon="search"
                    />
                <View style={{flex:1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='blue' />    
                </View>    
            </View>
    )

    return (
        
      // <ImageBackground style={styles.mainContainer} source={background} ></ImageBackground>
      <View style={styles.mainContainer} >
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="red"
        />
        <CustomHeader
          leftIcon="menu"
          leftAction={this.props.navigation.openDrawer}
          title="NeoSTORE"
        //   rightAction={this.props.navigation.goBack}
          rightIcon="search"
        />
        
        {/* {this.state.isLoading && <ActivityIndicator size='large' color='blue' />} */}

        <View style={styles.containerHalf}>
          <Swiper
            dotColor='red'
            activeDotColor='black'
            style={Device.isAndroid ? { width: Device.window.width } : null}
            showsButtons={false}   >
            {this.props.navigation.state.params.product_categories.map((elem, key) => {
                  return (
                    <View key={key}>
                      <Image
                        source={{ uri: elem.icon_image }}
                        style={{
                          resizeMode: "cover",
                          height: "100%",
                          width: "100%"
                        }}
                      />
                    </View>
                  );
                })}
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
                <Text
                  style={styles.__right}
                >
                  Tables
                </Text>
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
                <Text
                  style={styles.__left}
                >
                  Sofas
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBox}>
              <TouchableOpacity
                style={[styles.box2, { backgroundColor: "#fe3f3f" }]}
                onPress={() =>
                  navigate("ProductList", { title: "Chairs", _id: 3 })
                }
              >
                <Text
                  style={styles.__left}
                >
                  Chairs
                </Text>
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
                <Text
                  style={styles.__right}
                >
                  Cupboards
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
