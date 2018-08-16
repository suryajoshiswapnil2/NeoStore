import React, { Component } from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      backScreen: this.props.back != undefined ? this.props.back : null
    };
  }
  render() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={this.props.back}
        >
          <Feather
            name="chevron-left"
            color="#ffffff"
            style={{ fontWeight: "bold" }}
            size={this.props.size ? this.props.size : 26}
          />
        </TouchableOpacity>
        <Text style={[styles.headText, this.props.style]}>
          {this.state.title}
        </Text>
        <View />
      </View>
    );
  }
}

export class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      icon: this.props.icon
      //   backScreen: this.props.back != undefined ? this.props.back : null ,
    };
  }
  render() {
    return (
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity
          style={styles.leftCustomContainer}
          onPress={this.props.leftAction}
        >
          <Feather
            name={this.props.leftIcon}
            color="#ffffff"
            size={this.props.size ? this.props.size : 25}
          />
        </TouchableOpacity>
        <Text style={[styles.custHeadText, this.props.style]}>
          {this.state.title}
        </Text>
        {this.props.rightIcon != undefined && (
          <TouchableOpacity
            style={styles.rightContainer}
            onPress={this.props.rightAction}
          >
            <Feather
              name={this.props.rightIcon}
              color="#ffffff"
              size={this.props.size ? this.props.size : 25}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
