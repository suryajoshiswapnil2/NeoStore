/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, TextInput, AsyncStorage, TouchableOpacity,ImageBackground, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import {background} from '../../../assets/images';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../../header/header";
import {API} from '../../../lib/api'
import {validator,showError} from '../../../utils/validators'
export default class ResetPassword extends Component{
 

  constructor(props) {

      super(props);
      this.state ={
        access_token: '',
        old_password: '',
        password: '',
        confirm_password: '',
      }

  }



  _resetPassword = async () => {

    if( validator.emptyField(this.state.old_password) )
    return showError('Old password is empty!')
  else if(validator.emptyField(this.state.password))
    return showError('Password is empty!')
  else if( validator.emptyField(this.state.confirm_password))
    return showError('Confirm password field is empty!')
  else if( validator.passConfirm(this.state.password, this.state.confirm_password))
    return showError('New password and confirm password mismatched!')


    let accountData = {}
    let formData = new FormData();

    formData.append('old_password', this.state.old_password)
    formData.append('password', this.state.password)
    formData.append('confirm_password', this.state.confirm_password)

   await fetch( API.changePassword, {
      method: 'POST',
      headers:  {
        access_token: this.state.access_token,
      },
      body: formData ,
    }).then(
      res => res.json()

    ).then(res => {
      
        if( res.status == 200)
        {
            alert(res.user_msg)
            this.props.navigation.goBack()
        }
        else
          alert(res.user_msg)

     } );
    





  };

  async componentDidMount(){

    let data = await AsyncStorage.getItem('userData');
    data = JSON.parse(data);
  //  this.state.data = data;
  // alert(data);
    this.setState( { 
      access_token: data.access_token,

    } )
       // console.log(data, this.state)
    }
 
 
  render() {
    const {navigate} = this.props.navigation;
    return (
    <ImageBackground style={styles.mainContainer} source={background} >
    <Header title='Reset Password' back={()=>{this.props.navigation.goBack()}}/>
    <StatusBar barStyle='light-content' hidden={false} />
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
      <View style={ styles.container}>
        <View style={ styles.containerHalf}>
          <Text style={ styles.logoTitle }>NeoSTORE</Text>
          <View style={styles.inputBoxes}>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="lock" size={20} color="white" />
            <TextInput
                autoCorrect = {false}
                autoCapitalize= 'none'
                style={styles.input}
                placeholder="Current Password"
                maxLength= {15}
                placeholderTextColor='#ffffff'
                keyboardType= 'email-address'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({old_password: text})}
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
                onChangeText={(text) => this.setState({password: text})}
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
                onChangeText={(text) => this.setState({confirm_password: text})}
            />
          </View>
          </View>
          <TouchableOpacity style={styles.loginButton}  onPress={this._resetPassword}>
              <Text style={{ color: '#e91c1a', fontSize: 20 , fontWeight: 'bold'}}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}