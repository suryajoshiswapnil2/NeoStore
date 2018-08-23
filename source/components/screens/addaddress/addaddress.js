// Complete

import React, { Component } from "react";
import * as Device from '../../../lib/globals'
import {validator, showError} from '../../../utils/validators'

import {
    View,
    AsyncStorage,
    Alert,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity
} from "react-native";

import { CustomHeader } from "../../header/header";
import { styles } from "./styles";
import { userData } from "../../../lib/serviceProvider";



export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            addr: '',
            landmark: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
        };
    }

    componentDidMount(){
        this.setState({
            isLoading: false,
        })
    }

    _add_addr = () => {
        
        if(validator.emptyField(this.state.addr))
            return showError('Please input address!', this.addr)
        if(validator.emptyField(this.state.landmark))
            return showError('Please input landmark!', this.land)
        if(validator.emptyField(this.state.city))
            return showError('Please input city!', this.city)
        if(validator.emptyField(this.state.state))
            return showError('Please input state', this._state)
        if(validator.emptyField(this.state.zip_code))
            return showError('Please input zip code!', this.zip)
        if(validator.emptyField(this.state.country))
            return showError('Please input country!', this.country)
        if(validator.digitsOnlyZip(this.state.zip_code))
            return showError('Zip code can only have 6 integers!', this.zip)

        AsyncStorage.getItem('addr').then((r) => {

        let arr = []    
        if(r == null) {
            arr =  [{
                name: userData.user_data.first_name + ' ' + userData.user_data.last_name,
                addr: this.state.addr,
                landmark: this.state.landmark,
                city: this.state.city,
                state: this.state.state,
                zip_code: this.state.zip_code,
                country: this.state.country,
            }];
            AsyncStorage.setItem('addr', JSON.stringify(arr))

            Alert.alert('Info','Address added Successfully!', 
            [
                {text:'Ok', onPress: () => { 
                    this.props.navigation.goBack();
                } }
            ]
            )  
        }
        else {
            arr = JSON.parse(r)
            arr = 
            arr.concat(
                [{
                name: userData.user_data.first_name + ' ' + userData.user_data.last_name,    
                addr: this.state.addr,
                landmark: this.state.landmark,
                city: this.state.city,
                state: this.state.state,
                zip_code: this.state.zip_code,
                country: this.state.country,
            }]
        )
            AsyncStorage.setItem('addr', JSON.stringify(arr))
            Alert.alert('Info','Address added Successfully!', 
            [
                {text:'Ok', onPress: () => { 
                    this.props.navigation.goBack();
                } }
            ]
            )  
        }

        })
    }

    render() {

        // let arr = [ { 
        //     title: 'ADDRESS',
        //     isMultiline: true,
        //     isFullScreen: true,
        //     placeholder: '',
        // },  
        // { 
        //     title: 'LANDMARK',
        //     isMultiline: false,
        //     isFullScreen: true,
        //     placeholder: '',
        // }, 
        // { 
        //     title: 'CITY',
        //     isMultiline: false,
        //     isFullScreen: false,
        //     placeholder: '',
        // }, 
        // { 
        //     title: 'STATE',
        //     isMultiline: false,
        //     isFullScreen: false,
        //     placeholder: '',
        // }, 
        // { 
        //     title: 'ZIP CODE',
        //     isMultiline: false,
        //     isFullScreen: false,
        //     placeholder: '',
        // },
        // { 
        //     title: 'COUNTRY',
        //     isMultiline: false,
        //     isFullScreen: false,
        //     placeholder: 'INDIA',
        // },  
        
        // ]

        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <CustomHeader
                        leftIcon="angle-left"
                        style={{ fontSize: 20 }}
                        leftAction={() => {
                            this.props.navigation.goBack();
                        }}
                        title="Add Address"
                        rightIcon="search"
                    />    
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size='large' color='#00f'/>
                    </View>
                </View>
            )
        }

        return (
        <View style={styles.container}>
            
            <CustomHeader
                leftIcon="angle-left"
                style={{ fontSize: 20 }}
                leftAction={() => {
                    this.props.navigation.goBack();
                }}
                title="Add Address"
                rightIcon="search"
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView >
            <KeyboardAvoidingView behavior={Device.isIOS? 'position' : 'padding' } enabled>
            <View style={styles.mainContainer}> 
                <View style={styles.inputContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>ADDRESS</Text>
                    </View>
                    <View style={styles.input} >
                            <TextInput
                                style={[styles.full,styles.multi,]}
                                multiline={true} 
                                placeholder='ADDRESS'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                numberOfLines={5}
                                autoCorrect={false}
                                // autoFocus={true}
                                returnKeyType='next'
                                onSubmitEditing= { () => this.land.focus()}
                                ref={t => this.addr = t}
                                onChangeText={ (t) => this.setState({ addr: t})}
                            />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>LANDMARK</Text>
                    </View>
                    <View style={styles.input} >
                            <TextInput
                                style={[styles.full, styles.single]}
                                multiline={false} 
                                placeholder='LANDMARK'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                ref= {(input) => this.land = input}
                                onSubmitEditing= { () => this.city.focus()}
                                onChangeText={ (t) => this.setState({ landmark: t})}
                            />
                    </View>
                </View> 
                <View style={styles.inputRowContainer}>
                    <View style={[styles.inputContainer, {marginRight: 15}]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>CITY</Text>
                        </View>
                        <View style={styles.input} >
                            <TextInput
                                style={[styles.half, styles.single]}
                                multiline={false} 
                                placeholder='CITY'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                ref= {(input) => this.city = input}
                                onSubmitEditing= { () => this._state.focus()}
                                onChangeText={ (t) => this.setState({ city: t})}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>STATE</Text>
                        </View>
                        <View style={styles.input} >
                            <TextInput
                                style={[styles.half, styles.single]}
                                multiline={false} 
                                placeholder='STATE'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                ref= {(input) => this._state = input}
                                onSubmitEditing= { () => this.zip.focus()}
                                onChangeText={ (t) => this.setState({ state: t})}
                            />
                        </View>
                    </View>
                </View> 
                <View style={styles.inputRowContainer}>
                    <View style={[styles.inputContainer, {marginRight: 15}]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>ZIP CODE</Text>
                        </View>
                        <View style={styles.input} >
                            <TextInput
                                style={[styles.half, styles.single]}
                                multiline={false} 
                                placeholder='ZIP CODE'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                maxLength={6}
                                keyboardType='numeric'
                                ref= {(input) => this.zip = input}
                                onSubmitEditing= { () => this.country.focus()}
                                onChangeText={ (t) => this.setState({ zip_code: t})}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>COUNTRY</Text>
                        </View>
                        <View style={styles.input} >
                            <TextInput
                                style={[styles.half, styles.single]}
                                multiline={false} 
                                placeholder='COUNTRY'
                                placeholderTextColor= '#333333'
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='done'
                                ref= {(input) => this.country = input}
                                onChangeText={ (t) => this.setState({ country: t})}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor:'red' }]}  onPress={() => {this._add_addr()}}>
                        <Text style={[styles.buttonText, {fontWeight: 'bold', textAlign:'center'}]} >SAVE ADDRESS</Text>
                    </TouchableOpacity>
                </View> 
            </View> 
            </KeyboardAvoidingView>
            </ScrollView>
            </TouchableWithoutFeedback> 
        </View>
        );
  }
}
