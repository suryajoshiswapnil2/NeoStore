
import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
        loading:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
        },
        dropDownStyle:{
            width: 50, 
            marginLeft: -9,
        },
        modelContent:{
            width: 50, 
            fontSize: 25, 
            padding: 5,  
            height: 30, 
            backgroundColor: colors.darkWhite, 
            alignItems: 'center'
        },
        loaderContainer: {
            flex: 1,
            // marginTop: Device.iosMargin,
            justifyContent: 'center',
            alignItems: 'center',
            
          },
        container: {
            flex: 1,
            marginTop: Device.iosMargin,
            justifyContent: 'flex-start',
            // alignItems: 'center',
            backgroundColor:colors.white,
          },
          mainContainer: {
              flex:1,
              height: Device.window.height,
              justifyContent: 'center',
              alignItems: 'center',
          },
          boxContainer: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 110,
              width: Device.window.width,
              backgroundColor: colors.white,  
              paddingHorizontal: 15,
              flexDirection: 'row',
              borderBottomColor: colors.gray,
              borderBottomWidth: 0.5,
            // backgroundColor: 'red',
          },
          left: {   
            // width: 100,
            height: 80,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',  
            // backgroundColor: colors.lightGray,
            borderColor: colors.gray,
            borderWidth: 1,
            flex:1,
            },
          right: {
            height: 80,
              justifyContent: 'space-between',
              alignItems: 'center',  
              marginHorizontal: 10,
              flex: 3,
            //   backgroundColor: 'red',
          },
          images:{
              width: 70,
              height: 50,
              resizeMode: 'center',
      
          }
          ,
          upperText:{
            ...font.family.book,              
              fontSize: 18,
              color: colors.orderText, 
            //   width: '100%',
            //   backgroundColor: 'red'
          },
          bottomText:{
            ...font.family.book,              
              fontSize: 17,  
              color: colors.gray, 
              width: '100%',
          },
          bottomContainer: {
              width: 150,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
          },
          rightContainer:{
              
              width: '100%',
            //   backgroundColor:'red' 
          },
          cost: {
              ...font.family.book,              
              fontSize: 17,
              color: colors.lightBlack,
          },
          icon: {
              fontSize: 25,
              color: colors.lightBlack,
          },
          costContainer: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
          },
          total:{
              ...font.family.medium,
              fontSize: 17,
              fontWeight: '600',
              color: colors.lightBlack
          },
          totalContainer: {
               flexDirection: 'row',
               justifyContent: 'space-between',
               height: 80,
            //    flex: 1, 
            //   backgroundColor:'red' ,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.gray,  
          },
          button: {
            marginVertical: 30,
            backgroundColor: colors.red,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            color: colors.white,
            borderRadius: 6,   
        },
        buttonText:{
            fontSize: 20,
            color: colors.white,
            textAlign: 'center'
        },
        buttonContainer:{
            width: '90%',
            justifyContent: 'center',
            marginHorizontal: 18,
         
        },
        rowBack: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            height: 110,
            // backgroundColor: 'red',
            width: 75,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.gray,
        },
        iconDelete: {
            backgroundColor: colors.red,
            borderRadius: 20,
            padding: 10,
            color: colors.white,
            textAlign:'center',
        }
    }
);