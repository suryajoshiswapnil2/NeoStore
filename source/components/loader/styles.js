
import {StyleSheet} from 'react-native';
import * as Device from '../../lib/globals'
import colors from '../../utils/colors'
import font from '../../utils/fontSize'

export const styles = StyleSheet.create(
    {
 
        container: {
            flex: 1,
            marginTop: Device.iosMargin,
        },

        transparent: {
            opacity: 0.1,  
        },

        flex1: {
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
);