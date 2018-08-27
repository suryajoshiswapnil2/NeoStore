// Complete

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Alert,
  Keyboard,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Share,
  Text,
  StatusBar,
  Image,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import {
  userData,
  userDataService,
  getCategory
} from "../../../lib/serviceProvider";
import { CustomHeader } from "../../header/header";
import { styles } from "./styles";
import { API, post } from "../../../lib/api";
import { showError } from "../../../utils/validators";
import Icon from "../../../utils/icon";
import { Rating, AirbnbRating } from "react-native-ratings";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product_id: props.navigation.state.params._id,
      data: [],
      curImg: "",
      isBuying: false,
      isRating: false,
      newRating: 3,
      product_quantity: "",
      isOOS: false, // out of stock
      imageContainer: false
    };
  }

  _addToCart = () => {
    let formData = new FormData();
    formData.append("product_id", this.state.product_id);
    formData.append("quantity", this.state.product_quantity);

    post(
      API.addToCart,
      { access_token: userData.user_data.access_token },
      formData,
      res => {
        if (res.status == 200) {
          userDataService.setUserData("total_carts", res.total_carts);
          Alert.alert(
            "Info",
            res.user_msg,
            [
              {
                text: "Ok",
                onPress: () => {
                  this.setState({
                    isBuying: false
                  });
                }
              }
            ],
            {
              cancelable: false
            }
          );
        } else alert(res.user_msg);
      },
      err => {
        console.log(err);
        alert(err.message);
      }
    );

    return false;
  };

  componentDidMount() {
    let url = API.productDetails + "?product_id=" + this.state.product_id;
    return fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            isLoading: false,
            data: responseJson.data,
            curImg: responseJson.data.product_images[0].image
          });
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
  shareData = () => {
    let { data, curImg } = this.state;
    let msg = `${
      userData.user_data.first_name
    } want to share with you a product from NeoSTORE\n${data.name} ( ${
      data.producer
    } )\n${data.description}\n${curImg}`;

    Share.share(
      {
        message: msg,
        url: "https://neosofttech.in",
        title: this.state.data.name
      },
      {
        // Android only:
        dialogTitle: "NeoSTORE share"
      }
    );
  };

  renderImages = () => {
    let JSX = [];
    this.state.data.product_images.forEach((element, index) => {
      JSX.push(
        <TouchableOpacity
          key={index}
          onPress={() => this.setState({ curImg: element.image })}
        >
          <Image source={{ uri: element.image }} style={styles.content} />
        </TouchableOpacity>
      );
    });
    return JSX;
  };

  _postRating = () => {
    let formData = new FormData();
    formData.append("product_id", this.state.product_id);
    formData.append("rating", this.state.newRating);

    post(
      API.setRatings,
      {},
      formData,
      res => {
        if (res.status == 200) {
          Alert.alert(
            "Info",
            res.user_msg,
            [
              {
                text: "Ok",
                onPress: () => {
                  this.setState({
                    isRating: false
                  });
                }
              }
            ],
            { cancelable: false }
          );
        } else alert(res.user_msg);
      },
      err => alert(err.message)
    );

    return true;
  };

  rateItems = rating => {
    this.setState({
      newRating: rating
    });
  };

  render() {
    console.log("render called", this.state.data.name);
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomHeader
            leftIcon="angle-left"
            style={{ fontSize: 20 }}
            leftAction={() => {
              this.props.navigation.goBack();
            }}
            title={this.state.data.name}
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
          title={this.state.data.name}
          rightIcon="search"
        />
        <View style={styles.mainContainer}>
          {/* <View> */}
          <ScrollView style={styles.scroll}>
            <View style={styles.header}>
              <Text style={styles.name}>{this.state.data.name}</Text>
              <Text style={styles.category}>
                Category - {getCategory(this.state.data.product_category_id)}
              </Text>
              <View style={styles.bottomContainer}>
                <Text style={styles.company}>{this.state.data.producer}</Text>
                {/* <Text style={styles.rating}>{this.state.data.rating}</Text> */}
                <Rating
                  type="custom"
                  ratingCount={5}
                  startingValue={this.state.data.rating}
                  imageSize={15}
                  readonly
                  ratingBackgroundColor="#7f7f7f"
                  ratingColor="#ffba00"
                />
              </View>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.imageHolder}>
                <View style={styles.imageView}>
                  <Text style={styles.costt}>Rs. {this.state.data.cost}</Text>
                  {this.state.isOOS ? (
                    <Text style={styles.oos}>Out of Stock</Text>
                  ) : null}
                  <TouchableOpacity onPress={() => this.shareData()}>
                    <Icon name="share" size={25} color="gray" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({ imageContainer: true })}
                >
                  <View style={styles.mainImage}>
                    <Image
                      source={{ uri: this.state.curImg }}
                      style={styles.selectedImage}
                    />
                  </View>
                </TouchableOpacity>
                <ScrollView horizontal={true} style={styles.images}>
                  {this.renderImages()}
                </ScrollView>
              </View>
              <View style={styles.description}>
                <Text style={styles.descTitle}>DESCRIPTION</Text>
                <Text style={styles.desc}>{this.state.data.description}</Text>
              </View>
            </View>
          </ScrollView>
          {/* </View> */}

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => {
                this.setState({ isBuying: true });
              }}
            >
              <Text style={styles.buttonText}>BUY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isRating: true });
              }}
            >
              <Text style={styles.buttonText}>RATE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isBuying}
            onRequestClose={() => {
              this.setState({ isBuying: false });
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ isBuying: false });
              }}
            >
              <View style={styles.containerContent}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={styles.modalContent}>
                    <Text style={styles.nameModal}>{this.state.data.name}</Text>
                    <View style={styles.imageModal}>
                      <Image
                        source={{ uri: this.state.curImg }}
                        style={[styles.selectedImage]}
                      />
                    </View>
                    <Text style={styles.qty}>Enter Qty</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={1}
                      style={styles.qinput}
                      keyboardType="numeric"
                      onChangeText={input => {
                        this.setState({ product_quantity: input });
                      }}
                    />
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { backgroundColor: "red", width: 180 }
                      ]}
                      onPress={() => {
                        this._addToCart();
                      }}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { fontWeight: "bold", textAlign: "center" }
                        ]}
                      >
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isRating}
            onRequestClose={() => {
              this.setState({ isRating: false });
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ isRating: false });
              }}
            >
              <View style={styles.containerContent}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.nameModal}>{this.state.data.name}</Text>
                    <Image
                      source={{ uri: this.state.curImg }}
                      style={styles.selectedImage}
                    />
                    <View style={{ marginVertical: 20 }}>
                      <AirbnbRating
                        type="custom"
                        ratingCount={5}
                        startingValue={this.state.newRating}
                        onFinishRating={this.rateItems}
                        imageSize={45}
                        fractions={0}
                        ratingBackgroundColor="#7f7f7f"
                        ratingColor="#ffba00"
                        showRating={false}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { backgroundColor: "red", width: 230, marginTop: 20 }
                      ]}
                      onPress={() => {
                        this._postRating();
                      }}
                    >
                      <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
                        RATE NOW
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.imageContainer}
            onRequestClose={() => {
              this.setState({ imageContainer: false });
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ imageContainer: false })}
            >
              <View style={styles.containerContent}>
                <TouchableWithoutFeedback>
                  <Animated.View style={styles.bigMainImage}>
                    <ScrollView
                      style={{ flex: 1 }}
                      minimumZoomScale={0.5}
                      maximumZoomScale={3}
                      scrollEnabled={true}
                    >
                      <Image
                        source={{ uri: this.state.curImg }}
                        style={styles.modalImage}
                      />
                    </ScrollView>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }
}
