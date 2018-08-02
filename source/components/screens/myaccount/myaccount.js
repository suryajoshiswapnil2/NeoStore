/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text,Image, TextInput, AsyncStorage, TouchableOpacity,ImageBackground,ScrollView, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, StatusBar  } from 'react-native';
import {background} from '../../../assets/images';
import Header from '../../header/header'
import {user} from '../../../assets/images'
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-navigation'; 
import {API} from '../../../lib/api';

export default class MyAccount extends Component{

 constructor(props){
      super(props);
  this.state ={
    first_name: '',
    last_name: '',
    email: '',
    email: '',
    phone_no: '',
    dob: '',
    profile_pic: '',
  }

     // this.state = JSON.parse ( AsyncStorage.getItem('userData') );
    }

    async componentDidMount(){

      let data = await AsyncStorage.getItem('userData');
      data = JSON.parse(data);
    //  this.state.data = data;
    //alert(data);
      this.setState( data )
          
      }


  render() {
    const {navigate} = this.props.navigation;
    return (
      
    <ImageBackground style={styles.mainContainer} source={background} >
    <Header title='My Account' back={()=>{this.props.navigation.navigate('Home')}}/>
    {/* <SafeAreaView style={styles.mainContainer}> */}
    <StatusBar barStyle = 'light-content'  hidden={false}/>

  
    {/* <ScrollView> */}
      {/* <KeyboardAvoidingView style={ styles.container} behavior='position' enabled> */}
      {/* <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    > */}

       <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
       <View style={{ flex:1,}}>
       <View style={ styles.containerHalf}>
       <View style={styles.imageHolder}>
          <Image style={styles.image} source= { this.state.profile_pic == null ? user : {uri: this.state.profile_pic}  }/>
       </View> 
          <View style={styles.inputBoxes}>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={20} color="white" />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                selectTextOnFocus={false}
                editable={false}
                value={this.state.first_name}
                placeholderTextColor='#ffffff'
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                selectTextOnFocus={false}
                editable={false}
                placeholder="Last Name"
                value={this.state.last_name}
                placeholderTextColor='#ffffff'
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="envelope" size={20} color="white" />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={this.state.email}
                selectTextOnFocus={false}
                editable={false}
                placeholderTextColor='#ffffff'
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="mobile" size={20} color="white" />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={this.state.phone_no}
                selectTextOnFocus={false}
                editable={false}
                placeholderTextColor='#ffffff'
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="birthday-cake" size={20} color="white" />
            <TextInput
                style={styles.input}
                placeholder="DOB"
                value={this.state.dob == null ? ' ' : this.state.dob  }
                selectTextOnFocus={false}
                editable={false}
                placeholderTextColor='#ffffff'
            />
          </View>
          </View>
          <TouchableOpacity 
              style={styles.loginButton}  
              onPress={ () => {  navigate('EditProfile')}}
              ref={(input) => { this.loginButton = input; }}>
              <Text style={{ color: '#e91c1a', fontSize: 20 }}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
      
    <View style={styles.containerHalfBottom}>
        <TouchableOpacity 
              style={styles.loginButtonSquare}  
              onPress={() => {  navigate('ResetPassword')}}
              ref={(input) => { this.loginButton = input; }}>
              <Text style={{ color: '#000', fontSize: 21 }}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>
  </View>
        </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
      {/* </ScrollView> */}
        {/* </SafeAreaView> */}
      </ImageBackground>
    );
  }
}