/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,StatusBar, Image  } from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation'; 
import {CustomHeader} from '../../header/header'
import * as Images from '../../../assets/images' 
// import {Header} from 'react-native-elements';

import Swiper from 'react-native-swiper'

export default class Home extends Component{
  static navigationOptions = {
    drawerLabel: 'Home Screen',
    drawerIcon: ({ tintColor }) => (
      // <Image
      //   source={require('../../../assets/images/icon.png')}
      //   style={[styles.icon, {tintColor: tintColor}]}
      // />
      <Icon name='lock' size={20} style={[styles.icon, {tintColor: tintColor}]} /> 
    ),
  };

  render() {

    const {navigate } = this.props.navigation;
    
    return (
       <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle = 'dark-content' hidden={false}/>
      <CustomHeader leftIcon='menu' leftAction={this.props.navigation.openDrawer} title="NeoSTORE"  rightIcon='search'/>
   
      <View style={styles.containerHalf}>
     <Swiper style={styles.wrapper} showsButtons={true}>
      <View >
          <Image source={Images.slide1}   style={{resizeMode:'cover', height:'100%', width:'100%'}} ></Image>
        </View>
        <View >
        <Image source={Images.slide2} style={{resizeMode:'cover', height:'100%', width:'100%'}}></Image>
        </View>
        <View >
        <Image source={Images.slide3 } style={{resizeMode:'cover', height:'100%', width:'100%'}}></Image>
        </View>  
      </Swiper>
      </View>
      <View style={ styles.containerHalfBottom }>
      <View style={styles.containerBox}>
          <TouchableOpacity style={[styles.box1,]} >
            <Text style={{textAlign: 'right' ,fontWeight: '500', fontSize: 25, color: '#ffffff' }}>Tables</Text>
            <Icon name='tablet' style={{textAlign: 'left' }} color="#ffffff" size={80} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box1,]}>
            <Icon style={{textAlign: 'right' }} name='clipboard' color="#ffffff" size={80} />
            <Text style={{textAlign: 'left',fontWeight: '500' , fontSize: 25, color: '#ffffff' }}>Sofas</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.containerBox}>
          <TouchableOpacity style={[styles.box2,]}>
            <Text style={{textAlign: 'left',fontWeight: '500', fontSize: 25,  color: '#ffffff' }}>Chairs</Text>
            <Icon name='wheelchair' color="#ffffff" style={{textAlign: 'right' }} size={80} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box2,]}>
          <Icon name='desktop' style={{textAlign: 'left' }} color="#ffffff" size={80} />
            <Text style={{textAlign: 'right',fontWeight: '500' , fontSize: 25, color: '#ffffff' }}>Cupboards</Text>
          </TouchableOpacity>
      </View>
      </View>
      </SafeAreaView>
    );
  }
}
