
import React, {Component} from 'react';
import {View,Image, Text, TouchableOpacity,AsyncStorage, ScrollView, StatusBar } from 'react-native';

import {styles} from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather'
 
import {SafeAreaView, DrawerItems, NavigationActions, StackActions } from 'react-navigation'; 
import {user} from '../../../assets/images'
import {API, apiCall} from '../../../lib/api'
import { showError } from '../../../utils/validators';
import { userData, sync, userDataService } from '../../../lib/serviceProvider';

let accountData = null

export default class SideBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
        };        
    }

    logout = async () => {
        await AsyncStorage.removeItem('access_token');
        showError('Logout Successful!')
        this.props.navigation.navigate('LoginStack');
    }    

  async componentDidMount(){

    //    setTimeout(() => {
    //        console.log("Sidebar Fired");
    //         userDataService.setUserData('total_carts', 7);
    //    }, 5000);

        // let data = await AsyncStorage.getItem('access_token');
        // this.setState({
        //     access_token:data,
        // })

        // return this.fetchData()
        this.setState({
            isLoading: false,
        })

    }

    renderMenuItems = () => {
        // this.setState({
        //     isLoading: true,
        // })
        // console.log(userData.total_orders)
        const {navigate} = this.props.navigation;
        let arr = [
           {
               title: 'My Carts',
               icon: 'shopping-cart',	
               notifications: true,
               value: userData.total_carts,
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
               navigate: () => { navigate('MyAccount', userData)  },
           },
           {
               title: 'Store Locator',
               icon: 'map-pin',
               notifications: false,
               navigate: () => { navigate('StoreLocator') },
           },
           {
               title: 'My Orders',
               icon: 'list',
               notifications: false, // default is true
               value: userData.total_orders, // count of number of orders
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
       
   arr.forEach((element,key) => {
       elems.push(
           <TouchableOpacity key={key} style={styles.drawerItems} onPress={element.navigate}>
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
  
//    this.setState({
//         isLoading: false,
//    })

   return elems
   
}

    //  fetchData = async () => {

    //     sync(this.state.access_token)

        
    //     accountData = await apiCall(API.accountDetails, {
    //             method: 'GET',
    //             headers:  {
    //             access_token: this.state.access_token,
    //         }
    //     });

    //     if(accountData == null)
    //     return

    //     this.accountData = accountData

    //     // console.log('sidebar called', this.accountData)

    // }



 render() {
  
    // this.fetchData()
    // sync(this.state.access_token)
    
    const {navigate} = this.props.navigation;
  
    return (

  <SafeAreaView style={styles.container}>
  {/* <StatusBar barStyle = 'light-content' hidden={false}/> */}
      <View style={styles.profileContainer}>
       <TouchableOpacity onPress={ () => navigate('MyAccount') }>
        <Image source={userData.user_data.profile_pic == null ? user : {uri: userData.user_data.profile_pic}}  style={styles.profileAvatar}/>
        </TouchableOpacity>
        <Text style={styles.title}>{userData.user_data.first_name} {userData.user_data.last_name}</Text>
        <Text style={styles.email}>{userData.user_data.email}</Text>
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
        { this.renderMenuItems() }
        </ScrollView>
      </View>
      </SafeAreaView>

    );
  }
}