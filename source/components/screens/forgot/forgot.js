/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,ImageBackground, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import {background} from '../../../assets/images';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../../header/header";


export default class Forgot extends Component{
  render() {
    const {navigate} = this.props.navigation;
    return (
    <ImageBackground style={styles.mainContainer} source={background} >
    {/* <Header title='Forgot Password' style={{fontSize: 20}} size={24}  back={()=>{this.props.navigation.goBack()}}/> */}
    <Header title='Forgot Password' back={()=>{this.props.navigation.goBack()}} />
    <StatusBar barStyle='light-content' hidden={false} />
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
      <View style={ styles.container}>
        <View style={ styles.containerHalf}>
          <Text style={ styles.logoTitle }>NeoSTORE</Text>
          <View style={styles.inputBoxes}>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={20} color="white" />
            <TextInput
                autoCorrect = {false}
                autoCapitalize= 'none'
                style={styles.input}
                placeholder="Username"
                maxLength= {15}
                placeholderTextColor='#ffffff'
                keyboardType= 'email-address'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {15}
                placeholder="New Password"
                placeholderTextColor='#ffffff'
                // keyboardType= 'email-address'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.passwordInput = input; }}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {15}
                placeholder="Confirm Password"
                placeholderTextColor='#ffffff'
                returnKeyType ='done' 
                ref={(input) => { this.confirmPasswordInput = input; }}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          </View>
          <TouchableOpacity style={styles.loginButton}  onPress={this._onPressButton}>
              <Text style={{ color: '#e91c1a', fontSize: 20 , fontWeight: 'bold'}}>RESET NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => navigate('Login') }>
              <Text style={{ color: '#ffffff', fontSize: 20,}}>Login with password?</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.bottomContainer}>
            <Text style={{ color: '#ffffff', fontSize: 19}}>DONT HAVE AN ACCOUNT? </Text>
            <TouchableOpacity  onPress={() => navigate('Register')}>
            <Feather name='plus' style={{ fontFamily: 'Feather'}} color='#ffffff' size={138/3}></Feather>
          </TouchableOpacity>
            
        </View> */}
      </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}