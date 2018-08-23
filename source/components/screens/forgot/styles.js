//

import {StyleSheet} from 'react-native';
import * as Device  from  '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'


export const styles = StyleSheet.create(
    {
        buttonText: { 
            color: colors.red, 
            fontSize: 20 , 
            fontWeight: 'bold'
        },
        text: {
            color: colors.white, 
            fontSize: 20,
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Device.isIOS ? 22 :0,
            // backgroundColor: '#F5FCFF',
          },
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: 40/3,
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 100/3,
            // backgroundColor: '#F5FCFF',
          },
          logoTitle: {
            ...font.family.bold,  
            fontSize: font.logoTitle,
            color: colors.white,
            fontWeight: font.weight.bold,
            marginTop: 30,
            marginBottom: 25,
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
              marginHorizontal: 10, 
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
              flexDirection: 'row',
              alignItems: 'center',
              width: 330,
              justifyContent: 'space-between',
          },


    }
);