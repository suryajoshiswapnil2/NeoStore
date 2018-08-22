import React, { Component } from "react";
import Icon from "../../utils/icon";
import { View,TextInput, Text,Modal, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
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
          <Icon
            name="angle-left"
            color="#ffffff"
            style={{ fontWeight: "bold" }}
            size={this.props.size ? this.props.size : 18}
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
      icon: this.props.icon,
      isSearching: false,   

      //   backScreen: this.props.back != undefined ? this.props.back : null ,
    };
    this.open_search = this.open_search.bind(this)
  }

  open_search(){
      this.setState({
        isSearching: true,
      })
  }

  close_search(){
      this.setState({
          isSearching: false,
      })
  }


  render() {
    return (
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity
          style={styles.leftCustomContainer}
          onPress={this.props.leftAction}
        >
          <Icon
            name={this.props.leftIcon}
            color="#ffffff"
            size={this.props.size ? this.props.size : 20 }
          />
        </TouchableOpacity>
        <Text style={[styles.custHeadText, this.props.style]}>
          {this.state.title}
        </Text>
        {this.props.rightIcon != undefined && (
          <TouchableOpacity
            style={styles.rightContainer}
            // onPress={this.props.rightAction}
            onPress={ this.props.rightAction == undefined ? () =>  this.open_search() : this.props.rightAction }
         >
            <Icon
              name={this.props.rightIcon}
              color="#ffffff"
              size={this.props.size ? this.props.size : 20}
            />
          </TouchableOpacity>
        )}


        <Modal
            visible={ this.state.isSearching } 
            transparent={true}
            onRequestClose={() => { this.setState({isSearching: false,})}}
            > 
            <TouchableWithoutFeedback onPress={() => this.close_search()}>
            <View style={{flex:1,}}>
                <View  style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.rowContainer}>
                            {/* <View style={{width: 50, height: 50,marginLeft: 3,marginTop:2, justifyContent:'center', alignItems: 'center'}}>
                                <Icon  onPress={() => this.close_search()} name={this.props.leftIcon} color="#ffffff" size={this.props.size ? this.props.size : 25}/>
                            </View> */}
                            <TextInput
                                placeholder='Search..'
                                onPress={ () => true }
                                placeholderTextColor='white'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{marginLeft: 20, height: 50, width: '70%', color: 'white', fontSize: 17}}
                            />
                            <View style={{width: 50, height: 50,marginRight: 2,marginTop:2, justifyContent:'center', alignItems: 'center'}}>
                                <Icon  onPress={() => this.close_search()} name={this.props.rightIcon} color="#ffffff" size={this.props.size ? this.props.size : 25}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                </View>
            </TouchableWithoutFeedback>
            
        </Modal>
      </View>

    );
  }
}
