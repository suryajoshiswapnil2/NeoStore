/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,StatusBar, Image,AsyncStorage, ImageBackground  } from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation'; 
import {CustomHeader} from '../../header/header'
import * as Images from '../../../assets/images' 
// import {Header} from 'react-native-elements';
import * as Device from '../../../lib/globals'
import {background} from '../../../assets/images'
import Swiper from 'react-native-swiper'
import {API} from '../../../lib/api'
import colors from '../../../utils/colors'

export default class Home extends Component{


  static navigationOptions = {
    drawerLabel: 'Home Screen',
    drawerIcon: ({ tintColor }) => (
      // <Image
      //   source={require('../../../assets/images/icon.png')}
      //   style={[styles.icon, {tintColor: tintColor}]}
      // />
      // <Icon name='lock' size={20} style={[styles.icon, Device.isIOS ?  {  tintColor: tintColor } : null]} /> 
      <Icon name='lock' size={20} style={styles.icon} /> 
      
    ),
  };

  constructor(props){
    super(props);
    this.state = {
        total_carts: 0,
        total_orders: 0,
    };
  }

 async componentDidMount() {

  let data = await AsyncStorage.getItem('data');
  data = JSON.parse(data);


}


  render() {

    const {navigate } = this.props.navigation;
    
    return (
      // <ImageBackground style={styles.mainContainer} source={background} ></ImageBackground>
       <View style={styles.mainContainer}>
      <StatusBar barStyle = 'dark-content' hidden={false} backgroundColor='red'/>
      <CustomHeader leftIcon='menu' leftAction={this.props.navigation.openDrawer} title='NeoSTORE'  rightIcon='search'/>
   
      <View style={styles.containerHalf}>
     <Swiper style={Device.isAndroid ? { width: Device.window.width } : null } showsButtons={true}> 
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
      <View style={styles.rowContainerBox}>
      <View style={styles.containerBox}>
          <TouchableOpacity style={[styles.box1, { backgroundColor: '#e91b1a'}]} onPress={() => navigate('ProductList', {title: 'Tables'})} >
            <Text style={{textAlign: 'right' ,fontWeight: '500', fontSize: 21, color: '#ffffff' }}>Tables</Text>
            <Icon name='tablet' style={{textAlign: 'left' }} color="#ffffff" size={70} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box1, { backgroundColor: '#bb0100'}]} onPress={() => navigate('ProductList', {title: 'Sofas'})}>
            <Icon style={{textAlign: 'right' }} name='clipboard' color="#ffffff" size={70} />
            <Text style={{textAlign: 'left',fontWeight: '500' , fontSize: 21, color: '#ffffff' }}>Sofas</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.containerBox}>
          <TouchableOpacity style={[styles.box2, {backgroundColor: '#fe3f3f'}]} onPress={() => navigate('ProductList', {title: 'Chairs'})}>
            <Text style={{textAlign: 'left',fontWeight: '500', fontSize: 21,  color: '#ffffff' }}>Chairs</Text>
            <Icon name='wheelchair' color="#ffffff" style={{textAlign: 'right' }} size={70} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box2, {backgroundColor:'#9e0100' }]} onPress={() => navigate('ProductList', {title: 'Cupboards'})}>
          <Icon name='desktop' style={{textAlign: 'left' }} color="#ffffff" size={70} />
            <Text style={{textAlign: 'right',fontWeight: '500' , fontSize: 21, color: '#ffffff' }}>Cupboards</Text>
          </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
     
    );
  }
}
