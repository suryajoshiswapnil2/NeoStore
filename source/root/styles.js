import {StyleSheet} from 'react-native'
import colors from '../utils/colors'
import * as Device from '../lib/globals'

export default styles = StyleSheet.create(
    {
        
        container:{
            flex:1,
            alignItems: 'center',
            // justifyContent: 'flex-start',
            // backgroundColor: colors.red,
        },
        mainContainer: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        title: {
            color: colors.white,
            marginBottom: 5,
            // fontFamily: 'Gotham-Medium',
        }

    }
)