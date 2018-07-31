//

import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'

export const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: '#F5FCFF',
          },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 40/3,
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',

            // backgroundColor: '#F5FCFF',
          },
          containerHalfBottom: {
            flex: 3,
            justifyContent: 'space-between',
            // alignItems: 'center',
            flexDirection: 'column',
            marginHorizontal: 40/3,
            marginVertical: 45/3,
            marginBottom: 15,
            // backgroundColor: '#F5FCFF',
          },
          rowContainerBox:{
            //    backgroundColor: '#e91ffa',
                flex:1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                //  alignItems: 'center'
              },
          containerBox:{
        //    backgroundColor: '#e91ffa',
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            //  alignItems: 'center'
          },
          box1: {
            padding: 60/3,
            //   flexDirection: 'row',
            justifyContent: 'space-between',
            width: '48%',
            height: '90%',
            
            // justifyContent: left, 
            backgroundColor: '#e91c1a',
          },box2: {
              padding: 60/3,
              justifyContent: 'space-between',
            // flexDirection: 'row',
            width: '48%',
            height: '90%',
            backgroundColor: '#e91c1a',
          },
          logoTitle: {
            fontSize: 45,
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: 50,
          },
          inputContainer: {
              alignSelf: "stretch", 
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'white',
              borderWidth: 1,
              marginBottom: 15,
              padding: 5,
              flexDirection: 'row',
          },
          input: {
              alignSelf: "center", 
              width: 205,
              fontSize: 20,
              color: '#ffffff' ,
             // height: 30,
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
              backgroundColor:'#ffffff',
              width: 275    ,
              paddingVertical: 12,
              borderRadius: 5,
              marginBottom: 12
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
          wrapper: {
              // width: Device.window.width ,
            //  height: 686/3,
        },
        slide1: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#9DD6EB',
        },
        slide2: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5',
        },
        slide3: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#92BBD9',
        },
        text: {
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold',
        },
        icon: {
            // width: 10,
            // height: 24,
        }


    }
);