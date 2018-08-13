import React, { Component } from "react";
import {validator, showError} from '../../../utils/validators'
import {
    View,
    AsyncStorage,
    Alert,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";

import  {userData} from '../../../lib/serviceProvider'

import { CustomHeader } from "../../header/header";

import { styles } from "./styles";



export default class AddressList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount(){

        let addr_arr = AsyncStorage.getItem('addr')
        console.log(addr_arr)

        this.setState({
            isLoading: false,
        })
    }

    render() {

        if(this.state.isLoading){

            return ( <View style={styles.loaderContainer}>
                        <ActivityIndicator size='large' color='#00f'/>
                    </View> )
        }

        return (
        <View style={styles.container}>
            <CustomHeader
                leftIcon="chevron-left"
                style={{ fontSize: 19 }}
                leftAction={() => {
                    this.props.navigation.navigate('Home');
                }}
                title="Add Address"
                rightIcon="plus"
                rightAction= { () => { this.props.navigation.navigate('AddAddress')}}
            />
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Shipping Address</Text>
                </View>
                <View style={styles.addressContainer}>
                    <TouchableOpacity onPress={this.doSomething}> 
                        <View style={styles.radioButton}>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.name}>{userData.user_data.first_name} {userData.user_data.last_name}</Text>
                        <Text style={styles.address}>Amravati, Amravati, Maharashtra, INDIA</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]}  onPress={() => {this._add_addr()}}>
                        <Text style={[styles.buttonText, {fontWeight: 'bold', textAlign:'center'}]} >PLACE ORDER</Text>
                    </TouchableOpacity>
                </View> 
            </View>    
        </View>
        );
  }
}
