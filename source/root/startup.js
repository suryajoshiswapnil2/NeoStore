import React, {Component} from 'react';
import {View,Text,Image,ActivityIndicator,AsyncStorage} from 'react-native'
import { createSwitchNavigator, createDrawerNavigator , createStackNavigator } from  'react-navigation'

// import Login from '../components/screens/login/login';
// import Forgot from '../components/screens/forgot/forgot';
// import Register from '../components/screens/register/register';
// import Home from '../components/screens/home/home'
// import SideBar from '../components/screens/sidebar/sidebar'
// import ResetPassword from '../components/screens/resetpassword/resetpassword';
// import MyAccount from '../components/screens/myaccount/myaccount';
// import EditProfile from '../components/screens/editprofile/editprofile';
// import ProductList from  '../components/screens/productlist/productlist'
// import ProductDetails from '../components/screens/productdetails/productdetails'
// import MyOrders from '../components/screens/myorder/myorders'
// import MyCart from '../components/screens/mycart/mycart'
// import OrderDetail from '../components/screens/orderdetail/orderdetail'

import styles from './styles'

import { API } from '../lib/api'


// const ProductStack = createStackNavigator(
//     {
//       ProductList: {
//         screen: ProductList,
//         navigationOptions:{
//           header: null,
//         }
//       },
//       ProductDetails: {
//         screen: ProductDetails,
//         navigationOptions:{
//           header: null,
//         }
//       },
    
//     },
//     {
//       initialRouteName: 'ProductList'
//     }
//     )
    
//     const MyAccountStack  = createStackNavigator(
//     {
//       MyAccount: {
//         screen: MyAccount,
//         navigationOptions: {
//           header:null,
//         },
//       },  
//       EditProfile: {
//         screen: EditProfile,
//         navigationOptions: {
//           header:null,
//         },
//       },
//       ResetPassword: {
//         screen: ResetPassword,
//         navigationOptions: {
//           header:null,
//         },
//       }
    
//     },
//     {
//       initialRouteName: 'MyAccount'
//     }
    
//     );
    
    
//     const LoginStack = createStackNavigator({
    
//       Login: {
//         screen: Login,
//         navigationOptions: {
//           header:null,
//         },
//       },
//       Forgot: {
//         screen:Forgot,
//         navigationOptions:{
//           header:null
//         },
//       },
//       Register: {
//         screen:Register,
//         navigationOptions:{
//           header:null
//         },
//       },
//     },
//     {
//       initialRouteName : "Login"
//     }
//     )
    
//     const DashboardNav = createDrawerNavigator({
//       Home: {
//         screen: Home,
//         navigationOptions: {
//           header:null,
//         },
//       },
//       MyAccount: {
//           screen: MyAccountStack,
//           navigationOptions:{
//             header: null,
//       }
//       },
//       MyOrders: {
//         screen: MyOrders,
//         navigationOptions: {
//           header: null,
//         }
//       },
//       MyCart: {
//         screen: MyCart,
//         navigationOptions: {
//           header: null,
//         }
//       },
//       // ProductList: {
//       //   screen: ProductList,
//       //   navigationOptions:{
//       //     header: null,
//       //   }
//       // },
//       ProductStack:{
//         screen: ProductStack,
//         navigationOptions: {
//           header: null,
//         }
//       },
//       OrderDetail: {
//         screen: OrderDetail,
//         navigationOptions:{
//           header: null,
//         }
//       }
//     },
//     {
//       initialRouteName : "Home",
//       contentComponent: ( props ) => (
//       <SideBar navigation={props.navigation} /> 
//       ) 
//     }
//     );
    
    
//     const Stack = createSwitchNavigator({
    
//       LoginStack: {
//         screen : LoginStack,
//         navigationOptions : {
//           header : null,
//         }
//       },
//       DashboardNav : {
//         screen : DashboardNav,
//         navigationOptions : {
//           header : null,
//         }
//       }
//     },
//     {
//       initialRouteName : "LoginStack"
//     }
//     );
    
//     const HomeStack = createSwitchNavigator({
    
//       LoginStack: {
//         screen : LoginStack,
//         navigationOptions : {
//           header : null,
//         }
//       },
//       DashboardNav : {
//         screen : DashboardNav,
//         navigationOptions : {
//           header : null,
//         }
//       }
//     },
//     {
//       initialRouteName : "DashboardNav"
//     }
//     );
 

    export default class Startup extends Component{

        constructor(props){
          super(props)
          this.state = {
            isLoading : true, 
            isLogined: false,
            data: [],
          }
        }

        async componentWillMount() {
          
          let data = await AsyncStorage.getItem('access_token');
          
          // Check for the existence of Access Token
          if(data == null){
            this.setState({
              isLoading: false,
              isLogined: false,
            })
            return
          }
          
          // Validate the Access Token
          await fetch(API.accountDetails, {
            method: 'GET',    
            headers: {
              access_token: data
            }  
          })
          .then(res => res.json())
          .then( res => {
            if(res.status == 200 ) {
              this.setState({
                isLoading: false,
                isLogined: true,
                data: res.data,
              })
              return
            }  
              this.setState({
              isLoading: false,
              isLogined: false,
            })
      
          }
            
          )
      
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
                this.props.navigation.navigate('Home', this.state.data)
            else
                this.props.navigation.navigate('LoginStack')
            
            return null    
        }
      }
      
      
          