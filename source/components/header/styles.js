import {
    StyleSheet
} from 'react-native';
import * as Device from '../../lib/globals'

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#e91c1a',
        height: Device.isIOS ? 50 : 50,
        marginTop: Device.isX ? 15 : 0,
        width: Device.window.width,
        alignItems: Device.isAndroid ? 'center' : 'flex-end',
        justifyContent: 'center',
        padding: 10,
        zIndex: 2,
    },
    headText: {
        color: '#ffffff',
        // marginLeft: '35%' ,
        fontSize: 22,
        // fontWeight: 'bold',
    },
    custHeadText: {
        color: '#ffffff',
        // marginLeft: '35%' ,
        fontSize: 25,
        fontWeight: 'bold',
    },
    leftContainer: {
        position: 'absolute',
        left: Device.isIOS ? 15 : 15,
        bottom: Device.isIOS ? 12 : 11,
    },
    rightContainer: {
        position: 'absolute',
        right: Device.isIOS ? 15 : 15,
        bottom: Device.isIOS ? 12 : 15,
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
    }
});