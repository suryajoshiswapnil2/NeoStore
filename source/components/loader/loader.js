import React, { Component } from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import CustomHeader, { Header } from '../header/header'


import {styles} from './styles'

export default class Loader extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <View style={{ flex:1, paddingTop: 22 }}>
                <CustomHeader
                    leftIcon="menu"
                    leftAction={this.props.navigation.openDrawer}
                    title="NeoSTORE"
                    rightIcon="search"
                    />
                <View style={{flex:1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='blue' />    
                </View>    
            </View>
        )
    }
}
