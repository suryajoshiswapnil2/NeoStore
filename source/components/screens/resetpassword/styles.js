//

import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
import * as Device from '../../../lib/globals'
// import font from '../../../utils/fontSize';


export const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#F5FCFF',
            paddingTop: Device.isIOS ? 20 :0,
          },
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 40/3,
            marginVertical: 150/3,
            // backgroundColor: '#F5FCFF',
          },
          containerHalf: {
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 100/3,
            // backgroundColor: '#F5FCFF',
          },
          logoTitle: {
            fontSize: 45,
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: 30,
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
              height: 30,
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
              backgroundColor:colors.white,
              width: 275    ,
              paddingVertical: 12,
              borderRadius: 5,
            //   marginBottom: 12
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