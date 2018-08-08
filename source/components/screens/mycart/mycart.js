import React, { Component } from 'react'
import {View,ScrollView,AsyncStorage, Keyboard,TextInput,Modal,TouchableWithoutFeedback, Share, Text,StatusBar,FlatList,Image,ActivityIndicator, TouchableOpacity} from 'react-native'
import {CustomHeader} from '../../header/header'

import {styles} from './styles'
import { API } from '../../../lib/api';
import { showError } from '../../../utils/validators'
import Feather from 'react-native-vector-icons/Feather'
import {Rating} from 'react-native-ratings'




export default class MyCart extends Component {

    constructor(props)
    {
        super(props)
        this.state ={
            isLoading : true,
            access_token: '',
            data:[],
            total: 0,
        }
    }

    componentDidMount = async () => {
        
                    
       let data = await AsyncStorage.getItem('userData');
   
       data = JSON.parse(data);

       this.setState( { 
         access_token: data.access_token,   
       } )

        return fetch(API.listCartItems,{
            method: 'GET',
            headers: {
                access_token: this.state.access_token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 200) {
              console.log(responseJson)
            this.setState({
                isLoading: false,
                data: responseJson.data,      
            });
            this._cal_total()
        }
          else {
             showError(responseJson.user_msg)
             this.setState({
                isLoading: false
            })
          }
        })
        .catch((error) =>{
          console.error(error);
        });

    }

    _cal_total = () => {
        let total = 0
        this.state.data.forEach(elem => {
            total += ( elem.quantity * elem.product.cost )
        })
        this.setState({
            total: total
        })
    }

    render(){

        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size='large' color="#0000ff"/>
                </View>
            )
          }

        return(
            
            <View style={styles.container}>
            <StatusBar barStyle = 'dark-content' hidden={false} />
            <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.goBack()}} title='My Cart' rightIcon='search'/>
            <View style={styles.mainContainer}>
            { this.state.data.length <= 0 ? <Text>No products in list</Text> : 
                <FlatList 
                    data={this.state.data}
                    renderItem={({item}) => 
                
                    <View style={styles.boxContainer}>
                            <View style={styles.left}>
                                <View style={styles.textContainer}>
                                    <Image source={{uri: item.product.product_images}} style={styles.images}/>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <View style={styles.rightContainer}>
                                    <Text style={styles.upperText}>{item.product.name}</Text>
                                    <Text style={styles.bottomText}>({item.product.product_category})</Text>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <Text style={styles.cost}>{item.quantity}</Text>
                                    <Text style={styles.cost}>&#8377; {item.product.cost * item.quantity }.00</Text>
                                </View>
                            </View>
                    </View>
                
                }
                />
            }
                <View style={styles.totalContainer}>
                       <Text style={styles.total}>Total</Text>
                       <Text style={styles.total}>&#8377; {this.state.total}</Text>
                </View>
            </View>
            </View>  
        )
    }
}
