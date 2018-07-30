//

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create(
    {
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
              flexDirection: 'row',
              alignItems: 'center',
              width: 330,
              justifyContent: 'space-between',
          },


    }
);