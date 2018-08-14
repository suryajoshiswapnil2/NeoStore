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

import Feather from 'react-native-vector-icons/Feather'


import  {userData} from '../../../lib/serviceProvider'

import { CustomHeader } from "../../header/header";

import { styles } from "./styles";



export default class AddressList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            addr_arr: [],
            selected: 0,
        }
        this.deleteItem.bind(this)
        
    }
 

    componentDidMount(){

        AsyncStorage.getItem('addr').then(val => {
            this.setState({
                addr_arr: JSON.parse(val), 
                isLoading: false,
            })
        })

    }

    deleteItem = (index) => {

        Alert.alert(
            'Delete address', 
            'Are you sure to delete?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Delete', onPress: () =>   {

                        this.setState({
                            addr_arr: this.state.addr_arr.filter(( _, i ) => i !== index ) 
                        })
                        // Make Permanent changes to AsyncStorage
                        // AsyncStorage.setItem('addr', JSON.stringify(this.state.addr_arr))
                        
                }},
              ],
              { cancelable: false }
        )

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
                    this.props.navigation.goBack();
                }}
                title="Address List"
                rightIcon="plus"
                rightAction= { () => { this.props.navigation.navigate('AddAddress')}}
            />
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Shipping Address</Text>
                </View>
                {  this.state.addr_arr.length == 0 ? 

                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text>No Address in list, Please add.</Text>
                    </View>
                    :
                    this.state.addr_arr.map((elem ,index) => (
                        <View key={index} style={styles.addressContainer}>
                            <TouchableOpacity onPress={ () => this.setState({selected: index}) }> 
                                <View style={[styles.radioButton, this.state.selected == index ? styles.selected: null]}>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <Text style={styles.name}>{elem.name}</Text>
                                <Text style={styles.address}>
                                    {elem.addr}, {elem.landmark}, {elem.city}, {elem.state} - {elem.zip_code}, {elem.country}
                                </Text>
                                <TouchableOpacity onPress={() => this.deleteItem(index)} style={styles.delete} >
                                    <Feather name='x' color='#8e8e8e'  size= {20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                ))}
                { this.state.addr_arr.length != 0 ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]}  onPress={() => {this._add_add}}>
                            <Text style={[styles.buttonText, {fontWeight: 'bold', textAlign:'center'}]} >PLACE ORDER</Text>
                        </TouchableOpacity>
                    </View>                 
                    :
                    null
                }

            </View>    
        </View>
        );
  }
}
