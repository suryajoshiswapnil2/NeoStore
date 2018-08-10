/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Image, Text, TouchableOpacity,AsyncStorage, ScrollView, StatusBar } from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather'
 
import {SafeAreaView, DrawerItems, NavigationActions, StackActions } from 'react-navigation'; 
import {user} from '../../../assets/images'
import {API} from '../../../lib/api'
import { showError } from '../../../utils/validators';

export default class SideBar extends Component{


constructor(props){

    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        img_url: '',
        total_carts: 0,
        total_orders: 0,
        accountData:  null,
    }

}

    logout = async () => {
        await AsyncStorage.removeItem('access_token');
        showError('Logout Successful!')
        this.props.navigation.navigate('LoginStack');
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'LoginStack' })],
        //   });
        //   this.props.pro.navigation.dispatch(resetAction);
    }    


   async componentWillMount(){
    let accountData = {};
    let data = await AsyncStorage.getItem('access_token');

    accountData =  await fetch( API.accountDetails, {
        method: 'GET',
        headers:  {
          access_token: data,
        },
        body: '',
        })
    .then( res => res.json() )
    .then( res => res.data );
      
       console.log(accountData)

       this.setState( { 
        first_name : accountData.user_data.first_name, 
        last_name : accountData.user_data.first_name,
        email : accountData.user_data.email,
        img_url: accountData.user_data.profile_pic,
        total_carts: accountData.total_carts,
        total_orders: accountData.total_orders,
       // data : data,
    })

    this.setState({
        accountData: accountData.user_data,
    })

        console.log(this.state.accountData)
    }



renderMenuItems = () => {
    const {navigate} = this.props.navigation;
    let arr = [
           {
               title: 'My Carts',
               icon: 'shopping-cart',	
               notifications: true,
               value: this.state.total_carts,
               navigate: () => { navigate('MyCart',)},
           },
           {
               title: 'Tables',
               icon: 'tablet',	
               notifications: false,
               navigate: () => { navigate('ProductList', {title: 'Tables', _id:1 })  },
            },
           {
               title: 'Sofa',
               icon: 'airplay',	
               notifications: false,
               navigate: () => { navigate('ProductList', {title: 'Sofa', _id:2 })  },
           },
           {
               title: 'Chairs',
               icon: 'copy',
               notifications: false,
               navigate: () => { navigate('ProductList', {title: 'Chairs', _id:3 })  },
           },
           {
               title: 'Cupboards',
               icon: 'sidebar',
               notifications: false,
               navigate: () => { navigate('ProductList', {title: 'Tables', _id:4 })  },
           },
           {
               title: 'My Account',
               icon: 'user',
               notifications: false,
               navigate: () => { navigate('MyAccount', this.state.accountData)  },
           },
           {
               title: 'Store Locator',
               icon: 'map-pin',
               notifications: false,
               navigate: () => { navigate('OrderDetail') },
           },
           {
               title: 'My Orders',
               icon: 'list',
               notifications: true,
               value: this.state.total_orders,
               navigate: () => { navigate('MyOrders')  },
           },
           {
               title: 'Logout',
               icon: 'log-out',
               notifications: false,
               navigate: () => { this.logout() },
           }
       ]
   
   let elems = []
       
   arr.forEach(element => {
       elems.push(
          
           <TouchableOpacity style={styles.drawerItems} onPress={element.navigate}>
           { console.log(element)}
           <FeatherIcon style={styles.drawerIcon} name={element.icon} size={20} color='#fff' />
               <Text style={styles.drawerText}>{element.title}</Text>
               {
                   element.notifications 
                   && 
                   (element.value > 0  
                       && 
                           <View style={styles.notifications}><Text style={styles.notifications}>{element.value}</Text></View>)
               }
           </TouchableOpacity>
       ) 
   })
   
   return elems
   
}

  render() {
    const {navigate} = this.props.navigation;
    return (

  <SafeAreaView style={styles.container}>
  {/* <StatusBar barStyle = 'light-content' hidden={false}/> */}
      <View style={styles.profileContainer}>
       <TouchableOpacity onPress={ () => navigate('MyAccount') }>
        <Image source={ this.state.img_url == null ? user : {uri: this.state.img_url } } style={styles.profileAvatar}/>
        </TouchableOpacity>
        <Text style={styles.title}>{this.state.first_name + ' ' + this.state.last_name}</Text>
        <Text style={styles.email}>{this.state.email}</Text>
      </View>
     
      <View style={styles.containerBottom}>
        {/* <DrawerItems {...this.props.pro}/> */}
        <ScrollView style={ { flex:1}}>
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
        { this.state.accountData == null ? null : this.renderMenuItems()}
        </ScrollView>
      </View>
      </SafeAreaView>

    );
  }
}