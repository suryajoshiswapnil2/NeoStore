import {
    StyleSheet
} from 'react-native';
import * as Device from '../../lib/globals'
import font from '../../utils/fontSize'
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#e91c1a',
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
              marginTop: Device.isIOS ? 0 : 0,
              // marginLeft: '35%' ,
              fontSize: Device.isIOS ? 21 : 23,
              // fontWeight: 'bold',
    },
    custHeadText: {
        // backgroundColor: 'blue',
        textAlign: 'center',
        ...font.family.medium, 
        color: '#ffffff',
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
        backgroundColor: '#e91c1a', 
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
        backgroundColor: '#e91c1a', 
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