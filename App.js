/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text,Image,ActivityIndicator,AsyncStorage} from 'react-native'
import { createSwitchNavigator, createDrawerNavigator , createStackNavigator } from  'react-navigation'
import styles from './source/styles/styles'

// User Component
import Login from './source/components/screens/login/login';
import Forgot from './source/components/screens/forgot/forgot';
import Register from './source/components/screens/register/register';
import Home from './source/components/screens/home/home'
import SideBar from './source/components/screens/sidebar/sidebar'
import ResetPassword from './source/components/screens/resetpassword/resetpassword';
import MyAccount from './source/components/screens/myaccount/myaccount';
import EditProfile from './source/components/screens/editprofile/editprofile';
import ProductList from  './source/components/screens/productlist/productlist'

const MyAccountStack  = createStackNavigator(
{
  MyAccount: {
    screen: MyAccount,
    navigationOptions: {
      header:null,
    },
  },  
  EditProfile: {
    screen: EditProfile,
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
  initialRouteName: 'MyAccount'
}

);


const DashboardNav = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header:null,
    },
  },
  MyAccount: {
      screen: MyAccountStack,
      navigationOptions:{
        header: null,
  }
  },
  ProductList: {
    screen: ProductList,
    navigationOptions:{
      header: null,
    }
  }

  
},
{
  initialRouteName : "Home",
  contentComponent: ( props ) => (
  <SideBar pro={props} /> 
  ) 
}
);
const Stack = createStackNavigator({
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
  Register: {
    screen:Register,
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

  constructor(props){
    super(props)
    this.state = {
      isLoading : true,
      isLogined: false,
    }
  }


  async componentWillMount() {
    
    let data = await AsyncStorage.getItem('userData');
    // console.log(data)
    if(data != null ) {
      this.setState({
        isLoading: false,
        isLogined: true,
      })
      return
    }  
      this.setState({
      isLoading: false,
      isLogined: false,
    })
    return
  }


  render() {
    
    if( this.state.isLoading ) {
      return ( 
      <View style={styles.container}>
        <ActivityIndicator  size="large" color="#0000ff" />
       </View>)  
    }
    
    if(this.state.isLogined)
      return( <DashboardNav/>)
    else
      return( <Stack/>)

    
  }
}


