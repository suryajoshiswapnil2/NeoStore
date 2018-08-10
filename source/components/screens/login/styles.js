//

import {StyleSheet} from 'react-native';
import * as Device  from  '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
        loaderContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.red,
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#F5FCFF',
          },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 40/3,
            //Testing
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 100/3,
            // backgroundColor: '#F5FCFF',
          },
          logoTitle: {
            fontSize: font.logoTitle,
            color: colors.white,
            fontWeight: font.weight.bold,
            marginBottom: 50,
          },
          inputContainer: {
              alignSelf: "stretch", 
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors.white,
              borderWidth: 1,
              marginBottom: 15,
              padding: 5,
              flexDirection: 'row',
          },
          input: {
              alignSelf: "center", 
              width: 205,
              fontSize: 20,
              color: colors.white ,
            //   height: 30,
              marginHorizontal: 15, 
              padding: 5           
          },
          icons: {
              marginLeft: 15,  
          } ,
          inputBoxes: {
              marginBottom: 50/3,
          },
          loginButton: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              width: 275    ,
              paddingVertical: 12,
              borderRadius: 5,
              marginBottom: 12
          },
          bottomContainer: {
          //    flex: 1,
              bottom: 20,
              position: 'absolute',
              marginBottom:  Device.isX ?  20 : 0,
              flexDirection: 'row',
              alignItems: 'center',
              width: '85%',
            //   marginHorizontal: 50,
              justifyContent: 'space-between',
          },


    }
);