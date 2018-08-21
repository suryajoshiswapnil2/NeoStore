
import {StyleSheet} from 'react-native';
import * as Device from '../../../lib/globals'
import colors from '../../../utils/colors'
import font from '../../../utils/fontSize'

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: Device.iosMargin,
            justifyContent: 'flex-start',
            // alignItems: 'center',
            backgroundColor: colors.white
        },
        loaderContainer: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: colors.red
        },
        mainContainer: {
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'flex-start',
        },   

        button: {
            // marginVertical: 30,
            backgroundColor: colors.gray,
            height: 55,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            color: colors.white,
            borderRadius: 6,   
        },

        buttonText: {
            // ...font.family.book,
            fontSize: font.medium,
            color: colors.white,
        },

        buttonContainer: {
            width: '92%',
            justifyContent: 'center',
            marginHorizontal: 18,
            marginVertical: 20,
        },
        titleContainer: {
            width: Device.window.width,
            borderBottomColor: colors.gray,
            borderBottomWidth: 0.5,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 50,
        },
        title:{
            ...font.family.book,
            fontSize: font.smallMed,
            color: colors.lightBlack,
        },
        name: {
            ...font.family.medium,
            fontSize: 19,
            // fontFamily: Device.isAndroid ? 'Gotham-Medium' : undefined,
            color: colors.lightBlack,
            opacity: Device.isIOS? undefined:  0.8,            
            // fontWeight: Device.isAndroid? undefined: font.weight.bold,
            marginBottom: 5,
        },
        address: {
            ...font.family.book,
            opacity:Device.isIOS? undefined:  0.5,
            // fontFamily: Device.isAndroid ? 'Gotham-Book' : undefined,
            fontSize: 15,
            color: colors.lightBlack,
            width: 290,
        },
        radioButton: {
            width: 18,
            height: 18,
            backgroundColor: colors.white,
            marginRight: 12,
            borderRadius: 9,
            borderColor: colors.lightGray,
            borderWidth: 3,
        },
        selected: {
            backgroundColor: colors.gray,
        },
        addressContainer:{
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
            marginTop:15,
        },
        content: {
            borderColor: colors.gray,
            borderWidth: Device.isIOS? 0.25 : 0.2,
            borderRadius: 4,
            padding: 10,
            // marginTop: 13,
        },
        delete:{
            position: 'absolute',
            
            // alignSelf: 'flex-end',
            right: 5,
            // color: colors.gray,
            top: 5,
        },
        iconss:{
            ...font.family.book,
        }
          
    }
);

