import React, { Component } from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {CustomHeader} from '../../header/header'
import {styles} from './styles'

import Feather from 'react-native-vector-icons/Feather'
import MapView, {Marker} from 'react-native-maps';



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
            latlng: {
                latitude: 19.023371,
                longitude: 72.839545 ,
            }
        },{
            name: 'MUMBAI',
            addr: '124 Unique Estate, Mumbai - 400 025, INDIA',
            latlng: {
                latitude: 19.013514,
                longitude: 72.826486,
            }
        },{
            name: 'NAVI MUMBAI',
            addr: 'Sigma IT Park, Navi Mumbai-400 701, INDIA',
            latlng: {
                latitude: 19.137048 ,
                longitude: 73.006706,
            }
        },{
            name: 'PUNE',
            addr: 'Infotech Park, Hinjewadi, Pune-411 057, INDIA',
            latlng: {
                latitude: 18.591626,
                longitude: 73.737803,
            }
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
                    <CustomHeader leftIcon='chevron-left' style={{fontSize: 19,}} leftAction={ () => { this.props.navigation.navigate('Home')}} title='Store Locator' rightIcon='search'/>
                    <View style={styles.mainContainer}>
                        <ActivityIndicator size='large' color="#0000ff"/>
                    </View>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <CustomHeader leftIcon='chevron-left' style={{fontSize: 20,}} leftAction={ () => { this.props.navigation.navigate('Home')}} title='Store Locator' rightIcon='search'/>
                <View style={styles.mainContainer}>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            loadingEnabled= {true}
                            initialRegion={{
                                latitude: 19.137048,
                                longitude: 73.006706,
                                latitudeDelta: 1.1922,
                                longitudeDelta: 0.1421,
                            }}>
                            {this.addr.map((marker, index) => (
                                <Marker 
                                    key={index}
                                    coordinate={marker.latlng}
                                    title={marker.name}
                                    description={marker.addr}
                                />
                            ))}
                        </MapView>
                    </View>
                    <View style={styles.addressHolder}>
                         {this.addr.map((elem, index) => {
                             return(
                                 <View style={styles.addrItem} key={index}> 
                                    <Feather color='#333333' style={{paddingTop: 3}} name='map-pin' size={23}/>
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
