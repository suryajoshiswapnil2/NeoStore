

// Complete

import React, { Component } from 'react'
import {View, Text, Image,TouchableOpacity } from 'react-native'

import {Rating} from 'react-native-ratings'
import {ItemStyles} from './styles'

export default class ProductItem extends Component {

    constructor(props)
    {
        super(props)
    } 

    render(){
        return(
            <TouchableOpacity onPress={ () => { this.props.navigate('ProductDetails', { _id: this.props.id})}} >       
            <View style={ItemStyles.itemContainer}>
                    <View style={ItemStyles.imageContainer}>
                        <Image style={ItemStyles.image} source={{uri: this.props.url } }></Image>
                    </View>
                    <View style={ItemStyles.detailsPane}>
                        <View style={ItemStyles.topContainer}>
                            <Text style={ItemStyles.title}>{this.props.name}</Text>
                        <View><Text style={ItemStyles.manufacturer}>{this.props.producer}</Text></View>
                        </View>
                        <View style={ItemStyles.bottomContainer}>
                            <Text style={ItemStyles.price}>Rs. {this.props.cost}</Text>
                            {/* <Text style={ItemStyles.rating}>{this.props.rating}</Text> */}
                            <Rating
                                type='custom'
                                ratingCount={5}
                                startingValue={this.props.rating}
                                onFinishRating={this.ratingCompleted}
                                imageSize={15}
                                style={{ paddingVertical: 8, }}
                                readonly
                                ratingBackgroundColor='gray'
                                // ratingColor='#000'
                                />
                        </View>
                    </View>
                </View>
        </TouchableOpacity>
        )
    }
}
