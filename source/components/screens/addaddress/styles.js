
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
            backgroundColor: colors.darkWhite
        },
        loaderContainer: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.red
        },
        mainContainer: {
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'flex-start',
        },   

        button: {
            marginVertical: 30,
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
            fontSize: font.medium,
            color: colors.white,
        },

        buttonContainer: {
            width: '92%',
            justifyContent: 'center',
            marginHorizontal: 18,
        },
        title: {
            ...font.family.medium,
            // fontSize: font.smallMed,
        },
        input: {
            
            backgroundColor: colors.white,
            paddingHorizontal: 10,
            color: colors.lightBlack,
            
        },
        full: {
            ...font.family.book,
            width: Device.window.width - 50 
        },
        half: {
            ...font.family.book,
            width: Device.window.width / 2 - 43 
        },
        inputContainer: {
            marginTop: 20,
        },
        titleContainer: {
            // width: Device.window.width - 30 
            marginBottom: 15,
        },
        multi: {
            height: Device.isIOS? 80: 80 ,
            marginVertical: Device.isIOS ? 10: 0,
        },
        single: {
            height: Device.isIOS? undefined: 40 ,
            marginVertical: Device.isIOS ? 10: 0,
        },
        inputRowContainer:{
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }

          
    }
);