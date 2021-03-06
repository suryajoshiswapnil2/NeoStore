//Complete

import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Alert,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Vibration
} from "react-native";

import * as Device from "../../../lib/globals";
import Feather from "react-native-vector-icons/Feather";
import { userData, userDataService } from "../../../lib/serviceProvider";
import { CustomHeader } from "../../header/header";
import { styles } from "./styles";
import { post, API } from "../../../lib/api";
import { databaseService, getRowsFromResult } from "../../../utils/addressAPI";

export default class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      addr_arr: [],
      selected: 0,
      loading: false,
      useSQLite: true
    };

    this.props.navigation.addListener("willFocus", () => {
      this._get_address();
    });

    this.deleteItem = this.deleteItem.bind(this);
  }

  _get_address = () => {
    this.setState({
      isLoading: true
    });

    if (this.state.useSQLite) {
      // SQlite Code
      databaseService.select("Address", results => {
        let rows = getRowsFromResult(results);
        this.setState({ isLoading: false, addr_arr: rows });
      });

      return;
    }

    // AsyncStorage Code
    AsyncStorage.getItem("addr").then(val => {
      if (val == null) {
        this.setState({
          isLoading: false,
          addr_arr: null
        });
        return;
      }

      this.setState({
        addr_arr: JSON.parse(val),
        isLoading: false
      });
    });
  };

  componentDidMount() {
    // AsyncStorage.getItem("addr").then(val => {
    //   if (val == null) {
    //     this.setState({
    //       isLoading: false,
    //       addr_arr: null
    //     });
    //     return;
    //   }
    //   // console.log(val)
    //   this.setState({
    //     addr_arr: JSON.parse(val),
    //     isLoading: false
    //   });
    // });
  }

  //   componentWillUnmount() {
  //     databaseService.closeDatabase();
  //   }

  _place_order = () => {
    this.setState({
      loading: true
    });

    let form = new FormData();
    let { addr_arr, selected } = this.state;

    addr_arr = addr_arr[selected];
    form.append(
      "address",
      addr_arr.addr +
        ", " +
        addr_arr.landmark +
        ", " +
        addr_arr.city +
        "-" +
        addr_arr.zip_code +
        ", " +
        addr_arr.country
    );

    if (Device.isIOS) {
      // if (true) {
      this.props.navigation.navigate("Payment", { address: form });
      return true;
    }

    post(
      API.order,
      { access_token: userData.user_data.access_token },
      form,
      res => {
        if (res.status == 200) {
          userDataService.setUserData("total_carts", 0);
          Alert.alert("Info", res.user_msg, [
            {
              text: "Ok",
              onPress: () => {
                this.props.navigation.navigate("Home");
              }
            }
          ]);
        } else {
          alert(res.user_msg);
          this.setState({ loading: false });
        }
      },
      err => {
        alert(err.message);
        this.setState({
          loading: false
        });
      }
    );
  };

  editItem = (elem, index, id) => {
    Vibration.vibrate(100);
    Alert.alert(
      "Edit address",
      "Are you sure to edit?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Edit",
          onPress: () => {
            // console.log(elem);
            this.props.navigation.navigate("AddAddress", {
              data: elem,
              editIndex: index,
              id: id
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  deleteItem = (index, id) => {
    Vibration.vibrate(100);
    Alert.alert(
      "Delete address",
      "Are you sure to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            this.setState({
              addr_arr: this.state.addr_arr.filter((_value, i) => i !== index)
            });

            if (this.state.useSQLite) {
              databaseService.removeAddress(id);
              return;
            }

            // Make Permanent changes to AsyncStorage
            AsyncStorage.setItem("addr", JSON.stringify(this.state.addr_arr));
          }
        }
      ],
      { cancelable: false }
    );
  };

  renderItems = () => {
    // console.log("called", this.state.addr_arr);
    return this.state.addr_arr.map((elem, index) => (
      <View key={index} style={styles.addressContainer}>
        <TouchableOpacity onPress={() => this.setState({ selected: index })}>
          <View
            style={[
              styles.radioButton,
              this.state.selected == index ? styles.selected : null
            ]}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.name}>{elem.name}</Text>
          <Text style={styles.address}>
            {elem.addr}, {elem.landmark}, {elem.city}, {elem.state} -{" "}
            {elem.zip_code}, {elem.country}
          </Text>
          <TouchableOpacity
            onPress={() => this.deleteItem(index, elem.id)}
            style={styles.delete}
          >
            <Feather name="x" style={styles.iconss} color="#8e8e8e" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.editItem(elem, index, elem.id)}
            style={styles.edit}
          >
            <Feather
              name="edit-2"
              style={styles.iconss}
              color="#8e8e8e"
              size={15}
            />
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.goBack();
            }}
            title="Address List"
            rightIcon="plus"
            rightAction={() => {
              this.props.navigation.navigate("AddAddress");
            }}
          />
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
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
            this.props.navigation.goBack();
          }}
          title="Address List"
          rightIcon="plus"
          rightAction={() => {
            this.props.navigation.navigate("AddAddress");
          }}
        />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Shipping Address</Text>
          </View>
          {this.state.addr_arr == null ? (
            <View style={styles.noAddress}>
              <Text>No Address in list, Please add.</Text>
            </View>
          ) : (
            <ScrollView>{this.renderItems()}</ScrollView>
          )}

          {this.state.addr_arr != null ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => {
                  this._place_order();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { fontWeight: "bold", textAlign: "center" }
                  ]}
                >
                  PLACE ORDER
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
