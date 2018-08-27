//

import { StyleSheet } from "react-native";
import * as Device from "../../../lib/globals";
import colors from "../../../utils/colors";
import font from "../../../utils/fontSize";

export const styles = StyleSheet.create({
  imageContent: {
    resizeMode: "cover",
    height: "100%",
    width: "100%"
  },
  _left: {
    textAlign: "left"
  },
  _right: {
    textAlign: "right"
  },
  __left: {
    ...font.family.medium,
    textAlign: "left",
    fontWeight: "500",
    fontSize: 21,
    color: "#ffffff"
  },
  __right: {
    ...font.family.medium,
    textAlign: "right",
    fontWeight: "500",
    fontSize: 21,
    color: "#ffffff"
  },
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "white",
    paddingTop: Device.isIOS ? 22 : 0
    // paddingBottom: Device.isIOS ? 5 :0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40 / 3
    // backgroundColor: 'white',
  },
  containerHalf: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"

    // backgroundColor: 'white',
  },
  containerHalfBottom: {
    flex: 3,
    justifyContent: "space-between",
    // alignItems: 'center',
    flexDirection: "column",
    marginHorizontal: 40 / 3,
    marginVertical: 45 / 3,
    marginBottom: 15
    // backgroundColor: '#fff',
  },
  rowContainerBox: {
    //    backgroundColor: '#e91ffa',
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%"
    //  alignItems: 'center'
    // backgroundColor:'blue',
  },
  containerBox: {
    //    backgroundColor: '#e91ffa',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
    //  alignItems: 'center'
    // backgroundColor:'blue',
  },
  box1: {
    padding: 60 / 3,
    //   flexDirection: 'row',
    justifyContent: "space-between",
    width: "48%",
    height: "90%"

    // justifyContent: left,
    // backgroundColor: '#e91c1a',
  },
  box2: {
    padding: 60 / 3,
    justifyContent: "space-between",
    // flexDirection: 'row',
    width: "48%",
    height: "90%"
    // backgroundColor: '#e91c1a',
  },
  logoTitle: {
    fontSize: 45,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 50
  },
  inputContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
    flexDirection: "row"
  },
  input: {
    alignSelf: "center",
    width: 205,
    fontSize: 20,
    color: colors.white,
    // height: 30,
    marginHorizontal: 15,
    padding: 5
  },
  icons: {
    marginLeft: 15
  },
  inputBoxes: {
    marginBottom: 50 / 3
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    width: 275,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 12
  },
  bottomContainer: {
    //    flex: 1,
    bottom: 20,
    position: "absolute",
    // marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    //   marginHorizontal: 50,
    justifyContent: "space-between"
  },
  wrapper: {
    // width: Device.window.width ,
    //  height: 686/3,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: colors.white,
    fontSize: 30,
    fontWeight: font.weight.bold
  },
  icon: {
    // width: 10,
    // height: 24,
  }
});
