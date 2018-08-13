
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
        titleContainer: {
            width: Device.window.width - 34,
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 60,
        },
        title:{
            fontSize: font.smallMed,
            color: colors.lightBlack,
        },
        name: {
            fontSize: font.medium   ,
            color: colors.lightBlack,
            fontWeight: font.weight.bold
        },
        address: {
            fontSize: font.small,
            color: colors.lightBlack,
        },
        radioButton: {
            width: 18,
            height: 18,
            backgroundColor: colors.white,
            marginRight: 20,
            borderRadius: 9,
            borderColor: colors.gray,
            borderWidth: 4,

        },
        addressContainer:{
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        }
          
    }
);