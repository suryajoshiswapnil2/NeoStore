// Global device specific constants

import {Platform, Dimensions } from 'react-native'

module.exports = {
        window: Dimensions.get('screen'), // Get Screen width and height as Object 
        os: Platform.OS,  // Platform either ios or android
        isIOS: Platform.OS == 'ios' ? true : false, // check for ios 
        isAndroid: Platform.OS == 'android' ? true: false,  
        isX: Dimensions.get("window").height == 812 ? true : false,
};
