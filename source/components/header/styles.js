// Complete

import {StyleSheet} from 'react-native';
import * as Device from '../../lib/globals'
import font from '../../utils/fontSize'
import colors from '../../utils/colors';

export const styles = StyleSheet.create({

    modalView:{
        width: 50, 
        height: 50,
        marginRight: 2,
        marginTop:2, 
        justifyContent:'center', 
        alignItems: 'center'
    },
    modalInput: {
        marginLeft: 20, 
        height: 50, 
        width: '70%', 
        color: colors.white, 
        fontSize: 17
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: colors.red,
        height: Device.isIOS ? 50 : 55,
        marginTop: Device.isX ? 15 : 0,
        width: Device.window.width,
        alignItems: 'center',
        // alignItems: Device.isAndroid ? 'center' : 'flex-end',
        justifyContent: 'center',
        padding: 10,
        zIndex: 2,
    },
    headText: {
        // backgroundColor: 'blue',
        textAlign: 'center',
        ...font.family.medium, 
        color: colors.white,
        height: Device.isIOS ? 25 : 30,
        marginTop: 0,
        // marginLeft: '35%' ,
        fontSize: Device.isIOS ? 21 : 23,
        // fontWeight: 'bold',
    },
    custHeadText: {
        // backgroundColor: 'blue',
        textAlign: 'center',
        ...font.family.medium, 
        color: colors.white,
        // height: 30,
        marginTop: Device.isIOS ? 8 : undefined,
        // marginLeft: '35%' ,
        fontSize: Device.isIOS ? 21 : 25,
        // fontWeight: 'bold',
    },
    leftContainer: {
        position: 'absolute',
        left: Device.isIOS ? 15 : 15,
        // bottom: Device.isIOS ? 12 : 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftCustomContainer: {
        position: 'absolute',
        left: Device.isIOS ? 15 : 15,
        // bottom: Device.isIOS ? 12 : 15,
    },
    rightContainer: {
        position: 'absolute',
        right: Device.isIOS ? 15 : 15,
        // bottom: Device.isIOS ? 12 : 15,
        // bottom:  Device.isIOS ? 10 : 10,
    },
    customHeaderContainer: {
        flexDirection: 'row',
        backgroundColor: colors.red, 
        height: Device.isIOS ? 50 : 55,
        marginTop: Device.isX ? 15 : 0,
        width: Device.window.width,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        zIndex: 2,
    },
    rowContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    modalContainer: {
        flexDirection: 'row',
        backgroundColor: colors.red, 
        height: Device.isIOS ? 50 : 55,
        // marginTop: Device.iosMargin,
        marginTop: Device.isX ? Device.iosMargin + 15 : Device.iosMargin,
        width: Device.window.width,
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding: 10,
        zIndex: 2,
    },
});