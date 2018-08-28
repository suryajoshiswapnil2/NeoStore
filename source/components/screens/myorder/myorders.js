// Complete

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API, get } from "../../../lib/api";
import { userData } from "../../../lib/serviceProvider";
import Icon from "../../../utils/icon";

export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      // access_token: '',
      data: [],
      isSearched: false,
      dataList: []
    };
  }

  searchItems = search => {
    if (search.trim() === "")
      return this.setState({
        isSearched: false
      });

    let data = this.state.data.filter(value => {
      for (let i in value) {
        if (
          value[i]
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0
        )
          return true;
      }
    });
    this.setState({
      isSearched: true,
      dataList: data
    });
    // console.log("filtered data", data);
  };

  renderPrice = value => {
    return (
      <View style={styles.costContainer}>
        {/* <Text style={styles.icon}>&#8377; </Text> */}
        <Text style={styles.cost}>
          <Icon name="rupee" size={15} /> {value}
          .00
        </Text>
      </View>
    );
  };

  componentDidMount = () => {
    get(
      API.orderList,
      { access_token: userData.user_data.access_token },
      res => {
        if (res.status == 200) {
          this.setState({
            isLoading: false,
            data: res.data
          });
        } else {
          alert(res.user_msg);
          this.setState({
            isLoading: false
          });
        }
      },
      err => {
        console.log(err);
        alert(err.message);
        this.setState({
          isLoading: false
        });
      }
    );
  };

  render() {
    // let dummy = [{key: 'a', id: 15, cost: 1554, created: '8 aug 2018'},{key: 'b', id: 1984, cost: 1554, created: '8 aug 2018'}]

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.navigate("Home");
            }}
            title="My Orders"
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
          style={{ fontSize: 20 }}
          leftAction={() => {
            this.props.navigation.navigate("Home");
          }}
          title="My Orders"
          rightIcon="search"
          rightCallback={data => {
            this.searchItems(data);
          }}
        />
        <View style={styles.mainContainer}>
          {this.state.data.length == 0 ? (
            <Text>No products in list</Text>
          ) : (
            <FlatList
              data={
                this.state.isSearched ? this.state.dataList : this.state.data
              }
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("OrderDetail", {
                      order_id: item.id
                    });
                  }}
                >
                  <View style={styles.boxContainer}>
                    <View style={styles.left}>
                      <View style={styles.textContainer}>
                        <Text style={styles.upperText}>
                          Order ID: {item.id}
                        </Text>
                      </View>
                      <View style={styles.textBottomContainer}>
                        <Text style={styles.bottomText}>
                          Ordered Date: {item.created}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      {/* <Text style={styles.cost}>&#8377; {item.cost}</Text> */}
                      {this.renderPrice(item.cost)}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}
