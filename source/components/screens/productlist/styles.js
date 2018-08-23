
import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.isIOS? 22: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          },
          mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          bottomViewer: {
              position: 'absolute',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.9,
              backgroundColor: colors.black,
              bottom: 0,
              width: Device.window.width,    
          },
          bottomViewerText:{
              color: colors.white,
              fontSize: 15,
          },
          bottomViewer2: {
            position: 'absolute',
            height: 30,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: .90,
            backgroundColor: colors.black,
            bottom: 10,
            width: 100
          //   width: Device.window.width,    
            },
            bottomViewerText2:{
                color: colors.white,
                fontSize: 16,
            }
          

    }
)

export const ItemStyles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.isIOS? 20: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          },
          itemContainer: {
            flex: 1,
            flexDirection: 'row',
            height: 120,
            width: Device.window.width,
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15,
            backgroundColor: colors.white,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.gray,
            // backgroundColor: colors.white,
          },
          imageContainer: {
           flex:2,
           marginRight: 15,
          },
          detailsPane: {
            flex:5,
            flexDirection: 'column',
            height: '100%',

          },
          image:{
           width: '100%',
           height: '100%',
            marginRight: 15,
            // backgroundColor: 'blue'
          },
          price:{
            ...font.family.medium, 
            fontSize: 25,
            fontWeight: 'bold',
            color: colors.red,
       
          },
          rating: {

          },
          manufacturer:{
            ...font.family.book, 
            fontSize: 15,
            color: colors.darkGray,
            // backgroundColor: 'blue'
          },
          title:{
            ...font.family.medium, 
            fontSize: 18,
            // fontWeight: 'bold',
            color: colors.productWhite,
            marginBottom: 1,
            // backgroundColor:'red'
          },
          topContainer: {
              flex:1,
              // backgroundColor: 'red',
              flexDirection: 'column',
              marginTop: 5,
              justifyContent: 'flex-start',
          },
          bottomContainer:{
            // backgroundColor: 'red',
              flex:1,
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between'
          }
    }
)