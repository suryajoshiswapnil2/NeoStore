/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text,Alert, TextInput, ActivityIndicator,AsyncStorage, TouchableOpacity,ImageBackground,ScrollView, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, StatusBar  } from 'react-native';
import {background} from '../../../assets/images';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-navigation'; 
import {API, apiCall} from '../../../lib/api';
import {validator,showError} from '../../../utils/validators'
import FlashMessage from "react-native-flash-message";
import {userDataService} from "../../../lib/serviceProvider";


export default class Login extends Component{

    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        isLoading: true,
      }
    }

    componentDidMount(){
      this.setState({
        isLoading: false,
      })
    }

  _doLogin = async (e) => {

    if( validator.emptyField(this.state.email) )
      return showError('Username is empty!', '',this.usernameInput)
    else if(validator.emptyField(this.state.password))
      return showError('Password is empty!', '' , this.passwordInput)
    else if( validator.emailField(this.state.email))
      return showError('Email is invalid!!', '',this.usernameInput)
    else if( validator.passwordField(this.state.password))
      return showError('Password should be 7-15 alpha-numeric characters!', '' , this.passwordInput)
      
    let formData = new FormData();
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)

    apiCall(API.login,{
        method: 'POST',
        body: formData,
    },
      (res) => {
       
      if( res.status != 200) 
        Alert.alert(res.user_msg) 
      else {
        AsyncStorage.setItem('access_token', res.data.access_token);
          
        apiCall(API.accountDetails, {
            method: 'GET',    
            headers: {
              access_token: res.data.access_token
            }
         }, (res) => {
            if(res.status == 200 ) {
                userDataService.setData(res.data)
                this.props.navigation.navigate('Home',res.data)
            }    
         })   

        
      } 
    })



    // await fetch(API.login, {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then( res => res.json())
    // .then( async res => {
    //   console.log(res,'login')  
    //   if( res.status != 200) 
    //     Alert.alert(res.user_msg) 
    //   else {
    //     await AsyncStorage.setItem('access_token', res.data.access_token);

    //     await fetch(API.accountDetails, {
    //       method: 'GET',    
    //       headers: {
    //         access_token: res.data.access_token
    //       }  
    //     })
    //     .then(res => res.json())
    //     .then( res => {
    //       console.log(res,'account details')  

    //       if(res.status == 200 ) {
    //           this.props.navigation.navigate('Home',res.data)
    //       }         
    //     })
    //     .catch(err => console.log(err.message))

    //   }       
    // }
    // );

  } 

  render() {
    const {navigate} = this.props.navigation;

    if(this.state.isLoading)
      return( 
          <ImageBackground style={styles.mainContainer} source={background} >
              <ActivityIndicator  size="large" color="#0000ff" />
          </ImageBackground>
      )

    return (
      <ImageBackground style={styles.mainContainer} source={background} >
      <SafeAreaView style={styles.mainContainer}>
      {/* <Header title='login'/> */}
      {/* <ScrollView> */}
        {/* <KeyboardAvoidingView style={ styles.container} behavior='position' enabled> */}
        {/* <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      > */}
      <StatusBar barStyle = 'light-content'  hidden={true}/>
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
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
                  // maxLength= {15}
                  placeholderTextColor='#ffffff'
                  keyboardType= 'email-address'
                  returnKeyType ='next' 
                  onSubmitEditing={() => { this.passwordInput.focus(); }}
                  blurOnSubmit={false}
                  onChangeText={(text) => this.setState({email: text})}
                  ref={(input) => { this.usernameInput = input; }}
              />
            </View>
            <View style={ styles.inputContainer }>
              <Icon style={styles.icons}  name="lock" size={20} color="white" />
              <TextInput
                  style={ styles.input } 
                  secureTextEntry= {true}
                  // maxLength= {15}
                  placeholder="Password"
                  placeholderTextColor='#ffffff'
                  returnKeyType ='done' 
                  ref={(input) => { this.passwordInput = input; }}
                  // onSubmitEditing={() => { this.loginButton.press(); }}
                  onChangeText={(text) => this.setState({password: text})}
              />
            </View>
            </View>
            <TouchableOpacity 
                style={styles.loginButton}  
                onPress={this._doLogin}
                ref={(input) => { this.loginButton = input; }}>
                <Text style={{ color: '#e91c1a', fontSize: 20 , fontWeight: 'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => navigate('Forgot')}>
                <Text style={{ color: '#ffffff', fontSize: 20,}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        {/* </KeyboardAwareScrollView>  */}
        {/* </KeyboardAvoidingView> */}
      
          <View style={styles.bottomContainer}>
              <Text style={{ color: '#ffffff', fontSize: 19}}>DONT HAVE AN ACCOUNT? </Text>
              <TouchableOpacity  onPress={ () => navigate('Register')}>
              <Feather name='plus' style={{ fontFamily: 'Feather', backgroundColor:'#E31616'}} color='#ffffff' size={138/3}></Feather>
            </TouchableOpacity>
          </View>
          
        {/* </ScrollView> */}
          </SafeAreaView>
          <FlashMessage position="top" />
        </ImageBackground>
      )
  }
}