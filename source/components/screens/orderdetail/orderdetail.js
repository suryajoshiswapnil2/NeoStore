// Complete

import React, { Component } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { CustomHeader } from "../../header/header";
import Icon from "../../../utils/icon";
import { styles } from "./styles";
import { API, get } from "../../../lib/api";
import { userData } from "../../../lib/serviceProvider";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      access_token: "",
      data: [],
      total: 0,
      order_id: this.props.navigation.state.params.order_id
    };
  }

  componentDidMount = () => {
    get(
      API.orderDetail + "?order_id=" + this.state.order_id,
      { access_token: userData.user_data.access_token },
      res => {
        if (res.status == 200)
          this.setState({ data: res.data, isLoading: false });
        else alert(res.user_msg);
      },
      err => alert(err.message)
    );
  };

  render() {
    const { order_id } = this.props.navigation.state.params;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.goBack();
            }}
            title={"Order ID: " + order_id}
            rightIcon="search"
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CustomHeader
          leftIcon="angle-left"
          style={{ fontSize: 19 }}
          leftAction={() => {
            this.props.navigation.goBack();
          }}
          title={"Order ID: " + order_id}
          rightIcon="search"
        />

        {this.state.data.length == 0 ? (
          <View style={styles.mainContainer}>
            <Text>No products in list</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.data.order_details}
              renderItem={({ item }) => (
                <View style={styles.boxContainer}>
                  <View style={styles.left}>
                    <View style={styles.textContainer}>
                      <Image
                        source={{ uri: item.prod_image }}
                        style={styles.images}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.rightContainer}>
                      <Text style={styles.upperText}>{item.prod_name}</Text>
                      <Text style={styles.bottomText}>
                        ({item.prod_cat_name})
                      </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                      <Text style={styles.cost}>QTY : {item.quantity}</Text>
                      <Text style={styles.cost}>
                        {/* &#8377; */}
                        <Icon name="rupee" size={15} /> {item.total}
                        .00
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.total}>TOTAL</Text>
              <Text style={styles.total}>
                {/* &#8377;  */}
                <Icon name="rupee" size={15} color="#000" />{" "}
                {this.state.data.cost}
                .00
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
