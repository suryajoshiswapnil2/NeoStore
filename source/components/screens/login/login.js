/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,ImageBackground,ScrollView, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, StatusBar  } from 'react-native';
import {background} from '../../../assets/images';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-navigation'; 
import {API} from '../../../lib/api';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component{


    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
      }
    }


  _doLogin = async (e) => {
    // if( this.state.email !== '' &&  this.state.password !== '' )
      this.props.navigation.navigate('Home');
    // else
    //  console.log(API.login);
    // fetch(API.login, {
    //     method: 'POST',
    //     headers: {
    //     Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(this.state),
    // }).then( (res) => {
    //   console.log(res.json());
    // }) .then((responseJson) => {
    //   return responseJson;
    // }).catch((error) => {
    //   console.error(error);
    // });

    // return fetch(API.login)
    // .then(function(response){
    //   return response.json();
    // })
    // .then(function(json){
    //     console.log(json);
    //     return json;
    //     // city: json.name,
    //     // temperature: kelvinToF(json.main.temp),
    //     // description: _.capitalizes(json.weather[0].description)
      
    // })
    // .catch(function(error) {
    // console.log('There has been a problem with your fetch operation: ' + error.message);
    //  // ADD THIS THROW error
    //   throw error;
    // });

    // fetch( 'https://google.co.in' ).then(( response) => { response.json();  }).then( (res) => { console.log(res)}  );

  } 

  render() {
    const {navigate} = this.props.navigation;
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
                maxLength= {15}
                placeholderTextColor='#ffffff'
                keyboardType= 'email-address'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                secureTextEntry= {true}
                maxLength= {15}
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
      </ImageBackground>
    );
  }
}