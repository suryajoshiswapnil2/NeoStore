// Complete

import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator
} from "react-native";
import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API, get } from "../../../lib/api";
import ProductItem from "./productItem";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isListLoading: false,
      end: false,
      limit: 0,
      offset: 0,
      list: [],
      page: 1,
      product_category_id: this.props.navigation.state.params._id
    };
  }

  lazyLoad = () => {
    if (this.state.end) return;

    this.setState({
      isListLoading: true
    });

    let { list, limit, offset, page } = this.state;
    url =
      API.productList +
      "?product_category_id=" +
      this.state.product_category_id +
      "&limit=6" +
      "&page=" +
      page;

    return get(
      url,
      null,
      res => {
        if (res.status != 200)
          this.setState({
            end: true,
            isListLoading: false
          });
        else {
          this.setState({
            list: list.concat(res.data),
            limit: limit + res.data.length,
            offset: offset + res.data.length,
            page: page + 1,
            isListLoading: false
          });
        }
      },
      e => {
        alert(e.message);
        this.setState({
          end: true,
          isListLoading: false
        });
      }
    );
  };

  componentDidMount() {
    this.lazyLoad();
    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 22 }}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.navigate("Home");
            }}
            title={this.props.navigation.state.params.title}
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
          title={this.props.navigation.state.params.title}
          rightIcon="search"
        />
        <View style={styles.content}>
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
            onEndReached={info => {
              this.lazyLoad();
            }}
            onEndReachedThreshold={0.1}
            //   ListEmptyComponent = {
            //     <View style={styles.mainContainer}>
            //         <Text>No products in list</Text>
            //     </View>
            //   }
            ListFooterComponent={
              this.state.isListLoading && (
                <View>
                  <ActivityIndicator color="blue" size="large" />
                </View>
              )
            }
            keyExtractor={item => item.id.toString()}
          />

          {/* {this.state.isListLoading &&  
            (<View><ActivityIndicator color='red' size='small'/></View>) 
            } */}
          {this.state.end && (
            <Text style={{ opacity: 0.5, textAlign: "center" }}>
              All items are loaded successfully.
            </Text>
          )}
          {/* <View style={styles.bottomViewer}>
          <Text style={styles.bottomViewerText}>
            SHOWING {this.state.offset} OF {this.state.limit}
          </Text>
        </View> */}
        </View>
        {!this.state.isListLoading && (
          <View style={styles.bottomViewer2}>
            <Text style={styles.bottomViewerText2}>
              {this.state.offset} OF {this.state.limit}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
