import React, { Component } from 'react'
import {View,AsyncStorage,Alert,Text,StatusBar,Image,ActivityIndicator,ScrollView, TouchableOpacity} from 'react-native'
import {CustomHeader} from '../../header/header'

import {styles} from './styles'
import { API, apiCall } from '../../../lib/api';
import { showError } from '../../../utils/validators'
import Feather from 'react-native-vector-icons/Feather'
import { SwipeListView } from 'react-native-swipe-list-view'
import ModalDropdown from 'react-native-modal-dropdown';

export default class MyCart extends Component {

    constructor(props)
    {
        super(props)
        this.state ={
            isLoading : true,
            access_token: '',
            data:[],
            total: 0,
            product_quantity: 0,
        }
    }


    closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

    // Delete row from flatlist 
    // Accept Two arguments rowMap which contain data and Key for identification
    _deleteItem = async (rowMap, rowKey) => {

        Alert.alert(
            'Delete Item',
            'Are you sure to delete this item from cart!',
            [
              {text: 'Cancel', onPress: () => null, style: 'cancel'},
              {text: 'Delete', onPress:async () => {


                    this.setState({
                        isLoading: true,
                    })

                    let formData = new FormData()
                    formData.append('product_id', rowKey)


                    apiCall(API.deleteCart, { 
                        method: 'POST',
                        headers: {
                            access_token: this.state.access_token
                        },
                        body: formData
                    }, (res) => {
                        console.log(res)
                        if(res.status == 200)
                        {
                            this.closeRow(rowMap, rowKey);
                            const newData = [...this.state.data];
                            const prevIndex = this.state.data.findIndex(item => item.key === rowKey);
                            newData.splice(prevIndex, 1);
                            this.setState({data: newData});
                            alert(res.user_msg)
                            this.setState({
                                isLoading: false,
                            })
                            this.render()
                        }
                        else{
                            alert(res.user_msg)
                            this.setState({
                                isLoading: false,
                            })
                        }
                    })

                    // await fetch(API.deleteCart, {
                    //     method: 'POST',
                    //     headers: {
                    //         access_token: this.state.access_token
                    //     },
                    //     body: formData
                    // })
                    // .then( res => res.json())
                    // .then( res => {
                    //     console.log(res)
                    //     if(res.status == 200)
                    //     {
                    //         this.closeRow(rowMap, rowKey);
                    //         const newData = [...this.state.data];
                    //         const prevIndex = this.state.data.findIndex(item => item.key === rowKey);
                    //         newData.splice(prevIndex, 1);
                    //         this.setState({data: newData});
                    //         alert(res.user_msg)
                    //         this.setState({
                    //             isLoading: false,
                    //         })
                    //         this.render()
                    //     }
                    //     else{
                    //         alert(res.user_msg)
                    //         this.setState({
                    //             isLoading: false,
                    //         })
                    //     }
                    // })
                    // .catch(err => console.log(err))
              } },
            ],
            { cancelable: false }
        ) 
        
      
    }

    componentDidMount = async () => {
      
       let data = await AsyncStorage.getItem('access_token');

       this.setState( { 
         access_token: data,   
       } )


       return apiCall(API.listCartItems, {
            method: 'GET',
            headers: {
                access_token: data
            }
            }, (res) => {
            if (res.status == 200) {
                // console.log(res)
                this.setState({
                    isLoading: false,
                    data: res.data,      
                });
                if(res.data == null)
                    return
                this._cal_total()
            }
            else {
                showError(res.user_msg)
                this.setState({
                    isLoading: false
                })
            }
       })


        // return fetch(API.listCartItems,{
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
        //     if(responseJson.data == null)
        //         return
        //     this._cal_total()
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

    _cal_total = () => {
        if(this.state.data == null)
            this.setState({
                total: 0
            })
        let total = 0
        this.state.data.forEach(elem => {
            total += ( elem.quantity * elem.product.cost )
        })
        this.setState({
            total: total
        })
    }

    render(){

        let data = [
            { value: 1, }, 
            { value: 2, }, 
            { value: 3, },
            { value: 4, }, 
            { value: 5, }, 
            { value: 6, },
            { value: 7, }, 
            { value: 8, } 
        ];

        if(this.state.isLoading){
            return(
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size='large' color="#0000ff"/>
                </View>
            )
          }

        return(
            
            <View style={styles.container}>
            <StatusBar barStyle = 'light-content' hidden={false} />
            <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.goBack()}} title='My Cart' rightIcon='search'/>
            
            { this.state.data == null ?
                (<View style={styles.mainContainer}>
                    <Text>No products in list</Text>
                </View> )
                : 
                (<ScrollView style={{flex: 1}}>
                <SwipeListView
                    useFlatList 
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
                                <View style={{ width: 96,}}>
                                    <ModalDropdown 
                                        dropdownStyle={{width: 100,}} 
                                        style={{width: 50, fontSize: 25, padding: 5,  height: 30, backgroundColor: '#ededed', alignItems: 'center'}} 
                                        options={[1,2,3,4,5,6,7,8,9]}
                                        onSelect= { (index, value) => {this.setState({
                                            product_quantity: value,
                                        })
                                        
                                    }}
                                        >
                                        <View style={{flexDirection: 'row'}}> 
                                            <Text style={{fontSize: 16}}>{item.quantity} </Text>
                                            <Feather name='chevron-down' size={20} />
                                        </View>
                                    </ModalDropdown>
                                </View>
                                    
                                    {/* <Text style={styles.cost}>{item.quantity}</Text> */}
                                    <Text style={styles.cost}>&#8377; {item.product.cost * item.quantity }.00</Text>
                                </View>
                            </View>
                    </View>
                    }
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity onPress={() => { this._deleteItem(rowMap, data.item.product_id) }}>
                                <Feather name='trash' style={styles.iconDelete} size={25}></Feather>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                    keyExtractor={ item => item.product.id.toString() } 
                />
            
                <View style={styles.totalContainer}>
                       <Text style={styles.total}>TOTAL</Text>
                       <Text style={styles.total}>&#8377; {this.state.total}.00</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]}  onPress={() => {this._addToCart()}}>
                        <Text style={[styles.buttonText, {fontWeight: 'bold', textAlign:'center'}]} >ORDER NOW</Text>
                    </TouchableOpacity>
                </View> 
                </ScrollView>)
            }
            </View>  
        )
    }
}
