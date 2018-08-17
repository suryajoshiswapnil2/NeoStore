import React, { Component } from 'react'
import {View, AsyncStorage, Text,StatusBar,FlatList,ActivityIndicator, TouchableOpacity} from 'react-native'
import {CustomHeader} from '../../header/header'

import {styles} from './styles'
import { API, apiCall } from '../../../lib/api';
import { showError } from '../../../utils/validators'
import { userData } from '../../../lib/serviceProvider';

export default class MyOrders extends Component {

    constructor(props)
    {
        super(props)
        this.state ={
            isLoading : true,
            // access_token: '',
            data:[],
        }
    }

    renderPrice = (value) => {
        return (<View style={styles.costContainer}>
                    <Text style={styles.icon}>&#8377; </Text>
                    <Text style={styles.cost}>{value}.00</Text>
                </View>)
    } 


    componentDidMount = async () => {
        
                    
    //    let data = await AsyncStorage.getItem('access_token');
        

       try{
            apiCall(API.orderList, {
                method: 'GET',
                headers: {
                    access_token: userData.user_data.access_token
                }
            }, (res) => {
                if (res.status == 200) {
                    console.log(res)
                    this.setState({
                        isLoading: false,
                        data: res.data,      
                    });
                }
                else {
                showError(res.user_msg)
                this.setState({
                    isLoading: false
                })
                }
            })
        }
        catch(err){
            console.log(err)
        }
        // return fetch(API.orderList,{
        //     method: 'GET',
        //     headers: {
        //         access_token: data
        //     }
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //   if (responseJson.status == 200) {
        //       console.log(responseJson)
        //     this.setState({
        //         isLoading: false,
        //         data: responseJson.data,      
        //     });
        // }
        //   else {
        //      showError(responseJson.user_msg)
        //      this.setState({
        //         isLoading: false
        //     })
        //   }
        // })
        // .catch((error) =>{
        //   console.error(error);
        // });

    }

    render(){

        // let dummy = [{key: 'a', id: 15, cost: 1554, created: '8 aug 2018'},{key: 'b', id: 1984, cost: 1554, created: '8 aug 2018'}]

        if(this.state.isLoading){
            return(
                <View style={{ flex:1, paddingTop: 22 }}>
                <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.navigate('Home')}} title='My Orders' rightIcon='search'/>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='blue' />    
                </View>    
            </View>
            )
          }

        return(
            
            <View style={styles.container}>
            {/* <StatusBar barStyle = 'dark-content' hidden={false} /> */}
            <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.navigate('Home')}} title='My Orders' rightIcon='search'/>
            <View style={styles.mainContainer}>
            { this.state.data.length == 0 ? <Text>No products in list</Text> : 
                <FlatList 
                    data={this.state.data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => 
                <TouchableOpacity onPress={ () => { this.props.navigation.navigate('OrderDetail', { order_id: item.id })}}>    
                    <View style={styles.boxContainer}>
                            <View style={styles.left}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.upperText}>Order ID: {item.id}</Text>
                                </View>
                                <View style={styles.textBottomContainer}>
                                    <Text style={styles.bottomText}>Ordered Date: {item.created}</Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                    {/* <Text style={styles.cost}>&#8377; {item.cost}</Text> */}
                                    {this.renderPrice(item.cost)}
                            </View>
                    </View>
                </TouchableOpacity>
                
                }
                />
            }
            </View>
            </View>  
        )
    }
}
