// Complete

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Vibration,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  StatusBar
} from "react-native";

import { styles } from "./styles";
import Icon from "../../../utils/icon";
import { SafeAreaView } from "react-navigation";
import { user } from "../../../assets/images";
import { showError } from "../../../utils/validators";
import { userData } from "../../../lib/serviceProvider";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  logout = () => {
    Vibration.vibrate(100);
    Alert.alert(
      "Logout",
      "Are you sure want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.removeItem("access_token");
            // showError('Logout Successful!')
            this.props.navigation.navigate("LoginStack");
          }
        }
      ],
      { cancelable: false }
    );
  };

  componentDidMount() {
    //    setTimeout(() => {
    //        console.log("Sidebar Fired");
    //         userDataService.setUserData('total_carts', 7);
    //    }, 5000);

    this.setState({
      isLoading: false
    });
  }

  renderMenuItems = () => {
    const { navigate } = this.props.navigation;
    let arr = [
      {
        title: "My Carts",
        icon: "cart",
        notifications: true,
        value: userData.total_carts,
        navigate: () => {
          navigate("MyCart");
        }
      },
      {
        title: "Tables",
        icon: "table",
        notifications: false,
        navigate: () => {
          navigate("ProductList", { title: "Tables", _id: 1 });
        }
      },
      {
        title: "Sofa",
        icon: "sofa",
        notifications: false,
        navigate: () => {
          navigate("ProductList", { title: "Sofa", _id: 2 });
        }
      },
      {
        title: "Chairs",
        icon: "chair",
        notifications: false,
        navigate: () => {
          navigate("ProductList", { title: "Chairs", _id: 3 });
        }
      },
      {
        title: "Cupboards",
        icon: "cupboard",
        notifications: false,
        navigate: () => {
          navigate("ProductList", { title: "Tables", _id: 4 });
        }
      },
      {
        title: "My Account",
        icon: "user",
        notifications: false,
        navigate: () => {
          navigate("MyAccount");
        }
      },
      {
        title: "Store Locator",
        icon: "map-marker",
        notifications: false,
        navigate: () => {
          navigate("StoreLocator");
        }
      },
      //    {
      //         title: 'Address List',
      //         icon: 'map-marker',
      //         notifications: false,
      //         navigate: () => { navigate('AddressList') },
      //    },
      {
        title: "My Orders",
        icon: "order-list",
        notifications: false, // default is true
        value: userData.total_orders, // count of number of orders, No data in API
        navigate: () => {
          navigate("MyOrders");
        }
      },
      {
        title: "Logout",
        icon: "logout",
        notifications: false,
        navigate: () => {
          this.logout();
        }
      }
    ];

    let elems = [];

    arr.forEach((element, key) => {
      elems.push(
        <TouchableOpacity
          key={key}
          style={styles.drawerItems}
          onPress={element.navigate}
        >
          <Icon
            style={styles.drawerIcon}
            name={element.icon}
            size={20}
            color="#fff"
          />
          <Text style={styles.drawerText}>{element.title}</Text>
          {element.notifications &&
            (element.value > 0 && (
              <View style={styles.notifications}>
                <Text style={styles.notifications}>{element.value}</Text>
              </View>
            ))}
        </TouchableOpacity>
      );
    });

    return elems;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={false} />
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigate("MyAccount")}>
            <Image
              source={
                userData.user_data.profile_pic == null ||
                userData.user_data.profile_pic == ""
                  ? user
                  : { uri: userData.user_data.profile_pic }
              }
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {userData.user_data.first_name} {userData.user_data.last_name}
          </Text>
          <Text style={styles.email}>{userData.user_data.email}</Text>
        </View>

        <View style={styles.containerBottom}>
          <ScrollView style={{ flex: 1 }}>
            {/* <TouchableOpacity style={styles.drawerItems}>
        <FeatherIcon style={styles.drawerIcon} name='shopping-cart' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>My Carts</Text>
            {this.state.total_carts > 0 && <View style={styles.notifications}><Text style={styles.notifications}>{this.state.total_carts} </Text></View>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}  onPress= { () => navigate('ProductList', {title: 'Tables', _id:1 }) }>
        <FeatherIcon style={styles.drawerIcon} name='tablet' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Tables</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}  onPress= { () => navigate('ProductList', {title: 'Sofa', _id:2}) }>
        <FeatherIcon style={styles.drawerIcon} name='airplay' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Sofa</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}  onPress= { () => navigate('ProductList', {title: 'Chairs',_id:3}) }>
        <FeatherIcon style={styles.drawerIcon} name='copy' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Chairs</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItems}  onPress= { () => navigate('ProductList', {title: 'Cupboards',_id:4}) }>
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
        <TouchableOpacity style={styles.drawerItems} onPress= { this.logout }>
            <FeatherIcon style={styles.drawerIcon} name='log-out' size={20} color='#fff' > </FeatherIcon>
            <Text style={styles.drawerText}>Logout</Text>
            
        </TouchableOpacity> */}
            {this.renderMenuItems()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
