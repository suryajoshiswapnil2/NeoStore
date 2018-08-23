//

import {StyleSheet} from 'react-native';
import * as Device  from  '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
        buttonText:{ 
            color: colors.red, 
            fontSize: 20, 
            fontWeight: font.weight.bold
        },
        terms: { 
            textAlign: 'center' ,
            color: colors.white, 
            fontWeight: font.weight.bold
        },
        genderText: { 
            color: colors.white, 
            fontSize: 17, 
            marginRight: 10, 
            fontWeight: font.weight.bold 
        },
        text: { 
            fontSize: 18, 
            color: colors.white, 
            fontWeight: font.weight.bold,
        },
        square: {
            width: 7,
            height: 7,
        },
        checkboxContainer: {
            width: 12,
            height: 12,
            borderColor: colors.white,
            borderWidth: 1,
            padding: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        circle: {
            width: 15,
            height: 15,
            marginRight: 10,
            borderColor: colors.white,
            borderWidth: 1,
            borderRadius: 15 / 2,
        },
        radioContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'blue'
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Device.isIOS ? 22 :0,
            // backgroundColor: '#F5FCFF',
          },

        scrollContainer: {
            // flex: 1,
            // height: Device.window.height ,
            // zIndex: 1,
        },
        container: {
            flex: 1,
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            // height: Device.window.height,
           // marginHorizontal: 40/3,
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
            justifyContent: 'center',
            alignItems: 'center',
            // marginHorizontal: 100/3,
            // backgroundColor: '#F5FCFF',
          },
          logoTitle: {
            ...font.family.bold,
            fontSize: 45,
            color: colors.white,
            // fontWeight: font.weight.bold,
            marginBottom: Device.isAndroid ? 15 : 20,
          },
          inputContainer: {
              alignSelf: "stretch", 
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors.white,
              borderWidth: 1,
              marginBottom:  Device.isAndroid ? 12:  15,
            //   padding: 5,
              flexDirection: 'row',
          },
          genderContainer: {
            alignSelf: "stretch", 
            justifyContent: 'space-between',
            alignItems: 'center',
           // borderColor: 'white',
           // borderWidth: 1,
            marginBottom: 15,
            padding: 5,
            flexDirection: 'row',
        },
        termsContainer: {
            alignSelf: "stretch", 
            justifyContent: 'center',
            alignItems: 'center',
        //    borderColor: 'white',
           // borderWidth: 1,
           // marginBottom: 15,
            padding: 5,
            flexDirection: 'row',
        },
          input: {
              alignSelf: "center", 
              width: 220 ,
              fontSize: 18,
              color: colors.white ,
              height:   Device.isAndroid ?  40 : 40,
              marginHorizontal: 10, 
              padding: 5,
            //   backgroundColor: 'red'           
          },
          icons: {
              marginLeft: 10,
            //  fontSize: 20,  
          } ,
          inputBoxes: {
              marginBottom: 50/3,
          },
          loginButton: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:colors.white,
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