/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text,Image} from 'react-native'
import { createSwitchNavigator, SwitchNavigator, StackNavigator, DrawerNavigator , } from  'react-navigation'

// User Component
import Login from './source/components/screens/login/login';
import Forgot from './source/components/screens/forgot/forgot';
import Register from './source/components/screens/register/register';
import Home from './source/components/screens/home/home'
import SideBar from './source/components/screens/sidebar/sidebar'
import ResetPassword from './source/components/screens/resetpassword/resetpassword';

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
    },
  },
  tables: {
    screen: Home,
    navigationOptions: {
      header:null,
    },
  },
  sofas: {
    screen: Home,
    navigationOptions: {
      header:null,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header:null,
    },
  }
},
{
  initialRouteName : "Home",
  contentComponent: ( props ) => (
  
        <SideBar pro={props} /> 
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
  initialRouteName : "DashboardNav"
}
);


export default class App extends Component{
  render() {
    return (
          <Stack/>
    );
  }
}


