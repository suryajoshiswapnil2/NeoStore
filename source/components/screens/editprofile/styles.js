//

import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
        modelContent:{
            height: 50, 
            backgroundColor:'white', 
            justifyContent: 'space-between', 
            flexDirection:'row'
        },
        datePicker:{
            zIndex: 1, 
            backgroundColor: 'rgba(256,256,256,0.96)'
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end'
        },
        button:{
            padding: 10,
            // backgroundColor: 'green',
            justifyContent: 'center',
        },
        loaderContainer:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex:10,
        },
        imageHolder:{
            marginBottom: 60/3,
            borderColor: colors.white,
            borderWidth: 0.5,
            borderRadius: 400/3 /2 ,
        },
        imageTouch: {
            width: 400/3,
            height: 400/3,
            justifyContent:'center',
            alignItems: 'center', 
            backgroundColor: colors.white,
            // borderColor: colors.gray,
            // borderWidth: 5.5,
            borderRadius: 400/3 /2 ,
            // backgroundColor: 'green'
        },
        image: {
            width: 400/3,
            height: 400/3,
            // borderColor: colors.gray,
            // borderWidth: 5.5,
            borderRadius: 400/3 /2 ,
            // backgroundColor: 'green'
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',
            width: '100%',
            zIndex: 1,
            paddingTop: Device.isIOS ? 22 :0,
          },
          anMainContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',
            width: '100%',
            zIndex: 1,
            paddingTop: 25,
          },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 40/3,
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
              flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginHorizontal: 100/3,
            // backgroundColor: '#F5FCFF',
          },
          logoTitle: {
            fontSize: 45,
            color: colors.white,
            fontWeight: font.weight.bold,
            marginBottom: 50,
          },
          inputContainer: {
              alignSelf: "stretch", 
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderColor: colors.white,
              borderWidth: 1,
              marginBottom: 12,
              padding: 5,
              flexDirection: 'row',
          },
          input: {
              alignSelf: "center", 
              width: 205,
              fontSize: 20,
              color: colors.white,
              height:30,
              marginHorizontal: 15, 
              padding: 4,           
          },
          icons: {
            marginLeft: 10,
            height: 25,
            width: 25,  
            // backgroundColor: 'green',
            textAlign: 'center'
          } ,
          inputBoxes: {
              marginBottom: 30/3,
          },
          loginButton: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:colors.white,
              width: 283  ,
              paddingVertical: 12,
              borderRadius: 5,
              marginBottom: 12
          },
          loginButtonSquare: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:colors.white,
            width: '100%'  ,
            // paddingVertical: 12,
            height: 157/3,
        },
          bottomContainer: {
          //    flex: 1,
              bottom: 20,
              position: 'absolute',
             // marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              width: '85%',
            //   marginHorizontal: 50,
              justifyContent: 'space-between',
          },
          containerHalfBottom:{
            //   justifyContent: 'center',
            //   backgroundColor: 'white',
            //   borderColor: 'blue',
              width: Device.window.width,
          }


    }
);