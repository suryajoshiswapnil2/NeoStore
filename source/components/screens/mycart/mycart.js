//  Complete

import React, { Component } from "react";
import {
  View,
  Vibration,
  Alert,
  StatusBar,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API, get, post } from "../../../lib/api";
import { showError } from "../../../utils/validators";
import Icon from "../../../utils/icon";
import { SwipeListView } from "react-native-swipe-list-view";
import ModalDropdown from "react-native-modal-dropdown";
import { userData, userDataService } from "../../../lib/serviceProvider";

export default class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      access_token: "",
      data: [],
      total: 0,
      product_quantity: 0,
      editingIndex: -1
    };
  }

  // API call for edit cart
  _editCart = (a, b) => {
    // a -> product_id , b-> value

    this.setState({
      editingIndex: a
    });

    let { data, total } = this.state;

    let index = data.findIndex(elem => elem.product_id == a);

    let formData = new FormData();
    formData.append("product_id", data[index].product_id);
    formData.append("quantity", b);

    post(
      API.editCart,
      { access_token: userData.user_data.access_token },
      formData,
      res => {
        if (res.status == 200) {
          data[index].quantity = b;
          let cost = total - data[index].product.sub_total;

          let sum = data[index].product.cost * b;
          // Destructuring gives references instead of local values
          data[index].product.sub_total = sum;
          cost += sum;

          this.setState({
            // data: data,
            editingIndex: -1,
            total: cost
          });
          return true;
        } else {
          this.setState({
            editingIndex: -1
          });
          return false;
        }
      },
      err => {
        this.setState({
          editingIndex: -1
        });
        alert(err.message);
        return false;
      }
    );
  };

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  // Delete row from Flat-List
  // Accept Two arguments rowMap which contain data and Key for identification
  _deleteItem = async (rowMap, rowKey) => {
    Vibration.vibrate(100);

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

            post(
              API.deleteCart,
              { access_token: this.state.access_token },
              formData,
              res => {
                if (res.status == 200) {
                  this.closeRow(rowMap, rowKey);
                  const newData = [...this.state.data];
                  const prevIndex = this.state.data.findIndex(
                    item => item.product_id === rowKey
                  );
                  newData.splice(prevIndex, 1);

                  userDataService.setUserData("total_carts", res.total_carts);
                  alert(res.user_msg);
                  this.setState({
                    data: newData,
                    isLoading: false
                  });
                  this._cal_total();
                } else {
                  alert(res.user_msg);
                  this.setState({
                    isLoading: false
                  });
                }
              },
              err => {
                alert(err.message);
                this.setState({
                  isLoading: false
                });
              }
            );
          }
        }
      ],
      { cancelable: false }
    );
  };

  componentDidMount = () => {
    this.setState({
      access_token: userData.user_data.access_token
    });

    return get(
      API.listCartItems,
      {
        access_token: userData.user_data.access_token
      },
      res => {
        if (res.status == 200) {
          this.setState({
            isLoading: false,
            data: res.data
          });

          if (res.data == null) return;

          this._cal_total();
        } else {
          showError(res.user_msg);
          this.setState({
            isLoading: false
          });
        }
      },
      err => {
        this.setState({
          isLoading: false
        });
        console.log(err);
        alert(err.message);
      }
    );
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
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 19 }}
            leftAction={() => {
              this.props.navigation.navigate("Home");
            }}
            title="My Cart"
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
          style={{ fontSize: 21 }}
          leftAction={() => {
            this.props.navigation.navigate("Home");
          }}
          title="My Cart"
          rightIcon="search"
        />

        {this.state.data == null || this.state.data.length == 0 ? (
          <View style={styles.mainContainer}>
            <Text>No products in list</Text>
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <SwipeListView
              useFlatList
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
                      <View style={{ width: 96 }}>
                        <ModalDropdown
                          dropdownStyle={styles.dropDownStyle}
                          style={styles.modelContent}
                          options={[1, 2, 3, 4, 5, 6, 7, 8]}
                          defaultValue={item.quantity.toString()}
                          defaultIndex={item.quantity - 1}
                          onSelect={(index, value) => {
                            return this._editCart(item.product_id, value);
                          }}
                          dropdownTextStyle={{
                            color: "black",
                            fontSize: 15,
                            textAlign: "center",
                            backgroundColor: "#ededed"
                          }}
                          showsVerticalScrollIndicator={false}
                          dropdownTextHighlightStyle={{
                            color: "white",
                            fontSize: 18,
                            textAlign: "center",
                            backgroundColor: "blue"
                          }}
                        >
                          {this.state.editingIndex == item.product_id ? (
                            <View styles={styles.loading}>
                              <ActivityIndicator size="small" color="green" />
                            </View>
                          ) : (
                            <View style={{ flexDirection: "row" }}>
                              <Text style={{ fontSize: 16 }}>
                                {item.quantity}{" "}
                              </Text>
                              <Icon
                                name="angle-down"
                                style={{ marginTop: 2 }}
                                size={15}
                              />
                            </View>
                          )}
                        </ModalDropdown>
                      </View>
                      {/* <Text style={styles.cost}>{item.quantity}</Text> */}
                      <Text style={styles.cost}>
                        <Icon name="rupee" size={15} />{" "}
                        {item.product.cost * item.quantity}
                        .00
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                    style={styles.iconDelete}
                    onPress={() => {
                      this._deleteItem(rowMap, data.item.product_id);
                    }}
                  >
                    <Icon name="delete" color="white" size={17} />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-75}
              disableRightSwipe={true}
              keyExtractor={item => item.product.id.toString()}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.total}>TOTAL</Text>
              <Text style={styles.total}>
                <Icon name="rupee" size={15} /> {this.state.total}
                .00
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  this.props.navigation.navigate("AddressList");
                }}
              >
                <Text style={[styles.buttonText]}>ORDER NOW</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
