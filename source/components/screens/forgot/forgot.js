/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// Complete

import React, {Component} from 'react';
import {View, Text, TextInput,ActivityIndicator, TouchableOpacity,ImageBackground, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import {background} from '../../../assets/images';
import {styles} from './styles';
import Icon from '../../../utils/icon';
import Header from "../../header/header";
import {validator,showError} from '../../../utils/validators'
import {API, post} from '../../../lib/api'


export default class Forgot extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      cpassword: '',
      loader: false,
    }
  }

  _doForgot = () =>  {

    if( validator.emptyField(this.state.email) )
        return showError('Username is empty!', '')
    else if(validator.emptyField(this.state.password))
        return showError('Password is empty!')
    else if( validator.emailField(this.state.email))
        return showError('Email is invalid!!')
    else if( validator.passwordField(this.state.password))
        return showError('Password should be 7-15 alpha-numeric characters!')
    else if(validator.passConfirm(this.state.password, this.state.cpassword))
        return showError('password mismatched!')
  
    this.setState({
        loader: true,
    })    

    let formData = new FormData()
    formData.append('email', this.state.email)

    post(API.forgot, {},formData, (res) => {
            showError(res.user_msg)
            this.setState({
                loader: false,
            })
        }, err => {
            console.log(err)
            alert(err.message)
            this.setState({
                loader: false,
            })
    })



  }

  render() {
    const {navigate} = this.props.navigation;
    return (

    <ImageBackground style={styles.mainContainer} source={background} >
    <Header title='Forgot Password' back={()=>{this.props.navigation.goBack()}} />
    <StatusBar barStyle='light-content' hidden={false} />
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
      <View style={ styles.container} pointerEvents={this.state.loading ? "none" : 'auto'}>
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
                maxLength= {50}
                placeholderTextColor='#ffffff'
                keyboardType='email-address'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({email :text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {30}
                placeholder="New Password"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.passwordInput = input; }}
                onChangeText={(text) => this.setState({password: text })}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {30}
                placeholder="Confirm Password"
                placeholderTextColor='#ffffff'
                returnKeyType ='done' 
                ref={(input) => { this.confirmPasswordInput = input; }}
                onChangeText={(text) => this.setState({cpassword: text})}
            />
          </View>
          </View>
          <TouchableOpacity style={styles.loginButton}  onPress={this._doForgot}>
          {this.state.loader ? <ActivityIndicator size='small' color='blue' /> : <Text style={styles.buttonText}>RESET NOW</Text>}
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => navigate('Login') }>
              <Text style={styles.text}>Login with password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}