//

import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals';
import colors from '../../../utils/colors';
import font from '../../../utils/fontSize';

export const styles = StyleSheet.create(
    {
        container: {
            // height: Device.window.height ,
            flex:1,
            backgroundColor: colors.black,
            paddingTop: Device.isAndroid ? 80/3 : 150/3,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexShrink: 3,
        },
        profileAvatar:{
            height: 200/3,
            width: 200/3,
            borderWidth: 2,
            borderColor: colors.white,
            borderRadius: 200/6,
            backgroundColor: colors.lightRed,
            marginBottom: Device.isAndroid ? 30/3 : 54/3,
        },
        profileContainer: {
            justifyContent: 'center',
            alignItems: 'center',
         
        },
        title : {
            fontSize: 50/3,
            fontWeight: 'bold',
            color: colors.white,
            marginBottom:2,
        },
        email : {
            fontSize: 11,
            // fontWeight: 'bold',
            color: colors.white,
        },
        containerBottom : {
            flex:1,
            marginHorizontal: 20,
            width: '100%',
            marginTop: Device.isAndroid ? 60/3 :  30,
            // backgroundColor: 'red',
        },
        drawerItems:{
            // flex:1,
            // height: 200,
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderTopWidth: .25,
            // borderColor: 'gray',
            borderTopColor: 'black',
            height: 50,
            paddingHorizontal: 15,
            // paddingVertical: 5,
            // backgroundColor: 'red',
        },
        drawerIcon:{
            // flex: 2
            width: 40/2,
            height: 40/2
        },
        drawerText:{
            flex:1,
            color: colors.white,
            fontWeight: 'bold',
            fontSize: 17,
            marginHorizontal:20,
        },
        notifications:{
            // flex:1,
        //    justifyContent:'center',
        //    alignSelf: 'center', 
            color: colors.white,
            fontWeight: 'bold',
            backgroundColor: colors.lightRed,
            height: 20,
            width: 20,
            // padding: 1 ,
            // margin: 7,
            textAlign: 'center',
            borderRadius: 20/2 ,
        }
    }
);