/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text,Image} from 'react-native'
import { createSwitchNavigator, SwitchNavigator, StackNavigator, DrawerNavigator ,SafeAreaView,   DrawerItems } from  'react-navigation'

// User Component
import Login from './source/components/screens/login/login';
import Forgot from './source/components/screens/forgot/forgot';
import Register from './source/components/screens/register/register';
import Home from './source/components/screens/home/home'


const DashboardNav = DrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header:null,
    },
  },
  Cupboards: {
    screen: Home,
    navigationOptions: {
      header:null,
    },navigationOptions: {
      header:null,
    },
  },
  tables: {
    screen: Home,
    navigationOptions: {
      header:null,
    },navigationOptions: {
      header:null,
    },
  },
  sofas: {
    screen: Home,
    navigationOptions: {
      header:null,
    },navigationOptions: {
      header:null,
    },
  },
},
{
  initialRouteName : "Home",
  contentComponent: ( props ) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black'}}>
    <View style={{ marginTop: 30,  backgroundColor: 'gray'}}>
      <View style={{ justifyContent:'center', alignItems: 'center' }}>
        <Image source={require('./source/assets/images/slide1.jpg')} style={{width: 50, height: 50, borderRadius: 25}}/>
        <Text>Swapnil Suryajoshi</Text>
        <Text>{props.email ? props.email :  'suryajoshiswapnil@gmail.com'}</Text>
      </View>
      <DrawerItems {...props}/>
      <Text>Logout</Text>
    </View>
    </SafeAreaView>
  ) 
}
);
const Stack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header:null,
    },
  },
  Forgot: {
    screen:Forgot,
    navigationOptions:{
      header:null
    },
  },
  Register: {screen:Register,
    navigationOptions:{
      header:null
    },
  },
  DashboardNav : {
    screen : DashboardNav,
    navigationOptions : {
      header : null,
    }
  }
},
{
  initialRouteName : "Login"
}
);


export default class App extends Component{
  render() {
    return (
          <Stack/>
    );
  }
}


