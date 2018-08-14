import React, { Component } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  Keyboard,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Share,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { userData, sync, userDataService } from '../../../lib/serviceProvider';

import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API } from "../../../lib/api";
import { showError } from "../../../utils/validators";
import Feather from "react-native-vector-icons/Feather";
import { Rating } from "react-native-ratings";

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
    };
  }

  _addToCart = async () => {
    let formData = new FormData();
    formData.append("product_id", this.state.product_id);
    formData.append("quantity", this.state.product_quantity);
    await fetch(API.addToCart, {
      method: "POST",
      headers: {
        access_token: userData.user_data.access_token
      },
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status == 200) {
            userDataService.setUserData('total_carts', res.total_carts)    
            showError(res.user_msg);
        }
        else showError(res.user_msg);
      })
      .catch(err => console.error(err.message));
  };

 componentDidMount() {
    // let data = await AsyncStorage.getItem("access_token");

    // this.setState({
    //   access_token: data
    // });

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
    Share.share(
      {
        message: this.state.data.desc,
        url: "http://neosofttech.in",
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
        <TouchableOpacity key={index}
          onPress={() => this.setState({ curImg: element.image })}
        >
          <Image
            source={{ uri: element.image }}
            style={styles.content}
          />
        </TouchableOpacity>
      );
    });
    return JSX;
  };

  setModalVisible(visible) {
    this.setState({ isBuying: visible });
  }

  _postRating = () => {
    let formData = new FormData();
    formData.append("product_id", this.state.product_id);
    formData.append("rating", this.state.newRating);

    return fetch(API.setRatings, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          console.log(res);
          alert(res.user_msg);
        } else alert(res.user_msg);
      })
      .catch(error => console.log(error.message));
  };
  // _change_quantity = (input) => {
  //     if(input == 0 || input == 9)
  //         alert('Enter Quantity between 1-8')
  //     else if( input > 0 && input < 9)
  //         this.setState({product_quantity: input})
  //     else
  //         alert('Enter Quantity in Numbers only!')
  // }

  rateItems = rating => {
    // alert(rating)
    this.setState({
      newRating: rating
    });
  };

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
          style={{ fontSize: 19 }}
          leftAction={() => {
            this.props.navigation.goBack();
          }}
          title={this.state.data.name}
          rightIcon="search"
        />
        <View style={styles.mainContainer}>
          <View>
            <ScrollView style={{ marginBottom: 70 }}>
              <View style={styles.header}>
                <Text style={styles.name}>{this.state.data.name}</Text>
                <Text style={styles.category}>
                  Category - {this.state.data.product_category_id}
                </Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.company}>{this.state.data.producer}</Text>
                  {/* <Text style={styles.rating}>{this.state.data.rating}</Text> */}
                  <Rating
                    type="custom"
                    ratingCount={5}
                    startingValue={this.state.data.rating}
                    imageSize={15}
                    style={{}}
                    readonly
                    ratingBackgroundColor="#7f7f7f"
                    ratingColor="#ffba00"
                  />
                </View>
              </View>

              <View style={styles.detailContainer}>
                <View style={styles.imageHolder}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "85%",
                      justifyContent: "space-between",
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        color: "#ff0000",
                        fontWeight: "500"
                      }}
                    >
                      Rs. {this.state.data.cost}
                    </Text>
                    <TouchableOpacity onPress={() => this.shareData()}>
                      <Feather name="share-2" size={25} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.mainImage}>
                    <Image
                      source={{ uri: this.state.curImg }}
                      style={styles.selectedImage}
                    />
                  </View>
                  {/* <View style={styles.images}> */}
                  <ScrollView horizontal={true} style={styles.images}>
                    {this.renderImages()}
                    {/* {
                            this.state.data.product_images.map(element => {
                                return <Image source={{uri: element.image}}  style={{width: 105, height: 90, resizeMode: 'contain', borderColor: 'gray', borderWidth: 1, marginRight:10}}/>
                            })
                        } */}
                  </ScrollView>
                  {/* </View> */}
                </View>
                <View style={styles.description}>
                  <Text style={styles.descTitle}>DESCRIIPTION</Text>
                  <Text style={styles.desc}>{this.state.data.description}</Text>
                </View>
              </View>
            </ScrollView>
          </View>

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
              this.setState({isBuying: false});
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss(), this.setState({ isBuying: false });
              }}
            >
              <View
                style={styles.containerContent}
              >
                <View
                  onTouchEnd={() => this.setState({ isBuying: true })}
                  style={styles.modalContent}
                >
                  <Text style={styles.nameModal}>{this.state.data.name}</Text>
                  <View style={styles.imageModal}>
                    <Image
                      source={{ uri: this.state.curImg }}
                      style={[styles.selectedImage]}
                    />
                  </View>
                  <Text style={{ marginTop: 20, fontSize: 18 }}>Enter Qty</Text>
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
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            style={{ width: 100, height: 100 }}
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            visible={this.state.isRating}
            value={this.state.product_quantity}
            onRequestClose={() => {
                this.setState({isRating: false});;
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ isRating: false });
              }}
            >
              <View
                style={styles.containerContent}
              >
                <View
                  onTouchEnd={() => this.setState({ isRating: true })}
                  style={styles.modalContent}
                >
                  <Text style={styles.nameModal}>{this.state.data.name}</Text>
                  <Image
                    source={{ uri: this.state.curImg }}
                    style={styles.selectedImage}
                  />
                  <Rating
                    type="custom"
                    ratingCount={5}
                    startingValue={this.state.newRating}
                    style={{ marginVertical: 20 }}
                    onFinishRating={this.rateItems}
                    imageSize={45}
                    fractions={0}
                    ratingBackgroundColor="#7f7f7f"
                    ratingColor="#ffba00"
                  />
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "red", width: 230 }
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
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }
}