import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Alert,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API } from "../../../lib/api";
import { showError } from "../../../utils/validators";
import Feather from "react-native-vector-icons/Feather";
import { Rating } from "react-native-ratings";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      access_token: "",
      data: [],
      total: 0
    };
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  // Delete row from flatlist
  // Accept Two arguments rowMap which contain data and Key for identification
  _deleteItem = async (rowMap, rowKey) => {
    Alert.alert(
      "Delete Item",
      "Are you sure to delete this item from cart!",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            this.setState({
              isLoading: true
            });

            let formData = new FormData();
            formData.append("product_id", rowKey);

            await fetch(API.deleteCart, {
              method: "POST",
              headers: {
                access_token: this.state.access_token
              },
              body: formData
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (res.status == 200) {
                  this.closeRow(rowMap, rowKey);
                  const newData = [...this.state.data];
                  const prevIndex = this.state.data.findIndex(
                    item => item.key === rowKey
                  );
                  newData.splice(prevIndex, 1);
                  this.setState({ data: newData });
                  alert(res.user_msg);
                  this.setState({
                    isLoading: false
                  });
                  this.render();
                } else {
                  alert(res.user_msg);
                  this.setState({
                    isLoading: false
                  });
                }
              })
              .catch(err => console.log(err));
          }
        }
      ],
      { cancelable: false }
    );
  };

  componentDidMount = async () => {
    let data = await AsyncStorage.getItem("access_token");

    this.setState({
      access_token: data
    });

    return fetch(API.listCartItems, {
      method: "GET",
      headers: {
        access_token: data
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 200) {
          //   console.log(responseJson)
          this.setState({
            isLoading: false,
            data: responseJson.data
          });
          if (responseJson.data == null) return;
          this._cal_total();
        } else {
          showError(responseJson.user_msg);
          this.setState({
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _cal_total = () => {
    if (this.state.data == null)
      this.setState({
        total: 0
      });
    let total = 0;
    this.state.data.forEach(elem => {
      total += elem.quantity * elem.product.cost;
    });
    this.setState({
      total: total
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        <CustomHeader
          leftIcon="chevron-left"
          style={{ fontSize: 19 }}
          leftAction={() => {
            this.props.navigation.goBack();
          }}
          title="Order ID: 15895"
          rightIcon="search"
        />

        {this.state.data == null ? (
          <View style={styles.mainContainer}>
            <Text>No products in list</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={styles.boxContainer}>
                  <View style={styles.left}>
                    <View style={styles.textContainer}>
                      <Image
                        source={{ uri: item.product.product_images }}
                        style={styles.images}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.rightContainer}>
                      <Text style={styles.upperText}>{item.product.name}</Text>
                      <Text style={styles.bottomText}>
                        ({item.product.product_category})
                      </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                      <Text style={styles.cost}>QTY : {item.quantity}</Text>
                      <Text style={styles.cost}>
                        &#8377; {item.product.cost * item.quantity}
                        .00
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.product.id.toString()}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.total}>TOTAL</Text>
              <Text style={styles.total}>
                &#8377; {this.state.total}
                .00
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
