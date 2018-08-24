import Startup from './source/root/startup'
import Login from '../screens/login/login';
import Forgot from '../screens/forgot/forgot';
import Register from '../screens/register/register';
import Home from '../screens/home/home'
import SideBar from '../screens/sidebar/sidebar'
import ResetPassword from '../screens/resetpassword/resetpassword';
import MyAccount from '../screens/myaccount/myaccount';
import EditProfile from '../screens/editprofile/editprofile';
import ProductList from  '../screens/productlist/productlist'
import ProductDetails from '../screens/productdetails/productdetails'
import MyOrders from '../screens/myorder/myorders'
import MyCart from '../screens/mycart/mycart'
import OrderDetail from '../screens/orderdetail/orderdetail'
import AddAddress from '../screens/addaddress/addaddress'
import AddressList from '../screens/addresslist/addresslist'
import StoreLocator from '../screens/StoreLocator/StoreLocator'

import React, {Component} from 'react'
import { createSwitchNavigator, createDrawerNavigator , createStackNavigator } from  'react-navigation'


const ProductStack = createStackNavigator(
    {
      ProductList: {
        screen: ProductList,
        navigationOptions:{
          header: null,
        }
      },
      ProductDetails: {
        screen: ProductDetails,
        navigationOptions:{
          header: null,
        }
      },
    
    },
    {
      initialRouteName: 'ProductList'
    }
    )
  
    const AddressStack = createStackNavigator(
        {
          AddressList: {
              screen: AddressList,
              navigationOptions:{ 
                  header: null,
              }
          },
          AddAddress: {
              screen: AddAddress,
              navigationOptions: {
                  header: null,
              }
          },
  
        },
        {
            initialRouteName: 'AddressList'
        }
    )
    
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
    
    
    const LoginStack = createStackNavigator({
    
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
    },
    {
      initialRouteName : "Login"
    }
    )
  
    const OrderStack = createStackNavigator({
  
      MyOrders: {
          screen: MyOrders,
          navigationOptions: {
              header: null,
          }
      },
      OrderDetail: {
          screen: OrderDetail,
          navigationOptions:{
            header: null,
          }
      },
  
      },
      {
          initialRouteName: 'MyOrders'
      }
  )
  
    const MyCartStack = createStackNavigator({
          MyCart: {
              screen: MyCart,
              navigationOptions: {
              header: null,
              }
          },
          // AddressStack: {
          //     screen: AddressStack,
          //     navigationOptions:{
          //         header: null,
          //     }
          // },  
          AddressList: {
              screen: AddressList,
              navigationOptions:{ 
                  header: null,
              }
          },
          AddAddress: {
              screen: AddAddress,
              navigationOptions: {
                  header: null,
              }
          },
      },
      {
          initialRouteName: 'MyCart'  
    })  
 
const DashboardNav = createDrawerNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header:null,
      },
    },
  },
  {
    initialRouteName : "Home",
    contentComponent: ( props ) => (
    <SideBar navigation={props.navigation} /> 
    ) 
  }
  );
  


const StartupStack = createSwitchNavigator({
     Startup:{
         screen: Startup,
         navigationOptions:{
             header: null,
         }
     },
      LoginStack: {
        screen : LoginStack,
        navigationOptions : {
          header : null,
        }
      },
      DashboardNav : {
        screen : DashboardNav,
        navigationOptions : {
          header : null,
        }
      }
})

export const MainStack = createStackNavigator({
  
    StartupStack: {
      screen : StartupStack,
      navigationOptions : {
        header : null,
      }
    },
        // Complete
        MyAccountStack: {
            screen: MyAccountStack,
            navigationOptions:{
              header: null,
        }
        },
        
        // Complete
        MyCartStack: {
          screen: MyCartStack,
          navigationOptions: {
            header: null,
          }
        },
    
        // Complete
        ProductStack:{
          screen: ProductStack,
          navigationOptions: {
            header: null,
          }
        },
    
        // Complete Order Stack 
        OrderStack: {
          screen: OrderStack,
          navigationOptions:{
            header: null,
          }
        },
    
        // complete
        StoreLocator: {
            screen: StoreLocator,
            navigationOptions: {
                header: null,
            }
        }


  },
  {
    initialRouteName : "StartupStack"
  }
);


export default class App extends Component {

    render() {
      return <Stack/>
    }
  }
