import { StyleSheet } from "react-native";
import * as Device from "../../../lib/globals";
import colors from "../../../utils/colors";
import font from "../../../utils/fontSize";

export const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 20
  },
  scroll: {
    marginBottom: Device.isX ? 103 : 70
  },
  qty: {
    marginTop: 15,
    fontSize: 18,
    ...font.family.book
  },
  costt: {
    fontSize: 25,
    color: colors.redd,
    fontWeight: "500"
  },
  oos: {
    color: colors.red,
    fontSize: 14,
    fontWeight: "500"
  },
  imageView: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5
  },
  modalImage: {
    // width: 350,
    // height: 350
    // flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    marginTop: Device.isIOS ? 22 : 0,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: colors.white,
  },
  mainContainer: {
    flex: 1,
    width: Device.window.width
    // backgroundColor: colors.red,
    // padding: 40/3,
  },
  name: {
    ...font.family.medium,
    fontSize: 21,
    color: colors.productTitle
    //   fontWeight: 'bold',
  },
  category: {
    ...font.family.book,
    fontSize: 18,
    color: colors.pureBlack
  },
  company: {
    ...font.family.book,
    color: colors.pureBlack,
    fontSize: 15
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rating: {},
  header: {
    //   flex:1,
    backgroundColor: colors.white,
    padding: 13
  },
  detailContainer: {
    margin: 13,
    //   padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
    alignItems: "center",
    // bottom: Device.isX ? 30 : 0,
    bottom: 0,
    backgroundColor: colors.white,
    width: Device.window.width,
    height: Device.isX ? 105 : 70,
    paddingBottom: Device.isX ? 30 : 0
  },
  imageHolder: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    padding: 15
  },
  descTitle: {
    ...font.family.medium,
    fontSize: 17,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 5
  },
  desc: {
    ...font.family.book,
    color: colors.lightBlack,
    fontSize: 15
  },
  button: {
    //   marginTop: 20,
    backgroundColor: colors.gray,
    height: 50,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    color: colors.white,
    borderRadius: 6
  },
  buttonText: {
    fontSize: 20,
    color: colors.white
  },
  mainImage: {
    justifyContent: "center",
    alignItems: "center",
    //   marginHorizontal: 40,
    padding: 5,
    borderWidth: 1.3,
    borderColor: colors.darkWhite,
    borderRadius: 3
    //   marginBottom: 5,
  },
  bigMainImage: {
    justifyContent: "center",
    alignItems: "center",
    //   marginHorizontal: 40,
    padding: 10,
    backgroundColor: colors.white,
    // margin: 10,
    borderWidth: 1.3,
    borderRadius: 10,
    borderColor: colors.gray,
    // borderRadius: 3,
    //   marginBottom: 5,
    // marginVertical: 50,
    // marginHorizontal: 10,
    width: "98%",
    height: "80%"
  },
  images: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    margin: 10,
    marginBottom: 30
  },
  selectedImage: {
    width: 235,
    height: 170,
    resizeMode: "contain"
  },
  nameModal: {
    ...font.family.book,
    fontSize: 20,
    marginBottom: 15
  },
  imageModal: {
    borderColor: colors.gray,
    borderWidth: 2,
    padding: 8
  },
  content: {
    width: 105,
    height: 90,
    resizeMode: "contain",
    borderColor: colors.gray,
    borderWidth: 1,
    marginRight: 10
  },
  modalContent: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    margin: 50,
    backgroundColor: colors.white,
    borderRadius: 10
  },
  qinput: {
    width: 80,
    height: 40,
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    marginBottom: 20
  },
  containerContent: {
    flex: 1,
    // zIndex: 2147483647,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center"
  }
});
