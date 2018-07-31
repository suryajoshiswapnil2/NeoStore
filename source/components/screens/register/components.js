/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


var checkedItem = null; 

export class RadioGroup extends Component {
    checkRadio = () => {

        // for ( i in this.props.children)
        // {
        //     if( ) 
        // } 


    };
    render() {
        return (
            <View style={{flexDirection: 'row'}} onTouchEnd = { this.checkRadio }>{this.props.children}</View>
    );
    }
}

export class Radio extends Component{
    
    state = {
        checked : this.props.checked,
    }

    componentDidMount = () =>  {
        console.log(this.props.children);
    }

    render() {
    return (
            <TouchableOpacity style={styles.container} onPress= { () =>  { checkedItem = this.props.refs; this.setState( {  checked: !this.state.checked  })}  } >
                <View style={[styles.circle, this.state.checked ? {backgroundColor: 'rgba(256,256,256,1.0)',} : {backgroundColor: 'rgba(256,256,256,0)',}, ]} >
            </View>
            <View>
                <Text style={ { color: this.props.color, fontSize: 17, marginRight: 10, fontWeight: 'bold' }}>{this.props.label}</Text>
            </View>
        </TouchableOpacity>
    );
  }
}


export class CheckBox extends Component{
  
    state = {
        checked : this.props.checked, 
    }
    
    render() {
    return (
            <TouchableOpacity style={styles.container} onPress= { () =>  {  this.setState( {  checked: !this.state.checked  })}  } >
            <View style={styles.checkboxContainer}>
            <View style={[styles.square, this.state.checked ? {backgroundColor: 'rgba(256,256,256,1.0)',} : {backgroundColor: 'rgba(256,256,256,0)',}, ]} ></View>
            </View>
            <View>
                {/* <Text style={ { color: this.props.color, fontSize: 17, marginRight: 10, fontWeight: 'bold' }}>{this.props.label}</Text> */}
                <Text style={{marginLeft: 10}}>{this.props.children}</Text>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(
    {
        circle: {
            width: 15,
            height: 15,
            marginRight: 10,
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 15 / 2,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        square: {
            width: 7,
            height: 7,
        },
        checkboxContainer: {
            width: 12,
            height: 12,
            borderColor: '#ffffff',
            borderWidth: 1,
            padding: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
);