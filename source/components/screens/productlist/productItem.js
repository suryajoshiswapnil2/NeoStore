import React, { Component } from 'react'
import {View, Text, Image,TouchableOpacity } from 'react-native'

import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'
import {Rating} from 'react-native-ratings'
export default class ProductItem extends Component {

    constructor(props)
    {
        super(props)
        this.state ={

        }
    } 

    componentDidMount(){
        
    }

    render(){
        // const {navigate} = this.props.navigation
        return(
    <TouchableOpacity onPress={ () => { this.props.navigate('ProductDetails', { _id: this.props.id})}} >       
     <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: this.props.url } }></Image>
            </View>
            <View style={styles.detailsPane}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{this.props.name}</Text>
                   <View><Text style={styles.manufacturer}>{this.props.producer}</Text></View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.price}>Rs. {this.props.cost}</Text>
                    {/* <Text style={styles.rating}>{this.props.rating}</Text> */}
                    <Rating
                        type='custom'
                        ratingCount={5}
                        startingValue={this.props.rating}
                        onFinishRating={this.ratingCompleted}
                        imageSize={15}
                     
                        style={{ paddingVertical: 8, }}
                        readonly
                        ratingBackgroundColor='gray'
                        // ratingColor='#000'
                        />
                </View>
            </View>
        </View>
</TouchableOpacity>

        )
    }
}




export const styles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.isIOS? 20: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          },
          itemContainer: {
            flex: 1,
            flexDirection: 'row',
            height: 120,
            width: Device.window.width,
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15,
            backgroundColor: colors.white,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.gray,
            // backgroundColor: colors.white,
          },
          imageContainer: {
           flex:2,
           marginRight: 15,
          },
          detailsPane: {
            flex:5,
            flexDirection: 'column',
            height: '100%',

          },
          image:{
           width: '100%',
           height: '100%',
            marginRight: 15,
            // backgroundColor: 'blue'
          },
          price:{
            ...font.family.medium, 
            fontSize: 25,
            fontWeight: 'bold',
            color: colors.red,
       
          },
          rating: {

          },
          manufacturer:{
            ...font.family.book, 
            fontSize: 15,
            color: colors.darkGray,
            // backgroundColor: 'blue'
          },
          title:{
            ...font.family.medium, 
            fontSize: 18,
            // fontWeight: 'bold',
            color: colors.productWhite,
            marginBottom: 1,
            // backgroundColor:'red'
          },
          topContainer: {
            flex:1,
              // backgroundColor: 'red',
              flexDirection: 'column',
              marginTop: 5,
              justifyContent: 'flex-start',
          },
          bottomContainer:{
            // backgroundColor: 'red',
              flex:1,
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between'
          }
    }
)