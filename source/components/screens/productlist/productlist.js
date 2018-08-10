import React, { Component } from "react";
import {
  View,
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
import ProductItem from "./productItem";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      limit: 0,
      offset: 0,
      list: [],
      dataSource: [],
      product_category_id: this.props.navigation.state.params._id
    };
  }

  fetchResults = () => {
    this.setState({
      isLoading: true
    });

    const { limit, offset, list, dataSource } = this.state;
    // console.log('>called',offset, limit)
    if (offset >= limit) {
      this.setState({
        isLoading: false
      });
      return false;
    } else
      this.setState({
        list: list.concat(
          dataSource.slice(offset, offset + 7 > limit ? limit : offset + 7)
        ),
        offset: offset + 7 > limit ? limit : offset + 7
      });

    this.setState({
      isLoading: false
    });
    // return list
  };

  componentDidMount() {
    // console.log('called ComponentDidMount')
    let url =
      API.productList +
      "?product_category_id=" +
      this.state.product_category_id;
    // alert(url)
    return fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
            limit: responseJson.data.length,
            offset: 0
            // list: responseJson.data.slice(0,5),
          });
          this.fetchResults();
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
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          {/* <StatusBar barStyle = 'dark-content' hidden={false} /> */}
          {/* <CustomHeader leftIcon='menu' leftAction={this.props.navigation.openDrawer} title={this.props.navigation.state.params.title}  rightIcon='search'/> */}
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        <CustomHeader
          leftIcon="chevron-left"
          style={{ fontSize: 20 }}
          leftAction={() => {
            this.props.navigation.navigate("Home");
          }}
          title={this.props.navigation.state.params.title}
          rightIcon="search"
        />
        <FlatList
          data={this.state.list}
          extraData={this.state}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              navigate={this.props.navigation.navigate}
              name={item.name}
              rating={item.rating}
              cost={item.cost}
              url={item.product_images}
              producer={item.producer}
            />
          )}
          onEndReached={() => {
            //  console.log('end reached')
            this.fetchResults();
          }}
          onEndReachedThreshold={0.1}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.bottomViewer}>
          <Text style={styles.bottomViewerText}>
            SHOWING {this.state.offset} OF {this.state.limit}
          </Text>
        </View>
      </View>
    );
  }
}
