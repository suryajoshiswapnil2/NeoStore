
import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.iosMargin,
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
          mainContainer: {
              flex:1,
            //   height: Device.window.height,
              justifyContent: 'center',
              alignItems: 'center',
          },
          boxContainer: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 110,
              width: Device.window.width,
              backgroundColor: colors.white,  
              padding: 10,
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
              fontSize: 20,
              color: colors.orderText, 
              width: '100%',
            //   backgroundColor: 'red'
          },
          bottomText:{
              fontSize: 18,  
              color: colors.gray, 
              width: '100%',
          },
          bottomContainer: {
            //   width: 150,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
          },
          rightContainer:{
              
              width: '100%',
            //   backgroundColor:'red' 
          },
          cost: {
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
              fontSize: 15,
              fontWeight: 'bold',
          },
          totalContainer: {
               flexDirection: 'row',
               flex: 1, 
          }
    }
);