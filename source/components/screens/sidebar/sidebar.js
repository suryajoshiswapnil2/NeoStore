/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Image, Text, TouchableOpacity,AsyncStorage, ScrollView, StatusBar } from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather'
 
import {SafeAreaView, DrawerItems, } from 'react-navigation'; 
import {user} from '../../../assets/images'


export default class SideBar extends Component{


constructor(props){

    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        img_url: '',
    }

}

   async componentDidMount(){

    let data = await AsyncStorage.getItem('userData');
    data = JSON.parse(data);
  //  this.state.data = data;
    this.setState( { 
        first_name : data.first_name, 
        last_name : data.first_name,
        email : data.email,
        img_url: data.profile_pic,
       // data : data,
    })
        
    }

  render() {
    const {navigate} = this.props.pro.navigation;
    return (

  <SafeAreaView style={styles.container}>
  {/* <StatusBar barStyle = 'light-content' hidden={false}/> */}
      <View style={styles.profileContainer}>
        <Image source={ this.state.img_url == null ? user : {uri: this.state.img_url } } style={styles.profileAvatar}/>
        <Text style={styles.title}>{this.state.first_name + ' ' + this.state.last_name}</Text>
        <Text style={styles.email}>{this.state.email}</Text>
      </View>
     
      <View style={styles.containerBottom}>
        {/* <DrawerItems {...this.props.pro}/> */}
        <ScrollView style={ { flex:1}}>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='shopping-cart' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>My Carts</Text>
            <View style={styles.notifications}><Text style={styles.notifications}>2</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='tablet' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Tables</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='airplay' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Sofa</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='copy' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Chairs</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='sidebar' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Cupboards</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems} onPress= { () => navigate('MyAccount') }>
        <FeatherIcon style={styles.drawerIcon} name='user' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>My Account</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
            <Icon style={styles.drawerIcon} name='street-view' size={20} color='#fff' > </Icon>
            <Text style={styles.drawerText}>Store Locator</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='list' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>My Orders</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems} onPress= { () => navigate('Login') }>
            <FeatherIcon style={styles.drawerIcon} name='log-out' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Logout</Text>
            
        </TouchableOpacity>
        </ScrollView>
      </View>
      </SafeAreaView>

    );
  }
}