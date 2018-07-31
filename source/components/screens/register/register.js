/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity,ImageBackground,StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import {background} from '../../../assets/images';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Feather from 'react-native-vector-icons/Feather';
import Header from "../../header/header";
import * as Device from '../../../lib/globals'
// 
//import { } from 'react-native-elements';
import {Radio, CheckBox, RadioGroup} from './components';


export default class Register extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      checked: true,
    }
  }

  render() {
  //  const {navigate} = this.props.navigation;
    return (
      
    <ImageBackground style={styles.mainContainer} source={background} >
    <Header title='Register' back={()=>{this.props.navigation.goBack()}} />
    <StatusBar barStyle = 'light-content' hidden={false}/>
    {/* <ScrollView style={{height: Device.window.height }}> */}
    <KeyboardAvoidingView style={ styles.container} behavior='padding' enabled = {Device.isIOS ? true : false}>     
    
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
      <View style={ styles.container}>
        <View style={ styles.containerHalf}>
          <Text style={ styles.logoTitle }>NeoSTORE</Text>
          <View style={styles.inputBoxes}>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={25} color="white" />
            <TextInput
                autoCorrect = {false}
                autoCapitalize= 'none'
                style={styles.input}
                placeholder="First Name"
                maxLength= {15}
                placeholderTextColor='#ffffff'
                // keyboardType= 'default'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.lastNameInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={25} color="white" />
            <TextInput
                style={ styles.input }
                autoCorrect = {false}
                autoCapitalize= 'none' 
                maxLength= {15}
                placeholder="Last Name"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                ref={(input) => { this.lastNameInput = input; }}
                onSubmitEditing={() => { this.emailInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="envelope" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                maxLength= {15}
                autoCorrect = {false}
                autoCapitalize= 'none'
                placeholder="Email"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                keyboardType='email-address'
                ref={(input) => { this.emailInput = input; }}
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={25} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {15}
                placeholder="Password"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                ref={(input) => { this.passwordInput = input; }}
                onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={25} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {15}
                placeholder="Confirm Password"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                // keyboardType='default'
                ref={(input) => { this.confirmPasswordInput = input; }}
                onSubmitEditing={() => { this.mobileInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.genderContainer}>
            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold'}}>Gender</Text>
            <RadioGroup>
            <Radio label='Male' checked={false} color='#ffffff' />
            <Radio label='Female' checked={false} color='#ffffff' />
            </RadioGroup>
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="mobile" size={30} color="white" />
            <TextInput
                style={ styles.input }
                autoCorrect = {false}
                autoCapitalize= 'none' 
                maxLength= {15}
                placeholder="Phone Number"
                placeholderTextColor='#ffffff'
                returnKeyType ='done' 
                // onSubmitEditing={() => { this.firstNameInput.focus(); }}
                keyboardType={Device.isAndroid ? 'phone-pad' : 'default' }
                ref={(input) => { this.mobileInput = input; }}
                // blurOnSubmit={false}
                onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={ styles.termsContainer}>
            <CheckBox checked={false}    color='#ffffff' style={{marginRight: 10,}} > 
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>I agree the <Text style={{textDecorationLine:'underline'}}>Terms & conditions</Text></Text>
           </CheckBox>
          </View>
          </View>
          <TouchableOpacity style={styles.loginButton}  onPress={this._onPressButton}>
              <Text style={{ color: '#e91c1a', fontSize: 20, fontWeight: 'bold'}}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </TouchableWithoutFeedback>  
      
      </KeyboardAvoidingView>
      {/* </ScrollView> */}

      </ImageBackground>
     
    );
  }
}