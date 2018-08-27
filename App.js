/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import { Root } from "native-base";

import Startup from "./source/root/startup";
import Login from "./source/components/screens/login/login";
import Forgot from "./source/components/screens/forgot/forgot";
import Register from "./source/components/screens/register/register";
import Home from "./source/components/screens/home/home";
import SideBar from "./source/components/screens/sidebar/sidebar";
import ResetPassword from "./source/components/screens/resetpassword/resetpassword";
import MyAccount from "./source/components/screens/myaccount/myaccount";
import EditProfile from "./source/components/screens/editprofile/editprofile";
import ProductList from "./source/components/screens/productlist/productlist";
import ProductDetails from "./source/components/screens/productdetails/productdetails";
import MyOrders from "./source/components/screens/myorder/myorders";
import MyCart from "./source/components/screens/mycart/mycart";
import OrderDetail from "./source/components/screens/orderdetail/orderdetail";
import AddAddress from "./source/components/screens/addaddress/addaddress";
import AddressList from "./source/components/screens/addresslist/addresslist";
import StoreLocator from "./source/components/screens/StoreLocator/StoreLocator";
import Navigator from "./source/components/navigator/navigator";

const ProductStack = createStackNavigator(
  {
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        header: null
      }
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "ProductList"
  }
);

const AddressStack = createStackNavigator(
  {
    AddressList: {
      screen: AddressList,
      navigationOptions: {
        header: null
      }
    },
    AddAddress: {
      screen: AddAddress,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "AddressList"
  }
);

const MyAccountStack = createStackNavigator(
  {
    MyAccount: {
      screen: MyAccount,
      navigationOptions: {
        header: null
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "MyAccount"
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

const OrderStack = createStackNavigator(
  {
    MyOrders: {
      screen: MyOrders,
      navigationOptions: {
        header: null
      }
    },
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "MyOrders"
  }
);

const MyCartStack = createStackNavigator(
  {
    MyCart: {
      screen: MyCart,
      navigationOptions: {
        header: null
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
      navigationOptions: {
        header: null
      }
    },

    AddAddress: {
      screen: AddAddress,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "MyCart"
  }
);

const DashboardNav = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        drawerLockMode: "unlocked"
      }
    },

    // AddressList: {
    //     screen: AddressList,
    //     navigationOptions:{
    //         header: null,
    //         drawerLockMode: 'locked-closed',
    //     }
    // },

    // AddAddress: {
    //     screen: AddAddress,
    //     navigationOptions: {
    //         header: null,
    //         drawerLockMode: 'locked-closed',
    //     }
    // },

    // // Complete
    // AddressStack: {
    //     screen: AddressStack,
    //     navigationOptions:{
    //         header: null,
    //         drawerLockMode: 'locked-closed'
    //     }
    // },

    // Complete
    MyAccountStack: {
      screen: MyAccountStack,
      navigationOptions: {
        header: null,
        drawerLockMode: "locked-closed"
      }
    },

    // Complete
    MyCartStack: {
      screen: MyCartStack,
      navigationOptions: {
        header: null,
        drawerLockMode: "locked-closed"
      }
    },

    // Complete
    ProductStack: {
      screen: ProductStack,
      navigationOptions: {
        header: null,
        drawerLockMode: "locked-closed"
      }
    },

    // Complete Order Stack
    OrderStack: {
      screen: OrderStack,
      navigationOptions: {
        header: null,
        drawerLockMode: "locked-closed"
      }
    },

    // complete
    StoreLocator: {
      screen: StoreLocator,
      navigationOptions: {
        header: null,
        drawerLockMode: "locked-closed"
      }
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar navigation={props.navigation} />
  }
);

const Stack = createSwitchNavigator(
  {
    Startup: {
      screen: Startup,
      navigationOptions: {
        header: null
      }
    },
    LoginStack: {
      screen: LoginStack,
      navigationOptions: {
        header: null
      }
    },
    DashboardNav: {
      screen: DashboardNav,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Startup"
  }
);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Stack />
      </Root>
    );
    // return <Navigator/>
  }
}
