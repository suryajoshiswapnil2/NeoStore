import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { CustomHeader } from "../../header/header";

import { styles } from "./styles";
import { API, get } from "../../../lib/api";
import { showError } from "../../../utils/validators";
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
   
    this.data = {
        page: 1,
    }
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


  lazyLoad = () => {
    //   console.log('called',this.state.list)
      if(this.state.end)
        return  

      this.setState({
        isListLoading: true,
      })
      let {list, limit, offset, page} = this.state
      url = API.productList + '?product_category_id=' + this.state.product_category_id +
        '&limit=6' + '&page=' + page;

    //   console.log(url)  

      return get(url, null, res => {
          
         if( res.data == null )
            this.setState({
                end: true,
                isListLoading: false,
            })

         else {
            this.setState({
                list: list.concat(res.data),
                limit: limit + res.data.length,
                offset: offset + res.data.length,
                page: page + 1,
                isListLoading: false,
            })
            // this.data.page += 1
        }
      }, (e) => {
            this.setState({
                end: true,
                isListLoading: false,
            })
      } )  
  }


  componentDidMount() {
    // console.log('called ComponentDidMount')

    this.lazyLoad();
    this.setState({
        isLoading: false,
    })

    // let url =
    //   API.productList +
    //   "?product_category_id=" +
    //   this.state.product_category_id +'&limit=6&page='+this.data.page;
    // // alert(url)
    // return fetch(url, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     if (responseJson.status == 200) {
    //       this.data.page += 1
    //       this.setState({
    //         isLoading: false,
    //         dataSource: responseJson.data,
    //         limit: responseJson.data.length,
    //         offset: 0
    //         // list: responseJson.data.slice(0,5),
    //       });
    //       this.fetchResults();
    //     } else {
    //       showError(responseJson.user_msg);
    //       this.setState({
    //         isListLoading: false
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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
        <View style={{flex:1}}>
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
            // this.fetchResults();
            this.lazyLoad()
          }}
          onEndReachedThreshold={0.1}
          keyExtractor={item => item.id.toString()}
        />

        {this.state.isListLoading &&  
            (<View><ActivityIndicator color='red' size='small'/></View>) 
            }
         { this.state.end && <Text style={{opacity: 0.5, textAlign: 'center'}}>All items are loaded successfully.</Text>}   
        {/* <View style={styles.bottomViewer}>
          <Text style={styles.bottomViewerText}>
            SHOWING {this.state.offset} OF {this.state.limit}
          </Text>
        </View> */}
        </View>
        <View style={styles.bottomViewer2}>
          <Text style={styles.bottomViewerText2}>
            {this.state.offset} OF {this.state.limit}
          </Text>
        </View>


      </View>
    );
  }
}
