/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, ActivityIndicator, ScrollView, TextInput, TouchableOpacity,ImageBackground,StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import {background} from '../../../assets/images';
import {SafeAreaView} from 'react-navigation'; 
import {styles} from './styles';
import Icon from '../../../utils/icon';

import Header from "../../header/header";
import * as Device from '../../../lib/globals'

import {API, post} from '../../../lib/api';
import {validator,showError} from '../../../utils/validators'
 

export default class Register extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      fname: '',
      lname: '',
      mobile: '',
      email: '',
      password: '',
      cpasword: '',
      gender: '',
      agreed: false,
      checked1: false,
      checked2: false,
    }
    
  }
  

  _doRegister =  async () => 
  {

    // for ( let i in this.state)
    //     if( validator.emptyField(this.state[i]) )
    //         return showError(i + ' field is empty!')


    if( validator.emptyField(this.state.fname) )
      return showError('please input first name!')
    else if(validator.emptyField(this.state.lname))
      return showError('please input last name!')
    else if(validator.emptyField(this.state.email))
      return showError('please input email address!')
    else if(validator.emptyField(this.state.password))
      return showError('please input password!')
    else if(validator.emptyField(this.state.cpasword))
      return showError('please input cofirm password!')
    else if( validator.emptyField(this.state.mobile))
      return showError('please input mobile number!')
    else if( validator.emailField(this.state.email))
      return showError('Invalid email address!')
    else if(this.state.gender == '' )
      return showError('please select gender');
    else if( this.state.agreed == '')
      return showError('please agree terms and condition');
    else{
      if(this.state.password != this.state.cpasword)
        return showError('password and confirm password mismatched!');
      else
      {

        this.setState({
            loading: true,
        })

        let formData = new FormData();
        let data = {
          first_name: this.state.fname,
          last_name: this.state.lname,
          email:this.state.email,
          password: this.state.password,
          confirm_password: this.state.cpasword,
          gender: this.state.gender[0],
          phone_no: this.state.mobile,
        }
        
        for (let i in data)
            formData.append(i, data[i]);    


        post(API.registration, {}, formData, (res) =>{ 
            alert(res.message)
            this.setState({
                loading: false,
            })
        } , err => {
            console.log(err)
            alert(err.message)
            this.setState({
                loading: false,
            })
        })
      }

    }
  };


  render() {
    return (
      
    <ImageBackground style={styles.mainContainer} source={background} >
    <Header title='Register' back={()=>{this.props.navigation.goBack()}} />
    <StatusBar barStyle = 'light-content' hidden={false}/>
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled = {Device.isIOS ? true : false}>     
    <ScrollView  
       showsVerticalScrollIndicator={false}
       style={styles.scrollContainer} 
       scrollEnabled= { Device.isAndroid ? true : true} >
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
                placeholder="First Name"
                maxLength= {20}
                placeholderTextColor='#ffffff'
                // keyboardType= 'default'
                returnKeyType ='next' 
                onSubmitEditing={() => { this.lastNameInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({ fname: text  })}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="user" size={20} color="white" />
            <TextInput
                style={ styles.input }
                autoCorrect = {false}
                autoCapitalize= 'none' 
                maxLength= {20}
                placeholder="Last Name"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                ref={(input) => { this.lastNameInput = input; }}
                onSubmitEditing={() => { this.emailInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({lname: text })}
            />
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="email" size={20} color="white" />
            <TextInput
                style={ styles.input } 
                maxLength= {50}
                autoCorrect = {false}
                autoCapitalize= 'none'
                placeholder="Email"
                placeholderTextColor='#ffffff'
                returnKeyType ='next' 
                keyboardType='email-address'
                ref={(input) => { this.emailInput = input; }}
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({ email: text   })}
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
                returnKeyType ='next' 
                ref={(input) => { this.passwordInput = input; }}
                onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({ password : text})}
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
                returnKeyType ='next' 
                // keyboardType='default'
                ref={(input) => { this.confirmPasswordInput = input; }}
                onSubmitEditing={() => { this.mobileInput.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => this.setState({  cpasword: text  })}
            />
          </View>
          <View style={ styles.genderContainer}>
            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold'}}>Gender</Text>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.radioContainer} 
                onPress= { () =>  { 
                    this.setState( { checked1: true, checked2: false, gender: 'Male'}); 
                  }} >
                <View style={[styles.circle, this.state.checked1 ? {backgroundColor: 'rgba(256,256,256,1.0)',} : {backgroundColor: 'rgba(256,256,256,0)',}, ]} >
            </View>
            <View>
                <Text style={ { color: "#fff", fontSize: 17, marginRight: 10, fontWeight: 'bold' }}>Male</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioContainer} 
                onPress= { () =>  { 
                    this.setState(  { checked2: true, checked1: false, gender: 'Female' }); 
                  }} >
                <View style={[styles.circle, this.state.checked2 ? {backgroundColor: 'rgba(256,256,256,1.0)',} : {backgroundColor: 'rgba(256,256,256,0)',}, ]} >
            </View>
            <View>
                <Text style={ { color: '#fff', fontSize: 17, marginRight: 10, fontWeight: 'bold' }}>Female</Text>
            </View>
             </TouchableOpacity>
            </View>
            {/* <RadioGroup data={this.state.genderState} onPress={this.doRadio}>
            <Radio label='Male' id='1' onPress={this.doRadio} data={this.state.genderState} onPress={this.doRadio} checked={this.state.genderState.option1.checked} color='#ffffff' />
            <Radio label='Female' id='2' data={this.state.genderState} checked={this.state.genderState.option2.checked} onPress={this.doRadio}   checked={false} color='#ffffff' />
            </RadioGroup> */}
          </View>
          <View style={ styles.inputContainer }>
            <Icon style={styles.icons}  name="mobile" size={20} color="white" />
            <TextInput
                style={ styles.input }
                autoCorrect = {false}
                autoCapitalize= 'none' 
                maxLength= {13}
                placeholder="Phone Number"
                placeholderTextColor='#ffffff'
                returnKeyType ='done' 
                // onSubmitEditing={() => { this.firstNameInput.focus(); }}
                keyboardType={Device.isAndroid ? 'phone-pad' : 'default' }
                ref={(input) => { this.mobileInput = input; }}
                // blurOnSubmit={false}
                onChangeText={(text) => this.setState({  mobile: text  })}
            />
          </View>
          <View style={ styles.termsContainer}>
          <TouchableOpacity style={styles.radioContainer} onPress= { () =>  {  this.setState( {  agreed: !this.state.agreed  })}  } >
            <View style={styles.checkboxContainer}>
            <View style={[styles.square, this.state.agreed ? {backgroundColor: 'rgba(256,256,256,1.0)',} : {backgroundColor: 'rgba(256,256,256,0)',}, ]} ></View>
            </View>
            <View  style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}} >
                {/* <Text style={ { color: this.props.color, fontSize: 17, marginRight: 10, fontWeight: 'bold' }}>{this.props.label}</Text> */}
            <Text style={{ textAlign: 'center' ,color: '#ffffff', fontWeight: 'bold'}}>I agree the <Text style={{textDecorationLine:'underline'}}>Terms & conditions</Text></Text>
                <Text style={{marginLeft: 10}}>{this.props.children}</Text>
            </View>
        </TouchableOpacity>
            {/* <CheckBox checked={false}   color='#ffffff' style={{marginRight: 10,}} > 
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>I agree the <Text style={{textDecorationLine:'underline'}}>Terms & conditions</Text></Text>
           </CheckBox> */}
          </View>
          </View>
          <TouchableOpacity style={styles.loginButton}  onPress={this._doRegister}>
          {this.state.loading ? <ActivityIndicator size='small' color='blue' /> : <Text style={{ color: '#e91c1a', fontSize: 20, fontWeight: 'bold'}}>REGISTER</Text>}
          </TouchableOpacity>
        </View>
        
      </View>
      </TouchableWithoutFeedback>  
      </ScrollView>
      </KeyboardAvoidingView>
      

      </ImageBackground>
     
    );
  }
}