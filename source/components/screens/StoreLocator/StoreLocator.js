import React, { Component } from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {CustomHeader} from '../../header/header'
import {styles} from './styles'

import Feather from 'react-native-vector-icons/Feather'




export default class StoreLocator extends Component {

    constructor(props)
    {
        super(props)
        this.state ={
            isLoading : true,
        }
        this.addr = [{
            name:  'MUMBAI (HO)',
            addr: "The Ruby, Dadar, Mumbai-400 028, INDIA",
        },{
            name: 'MUMBAI',
            addr: '124 Unique Estate, Mumbai - 400 025, INDIA'
        },{
            name: 'NAVI MUMBAI',
            addr: 'Sigma IT Park, Navi Mumbai-400 701, INDIA'
        },{
            name: 'PUNE',
            addr: 'Infotech Park, Hinjewadi, Pune-411 057, INDIA' 
        }]
    }

    componentDidMount(){
        this.setState({
            isLoading: false,
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
                <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.navigate('Home')}} title='Store Locator' rightIcon='search'/>
                <View style={styles.mainContainer}>
                    <View style={styles.mapContainer}>
                        <Text>Google Map comming soon...</Text>
                    </View>
                    <View style={styles.addressHolder}>
                         {this.addr.map((elem, index) => {
                             return(
                                 <View style={styles.addrItem} key={index}> 
                                    <Feather color='#' name='map-pin' size={25}/>
                                    <View style={styles.text}>
                                        <Text style={styles.n}>{elem.name}</Text>
                                        <Text style={styles.ad}>{elem.addr}</Text>
                                    </View>
                                 </View>
                             )
                         })}   
                    </View>
                </View>
            </View>  
        )
    }
}
