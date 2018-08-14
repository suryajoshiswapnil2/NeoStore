
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
            marginVertical: 10,
        },
        titleContainer: {
            width: Device.window.width,
            borderBottomColor: colors.gray,
            borderBottomWidth: 0.8,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 50,
        },
        title:{
            fontSize: font.smallMed,
            color: colors.lightBlack,
        },
        name: {
            fontSize: 22,
            color: colors.lightBlack,
            fontWeight: font.weight.bold,
            marginBottom: 5,
        },
        address: {
            fontSize: 18,
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
            borderWidth: 0.5,
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
        }
          
    }
);

