/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text,Alert, TextInput, AsyncStorage, TouchableOpacity,ImageBackground,ScrollView, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, StatusBar  } from 'react-native';
import {background} from '../../../assets/images';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-navigation'; 
import {API} from '../../../lib/api';
import {validator,showError} from '../../../utils/validators'
import FlashMessage from "react-native-flash-message"



// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component{


    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
      }
    }

    async componentWillMount() {

        let data = await AsyncStorage.getItem('userData');
        // console.log(data)
        if(data != null )
        this.props.navigation.navigate('Home');
    }

    _getAccount = async (token) => {

     return ;
    };

    
 isValid = () => {
  return 
  validator.emptyField(this.state.email) ? showError('username is empty!') 
  : validator.emailField(this.state.password) ?  showError('password is empty!') 
  : validator.emailField(this.state.email) ? showError('Invalid email!') 
  : validator.passwordField(this.state.password) ? showError('Password contain some invalid characters!')
  : true

 }



  _doLogin = async (e) => {
    // console.log(this.props);
    // this.props.navigation.navigate('Home');

    // if(!this.isValid())
    //   return false

    if( validator.emptyField(this.state.email) )
      return showError('Username is empty!', '',this.usernameInput)
    else if(validator.emptyField(this.state.password))
      return showError('Password is empty!', '' , this.passwordInput)
    else if( validator.emailField(this.state.email))
      return showError('Email is invalid!!', '',this.usernameInput)
    else if( validator.passwordField(this.state.password))
      return showError('Password should be 7-15 alpha-numeric characters!', '' , this.passwordInput)
      
    let formData = new FormData();
    for ( let i in this.state )
      formData.append(i, this.state[i]);


    await fetch(API.login, {
      method: 'POST',
      body: formData,
    }).then(res => res.json()  ).then(  res =>{  
      
        // console.log(res);
      if( res.status != 200) 
        Alert.alert(res.user_msg) 
      else{
         AsyncStorage.setItem('userData', JSON.stringify(res.data));
         Alert.alert(res.user_msg);
   
        //  _getAccount(res.access_token);
         
    this.props.navigation.navigate('Home');

      } 
        
      
      }
    
    
    
    
    
    );


  //   await fetch( 'https://reqres.in', {
  //       method: 'POST',
  //       // headers: {
  //       //   'email' : 'swapnil',
  //       //   'password': 'asdajsn'
  //       // },
  //       headers: {},
  //       body: 
  //     //   {
  //     //     "email": "peter@klaven",
  //     //     "password": "cityslicka"
  //     // },
  //       JSON.stringify(this.state),
  //       // this.state,
  //   }).then(  
  //     res => {console.log(res); res.json()},
  //     rej => console.log(rej) 
  //   ).then( res => console.log(res), 
  // rej => console.log(rej) );


    // await fetch(API.login, {
    //   method: 'POST',
    //   headers: {
    //   // Accept: 'application/json',
    //   //         'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: "Kannan.Maravar@wwindia.com", password: "KannanMaravar123" }) ,} )
    // .then( (data) => data.json())
    // .then( (data) =>{ 
    // // console.log(data, this.state)
    //   Alert.alert(data.message)
    // }
    // ).catch(
    //   () => { console.warn('Error in the APi')}
    // );

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(response => response.json())
    // .then(json => Alert.alert( JSON.stringify(  json)))


    // fetch(API.login, {
    //   method: 'POST',
    //   body: JSON.stringify( { email: 'foo', password: 'bar'}),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     // 'email' : 'foo',
    //     // 'password' :  'bar',
    //   }
    // })
    // .then(response => response.json())
    // .then((json) => {console.log(json); Alert.alert( JSON.stringify(json)) } )


    // Promise.all();
    // if( this.state.email !== '' &&  this.state.password !== '' )
      // this.props.navigation.navigate('Home');
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
    );
  }
}