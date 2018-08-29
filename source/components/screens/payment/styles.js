import { StyleSheet } from "react-native";
import * as Device from "../../../lib/globals";
import colors from "../../../utils/colors";
import font from "../../../utils/fontSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Device.iosMargin,
    justifyContent: "flex-start",
    backgroundColor: colors.white
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  field: {
    width: 300,
    color: colors.black,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5
  },
  payCard: {
    color: colors.black,
    width: "100%",
    textAlign: "left",
    marginLeft: 75,
    fontSize: 20,
    marginVertical: 15
  },
  button: {
    backgroundColor: colors.gray,
    height: 55,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    color: colors.white,
    borderRadius: 6
  },

  buttonText: {
    // ...font.family.book,
    fontSize: font.medium,
    color: colors.white
  },

  buttonContainer: {
    width: "81%",
    justifyContent: "center",
    marginHorizontal: 18,
    marginVertical: 20
  }
});
