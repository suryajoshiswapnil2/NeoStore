
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
          },
          mainContainer: {
              flex:1,
              height: Device.window.height,
              justifyContent: 'center',
              alignItems: 'center',
          },
          boxContainer: {
              justifyContent: 'space-between',
              height: 100,
              width: Device.window.width,
              backgroundColor: colors.white,  
              padding: 20,
              flexDirection: 'row',
              borderBottomColor: colors.gray,
              borderBottomWidth: 0.5,
            //   backgroundColor: 'red',
          },
          left: {
              flexDirection: 'column',
            //   backgroundColor: 'green',

            },
          right: {
              justifyContent: 'center',
              alignItems: 'center',  
          },
          upperText:{
              fontSize: 18,
              marginBottom: 10,
              color: colors.orderText, 

          },
          bottomText:{

              marginTop: 10,
              fontSize: 15,  
              color: colors.pureBlack, 
          },
          textBottomContainer: {
            //   width: 150,
            borderTopWidth: 0.6,
            borderTopColor: colors.lightGray,
          },
          cost: {
              fontSize: 20,
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
          }
    }
);