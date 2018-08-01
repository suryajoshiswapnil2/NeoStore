/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Image, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather'
 
import {SafeAreaView, DrawerItems, } from 'react-navigation'; 
import {slide1} from '../../../assets/images'


export default class SideBar extends Component{

  render() {
    // const {navigate} = this.props.navigation;
    return (

  <SafeAreaView style={styles.container}>
  <StatusBar barStyle = 'light-content' hidden={false}/>
      <View style={styles.profileContainer}>
        <Image source={slide1} style={styles.profileAvatar}/>
        <Text style={styles.title}>Swapnil Suryajoshi</Text>
        <Text style={styles.email}>{this.props.email ? this.props.email : 'suryajoshiswapnil@gmail.com'}</Text>
      </View>
     
      <View style={styles.containerBottom}>
        {/* <DrawerItems {...this.props.pro}/> */}
        <ScrollView>
        <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='shopping-cart' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>My Carts</Text>
            <Text style={styles.notifications}>2</Text>
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
        <TouchableOpacity style={styles.drawerItems}>
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
        <TouchableOpacity style={styles.drawerItems}>
            <FeatherIcon style={styles.drawerIcon} name='log-out' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Logout</Text>
            
        </TouchableOpacity>
        </ScrollView>
      </View>
      </SafeAreaView>

    );
  }
}