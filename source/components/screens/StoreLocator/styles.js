
import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.iosMargin,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          },
          mainContainer: {
              flex:1,
              height: Device.window.height,
              justifyContent: 'center',
              alignItems: 'center',
          },
          mapContainer: {
            flex:1,
            width: Device.window.width,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          },
          addressHolder:{
            flex:2,  
            width: Device.window.width,
            // backgroundColor: 'blue'
          },
          addrItem:{
            //   height: 50,
              paddingVertical: 20,
              paddingHorizontal: 20,  
              borderBottomColor: colors.gray,
              borderBottomWidth: .6,
              flexDirection: 'row',
          },
          text:{
            marginHorizontal: 10,
            width: '89%',
            // backgroundColor: 'red',
          },
          n:{
            ...font.family.medium, 
            color: colors.lightBlack,
            fontWeight: font.weight.bold,
            fontSize: 15,
          },
          ad:{
            ...font.family.book, 
            color:colors.productWhite,
            fontSize: 13,
            // fontFamily: 'Roboto',
          },
          map: {
              width: Device.window.width,
              height: '100%'
          }
    }
);